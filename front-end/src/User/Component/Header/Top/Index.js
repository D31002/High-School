import React from 'react';
import classNames from 'classnames/bind';
import Styles from './Top.module.scss';
import Button from '../../../../Component/button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faGear } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { authUser } from '../../../../redux/selectors';
import { useHandleDispatch } from '../../../../services/useHandleDispatch';
import Tooltip from '../../../../Component/Tooltip/Index';
import { showSuccessMessage } from '../../../../Component/Notification/Index';
import { useNavigate } from 'react-router-dom';
import Menu from '../../../../Component/popper/Menu/Menu';
import { faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(Styles);

function Index() {
    const user = useSelector(authUser);
    const navigate = useNavigate();

    const { logoutUser } = useHandleDispatch();

    const handleLogout = () => {
        logoutUser();
        showSuccessMessage('Logout thành công');
        navigate('/login');
    };
    const MenuItems = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'Xem hồ sơ',
            to: `/profile`,
        },
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Đăng xuất',
            onclick: handleLogout,
        },
    ];

    return (
        <div className={cx('header-top')}>
            <div className={cx('socical')}>
                <Tooltip content="Facebook">
                    <div className={cx('link')}>
                        <Button to="/">
                            <FontAwesomeIcon icon={faFacebook} className={cx('icon')} />
                        </Button>
                    </div>
                </Tooltip>
                <Tooltip content="Instagram">
                    <div className={cx('link')}>
                        <Button to="/">
                            <FontAwesomeIcon icon={faInstagram} className={cx('icon')} />
                        </Button>
                    </div>
                </Tooltip>
                <Tooltip content="Tiktok">
                    <div className={cx('link')}>
                        <Button to="/">
                            <FontAwesomeIcon icon={faTiktok} className={cx('icon')} />
                        </Button>
                    </div>
                </Tooltip>
                <Tooltip content="Youtube">
                    <div className={cx('link')}>
                        <Button to="/">
                            <FontAwesomeIcon icon={faYoutube} className={cx('icon')} />
                        </Button>
                    </div>
                </Tooltip>
            </div>
            <div className={cx('contact')}>
                <Tooltip content="Email liên hệ">
                    <div>
                        <FontAwesomeIcon icon={faEnvelope} className={cx('icon')} />
                        <span className={cx('mail')}>ndai6618@gmail.com</span>
                    </div>
                </Tooltip>

                {user ? (
                    <div className={cx('user_logged')}>
                        <Menu items={MenuItems}>
                            <div className={cx('header-right')}>
                                <img
                                    src={
                                        user?.userProfileResponse?.imageUrl ||
                                        'https://res.cloudinary.com/danrswhe6/image/upload/v1725669304/anhdaidien_w5zpy2.webp'
                                    }
                                    alt="anh"
                                ></img>
                                <h4>Họ và tên : {user?.userProfileResponse?.fullName}</h4>
                            </div>
                        </Menu>
                    </div>
                ) : (
                    <Tooltip content="Hệ thống quản lý">
                        <div className={cx('admin')}>
                            <Button className={cx('admin-login')} to="/admin">
                                <FontAwesomeIcon icon={faGear} className={cx('icon')} />
                            </Button>
                        </div>
                    </Tooltip>
                )}
            </div>
        </div>
    );
}

export default Index;
