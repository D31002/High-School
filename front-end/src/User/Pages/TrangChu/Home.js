import React from 'react';
import classNames from 'classnames/bind';
import Styles from './Home.module.scss';
import Introduce from './Introduce/Index';
import Benefit from './Benefit/Index';
import Event from './EVENT/Index';
import Number from './NUMBER/Index';
import Logo from './LOGO/Index';
import News from './News/Index';

const cx = classNames.bind(Styles);

function Home() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <p>CHÀO MỪNG ĐẾN TRANG THÔNG TIN ĐIỆN TỬ CỦA CHÚNG TÔI</p>
            </div>
            <div className={cx('content')}>
                <Introduce />
                <Benefit />
                <Event />
                <Number />
                <Logo />
                <News />
            </div>
        </div>
    );
}

export default Home;
