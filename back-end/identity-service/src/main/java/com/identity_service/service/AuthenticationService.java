package com.identity_service.service;

import com.identity_service.Exception.AppException;
import com.identity_service.Exception.ErrorCode;
import com.identity_service.Mapper.UserMapper;
import com.identity_service.dto.request.AuthenticationRequest;
import com.identity_service.dto.request.IntrospectRequest;
import com.identity_service.dto.request.LogoutRequest;
import com.identity_service.dto.request.RefreshRequest;
import com.identity_service.dto.response.*;
import com.identity_service.models.InvalidatedToken;
import com.identity_service.models.User;
import com.identity_service.repository.InvalidatedTokenRepository;
import com.identity_service.repository.UserRepository;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.StringJoiner;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationService{
    UserRepository userRepository;
    UserMapper userMapper;
    InvalidatedTokenRepository invalidatedTokenRepository;


    @NonFinal
    @Value("${jwt.signerKey}")
    protected String SIGNER_KEY;

    @NonFinal
    @Value("${jwt.valid-duration}")
    protected long VALID_DURATION;

    @NonFinal
    @Value("${jwt.refreshable-duration}")
    protected long REFRESHABLE_DURATION;

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        User user = userRepository.findByUsername(request.getUsername());
        if (user == null)
            throw new AppException(ErrorCode.USER_NOT_EXISTED);

        boolean authenticated  = passwordEncoder.matches(request.getPassword(), user.getPassword());

        if(!authenticated)
            throw new AppException(ErrorCode.UNAUTHENTICATED);

        String token = generateToken(user);

        return AuthenticationResponse.builder()
                        .token(token)
                        .user(userMapper.toUserResponse(user))
                        .build();
    }

    private SignedJWT verifyToken(String token)
            throws JOSEException, ParseException {
        JWSVerifier verifier = new MACVerifier(SIGNER_KEY.getBytes());

        SignedJWT signedJWT = SignedJWT.parse(token);

        Date expiryTime = signedJWT.getJWTClaimsSet().getExpirationTime();

        var verified = signedJWT.verify(verifier);

        if (!(verified && expiryTime.after(new Date())))
            throw new AppException(ErrorCode.UNAUTHENTICATED);

        if(invalidatedTokenRepository.existsById(signedJWT.getJWTClaimsSet().getJWTID())){
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }

        return signedJWT;
    }

   
    public IntrospectResponse introspect(IntrospectRequest request)
            throws ParseException, JOSEException {
        var token = request.getToken();
        boolean invalid = true;
        try{
            verifyToken(token);
        }catch (AppException | JOSEException | ParseException e){
            invalid = false;
        }
        return IntrospectResponse.builder().valid(invalid).build();
    }

   
    public void logout(LogoutRequest request)
            throws ParseException, JOSEException {
        try{
            var signToken = verifyToken(request.getToken());

            String jit = signToken.getJWTClaimsSet().getJWTID();
            Date expiryTime = signToken.getJWTClaimsSet().getExpirationTime();

            InvalidatedToken invalidatedToken = InvalidatedToken.builder()
                    .id(jit)
                    .expiryTime(expiryTime)
                    .build();
            invalidatedTokenRepository.save(invalidatedToken);
        }catch (AppException exception){}

    }

   
    public RefreshResponse refreshToken(RefreshRequest request)
            throws ParseException, JOSEException {
        var signJWT = verifyToken(request.getToken());

        var jit = signJWT.getJWTClaimsSet().getJWTID();
        var expiryTime = signJWT.getJWTClaimsSet().getExpirationTime();
        InvalidatedToken invalidatedToken = InvalidatedToken.builder()
                .id(jit)
                .expiryTime(expiryTime)
                .build();
        invalidatedTokenRepository.save(invalidatedToken);

        var username = signJWT.getJWTClaimsSet().getSubject();
        User user = userRepository.findById(Integer.valueOf(username))
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        String tokenNew = generateToken(user);

        return RefreshResponse.builder().token(tokenNew).build();
    }


    private String generateToken(User user) {
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);

        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(String.valueOf(user.getId()))
                .issuer("daiB2014647@Student.ctu.edu.vn")
                .issueTime(new Date())
                .expirationTime(new Date(
                        Instant.now().plus(1, ChronoUnit.HOURS).toEpochMilli()
                ))
                .jwtID(UUID.randomUUID().toString())
                .claim("scope" , buildScope(user))
                .build();

        Payload payload = new Payload(jwtClaimsSet.toJSONObject());

        JWSObject jwsObject = new JWSObject(header,payload);

        try{
            jwsObject.sign(new MACSigner(SIGNER_KEY.getBytes()));
            return jwsObject.serialize();
        }catch (JOSEException e){
            throw new RuntimeException(e.getMessage());
        }
    }

    private String buildScope(User user) {
        StringJoiner stringJoiner = new StringJoiner(" ");
        if (!CollectionUtils.isEmpty(user.getRoles())) {
            user.getRoles().forEach(s -> stringJoiner.add(s.getName()));
        }
        return stringJoiner.toString();
    }

}
