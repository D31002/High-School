import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { authLoading } from '../../redux/selectors';
import { useHandleDispatch } from '../../services/useHandleDispatch';
import { showWarningMessage } from '../Notification/Index';
import classNames from 'classnames/bind';
import Styles from './login.module.scss';
import Loading from '../Loading/Index';
import Button from '../button/Button';
import Input from '../Input/Index';
import { useLocation } from 'react-router-dom';

const cx = classNames.bind(Styles);

function Login() {
    const [datalogin, setDatalogin] = useState({
        username: '',
        password: '',
    });
    const [prevPathname, setPrevPathname] = useState();

    const location = useLocation();

    const { loginUser } = useHandleDispatch();

    useEffect(() => {
        setPrevPathname(location.state?.from || '/');
    }, [location]);

    const usernameInputRef = useRef();
    const passwordInputRef = useRef();

    const loading = useSelector(authLoading);

    const handleChange = (e) => {
        const value = e.target.value;
        setDatalogin({ ...datalogin, [e.target.name]: value });
    };
    const isInputValid = (ref) => {
        return ref.current && ref.current.validity && ref.current.validity.valid;
    };
    const successall = () => {
        return isInputValid(usernameInputRef) && isInputValid(passwordInputRef);
    };
    const handleSubmitClick = (e) => {
        e.preventDefault();
        if (datalogin.username.trim() === '' || datalogin.password.trim() === '') {
            showWarningMessage('Vui lòng nhập thông tin đầy đủ');
        } else if (successall()) {
            loginUser(datalogin, setDatalogin, usernameInputRef, prevPathname);
        } else {
            showWarningMessage('Hãy nhập đúng format').then((result) => {
                if (result.isConfirmed)
                    if (!isInputValid(usernameInputRef)) {
                        usernameInputRef.current.focus();
                    } else if (!isInputValid(passwordInputRef)) {
                        passwordInputRef.current.focus();
                    }
            });
        }
    };
    const inputs = [
        {
            refer: usernameInputRef,
            type: 'text',
            placeholder: 'Mã số',
            value: datalogin.username || '',
            name: 'username',
            pattern: '[A-Z]{2}[0-9]{6}',
            errorMessage: 'Mã số phải có 2 ký tự in hoa kèm theo 6 số',
            required: true,
        },
        {
            refer: passwordInputRef,
            type: 'password',
            placeholder: 'Password',
            value: datalogin.password || '',
            name: 'password',
            errorMessage: 'Password không được để trống',
            required: true,
        },
    ];

    useEffect(() => {
        usernameInputRef.current?.focus();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('left')}>
                    <img
                        src="https://res.cloudinary.com/danrswhe6/image/upload/v1721959674/LoginImage_ffev5i.png"
                        alt="imageLogin"
                    />
                    <h1>TRƯỜNG HỌC - NƠI ƯƠM MẦM TRI THỨC, XÂY DỰNG TƯƠNG LAI</h1>
                </div>
                <div className={cx('right')}>
                    <div className={cx('title')}>
                        <h1>Xin chào lần nữa</h1>
                        <h3>Vui mừng vì bạn tham gia cùng chúng tôi</h3>
                    </div>
                    <div className={cx('content')}>
                        <form className={cx('form')}>
                            {inputs.map((input, index) => (
                                <div key={index}>
                                    <Input {...input} handleChange={handleChange} />
                                </div>
                            ))}
                        </form>
                        <div className={cx('sup')}>
                            <div className={cx('remember')}>
                                <input type="checkbox" />
                                <span>Remember Me</span>
                            </div>
                            <div className={cx('forget-password')}>Quên mật khẩu?</div>
                        </div>
                        <button onClick={handleSubmitClick}>Đăng nhập</button>
                        <div className={cx('social')}>
                            <img
                                src="https://res.cloudinary.com/danrswhe6/image/upload/v1726619203/googleIcon_zjqzdo.png"
                                alt="googleIcon"
                            />
                            <span>Đăng nhập với Google</span>
                        </div>
                        <div className={cx('navigate')}>
                            <div className={cx('navigate-signup')}>
                                <span>Bạn không có tài khoản?</span>
                                <span>Sign-Up</span>
                            </div>
                            <Button className={cx('navigate-home')} to="/">
                                Home
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            {loading && <Loading />}
        </div>
    );
}

export default Login;
