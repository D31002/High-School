import React from 'react';
import classNames from 'classnames/bind';
import Styles from './Footer.module.scss';
import Infomation from './Imfomation/Index';
import Map from './Map/Index';

const cx = classNames.bind(Styles);

function Index() {
    return (
        <div className={cx('Footer')}>
            <div className={cx('content')}>
                <div className={cx('information')}>
                    <Infomation />
                </div>
                <div className={cx('map')}>
                    <Map />
                </div>
            </div>
            <div className={cx('design')}>
                <p>Copyright © 2023 name company. Designed by Nguyễn Tấn Đại</p>
            </div>
        </div>
    );
}

export default Index;
