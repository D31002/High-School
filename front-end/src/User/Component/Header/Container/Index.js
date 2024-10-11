import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import Styles from './Container.module.scss';
import Button from '../../../../Component/button/Button';
import CongKhai from './btnCongKhai/Index';
import TuyenSinh from './btnTuyenSinh/Index';
import Tuvan from './btnTuVan/Index';
import { NavLink, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const cx = classNames.bind(Styles);

function Index() {
    const location = useLocation();

    const [isNavbarVisible, setIsNavbarVisible] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const handleLinkClick = () => {
        setIsMenuOpen(false); // Đóng menu khi nhấp vào liên kết
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setIsNavbarVisible(scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMenuOpen]);

    return (
        <div className={cx('header-control', { visible: isNavbarVisible })}>
            <div className={cx('container')}>
                <Button className={cx('logo')} to="/">
                    <img
                        src="https://res.cloudinary.com/danrswhe6/image/upload/v1721960151/School_pcx8lt.png"
                        alt="ImageSchool"
                    />
                </Button>

                {isMenuOpen ? (
                    <div className={cx('dropdown-menu')}>
                        <div className={cx('close')} onClick={toggleMenu}>
                            <CloseIcon />
                        </div>
                        <NavLink
                            className={cx('btn-link', { active: location.pathname === '/' })}
                            to="/"
                            onClick={handleLinkClick}
                        >
                            Trang chủ
                        </NavLink>
                        <NavLink
                            className={cx('btn-link', { active: location.pathname === '/gioithieu' })}
                            to="/gioithieu"
                            onClick={handleLinkClick}
                        >
                            Về Chúng Tôi
                        </NavLink>
                        <CongKhai />
                        <TuyenSinh active={location.pathname.includes('/tuyensinh')} />
                        <Tuvan />
                        <NavLink
                            className={cx('btn-link', { active: location.pathname === '/tuyendung' })}
                            to="/tuyendung"
                            onClick={handleLinkClick}
                        >
                            Tuyển Dụng
                        </NavLink>
                        <NavLink
                            className={cx('btn-link', { active: location.pathname.includes('/tin-tuc') })}
                            to="/tin-tuc"
                            onClick={handleLinkClick}
                        >
                            Tin Tức
                        </NavLink>
                        <NavLink
                            className={cx('btn-link', { active: location.pathname === '/lienhe' })}
                            to="/lienhe"
                            onClick={handleLinkClick}
                        >
                            Liên Hệ
                        </NavLink>
                    </div>
                ) : (
                    <div className={cx('link')}>
                        <NavLink
                            className={cx('btn-link', { active: location.pathname === '/' })}
                            to="/"
                            onClick={handleLinkClick}
                        >
                            Trang chủ
                        </NavLink>
                        <NavLink
                            className={cx('btn-link', { active: location.pathname === '/gioithieu' })}
                            to="/gioithieu"
                            onClick={handleLinkClick}
                        >
                            Về Chúng Tôi
                        </NavLink>
                        <CongKhai />
                        <TuyenSinh active={location.pathname.includes('/tuyensinh')} />
                        <Tuvan />
                        <NavLink
                            className={cx('btn-link', { active: location.pathname === '/tuyendung' })}
                            to="/tuyendung"
                            onClick={handleLinkClick}
                        >
                            Tuyển Dụng
                        </NavLink>
                        <NavLink
                            className={cx('btn-link', { active: location.pathname.includes('/tin-tuc') })}
                            to="/tin-tuc"
                            onClick={handleLinkClick}
                        >
                            Tin Tức
                        </NavLink>
                        <NavLink
                            className={cx('btn-link', { active: location.pathname === '/lienhe' })}
                            to="/lienhe"
                            onClick={handleLinkClick}
                        >
                            Liên Hệ
                        </NavLink>
                    </div>
                )}

                <div className={cx('menu-icon-toggle')} onClick={toggleMenu}>
                    <MenuIcon />
                </div>
                {isMenuOpen && <div className={cx('overlay')} />}
            </div>
        </div>
    );
}

export default Index;
