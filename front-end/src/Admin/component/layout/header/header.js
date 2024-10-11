import Menu from '../../../../Component/popper/Menu/Menu';
import Styles from './Header.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { authUser } from '../../../../redux/selectors';
import { useHandleDispatch } from '../../../../services/useHandleDispatch';
import { useNavigate } from 'react-router-dom';
import { showSuccessMessage } from '../../../../Component/Notification/Index';

const cx = classNames.bind(Styles);

function Header() {
    const user = useSelector(authUser);
    const { logoutUser } = useHandleDispatch();
    const navigate = useNavigate();
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
        <header className={cx('wrapper')}>
            <div className={cx('header-left')}>
                <img
                    src="https://res.cloudinary.com/danrswhe6/image/upload/v1722039908/Icon-ADMIN_fmd82o.png"
                    alt="anh"
                    onClick={() => navigate('/admin')}
                ></img>
            </div>
            <h2>HỆ THỐNG QUẢN LÝ</h2>
            <div className={cx('r')}>
                <Menu items={MenuItems}>
                    <div className={cx('header-right')}>
                        <img
                            src={
                                user?.userProfileResponse?.imageUrl ||
                                'https://res.cloudinary.com/danrswhe6/image/upload/v1725669304/anhdaidien_w5zpy2.webp'
                            }
                            alt="anh"
                        ></img>
                        {user ? <h4>ADMIN : {user?.userProfileResponse?.fullName}</h4> : <h4>{''}</h4>}
                    </div>
                </Menu>
            </div>
        </header>
    );
}

export default Header;
