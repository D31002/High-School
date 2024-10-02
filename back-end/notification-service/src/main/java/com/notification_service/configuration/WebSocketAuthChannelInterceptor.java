package com.notification_service.configuration;

import com.notification_service.Exception.AppException;
import com.notification_service.Exception.ErrorCode;
import com.notification_service.dto.request.IntrospectRequest;
import com.notification_service.repository.httpclient.IdentityClient;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.stereotype.Component;


@Component
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PACKAGE,makeFinal = true)
public class WebSocketAuthChannelInterceptor implements ChannelInterceptor {

    IdentityClient identityClient;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = (StompHeaderAccessor) MessageHeaderAccessor.getAccessor(message);
        assert accessor != null;
        if(StompCommand.CONNECT.equals(accessor.getCommand())){
            String auth =accessor.getFirstNativeHeader("Authorization");
            assert auth != null;
            String token = auth.substring(7);
            if(!isValidToken(token)){
                throw new AppException(ErrorCode.UNAUTHENTICATED);
            }
        }
        return message;
    }

    private boolean isValidToken(String token) {
        return identityClient.introspect(IntrospectRequest.builder().token(token).build()).getResult().isValid();
    }
}
