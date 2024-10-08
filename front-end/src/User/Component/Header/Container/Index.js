import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import Styles from './Container.module.scss';
import Button from '../../../../Component/button/Button';
import CongKhai from './btnCongKhai/Index';
import TuyenSinh from './btnTuyenSinh/Index';
import Tuvan from './btnTuVan/Index';
import { NavLink, useLocation } from 'react-router-dom';

const cx = classNames.bind(Styles);

function Index() {
    const location = useLocation();

    const [isNavbarVisible, setIsNavbarVisible] = useState(false);

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
    return (
        <div className={cx('header-control', { visible: isNavbarVisible })}>
            <Button className={cx('logo')} to="/">
                <img
                    src="https://res.cloudinary.com/danrswhe6/image/upload/v1721960151/School_pcx8lt.png"
                    alt="ImageSchool"
                />
            </Button>
            <div className={cx('link')}>
                <NavLink className={cx('btn-link', { active: location.pathname === '/' })} to="/">
                    Trang chủ
                </NavLink>
                <NavLink className={cx('btn-link', { active: location.pathname === '/gioithieu' })} to="/gioithieu">
                    Về Chúng Tôi
                </NavLink>
                <CongKhai />
                <TuyenSinh active={location.pathname.includes('/tuyensinh')} />
                <Tuvan />
                <NavLink className={cx('btn-link', { active: location.pathname === '/tuyendung' })} to="/tuyendung">
                    Tuyển Dụng
                </NavLink>
                <NavLink className={cx('btn-link', { active: location.pathname.includes('/tin-tuc') })} to="/tin-tuc">
                    Tin Tức
                </NavLink>
                {/* <NavLink className={cx('btn-link', { active: location.pathname === '/sukien' })} to="/sukien">
                    Sự Kiện
                </NavLink> */}
                <NavLink className={cx('btn-link', { active: location.pathname === '/lienhe' })} to="/lienhe">
                    Liên Hệ
                </NavLink>
            </div>
        </div>
    );
}

export default Index;
