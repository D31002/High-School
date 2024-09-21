import React from 'react';
import classNames from 'classnames/bind';
import Styles from './item.module.scss';
import Logo1 from '../../../../Component/Assets/Img/logo-1.png';
import Logo2 from '../../../../Component/Assets/Img/logo-2.png';
import Logo3 from '../../../../Component/Assets/Img/logo-3.png';
import Logo4 from '../../../../Component/Assets/Img/logo-4.png';
import Logo5 from '../../../../Component/Assets/Img/logo-5.png';
import Logo6 from '../../../../Component/Assets/Img/logo-6.png';
import Logo7 from '../../../../Component/Assets/Img/logo-7.png';
import Logo8 from '../../../../Component/Assets/Img/logo-8.png';
import Logo9 from '../../../../Component/Assets/Img/logo-9.png';
import Logo10 from '../../../../Component/Assets/Img/logo-10.png';
import Logo11 from '../../../../Component/Assets/Img/logo-11.png';
import Logo12 from '../../../../Component/Assets/Img/logo-12.png';

const cx = classNames.bind(Styles);

function Index() {
    const data = [
        {
            logo: Logo1,
        },
        {
            logo: Logo2,
        },
        {
            logo: Logo3,
        },
        {
            logo: Logo4,
        },
        {
            logo: Logo5,
        },
        {
            logo: Logo6,
        },
        {
            logo: Logo7,
        },
        {
            logo: Logo8,
        },
        {
            logo: Logo9,
        },
        {
            logo: Logo10,
        },
        {
            logo: Logo11,
        },
        {
            logo: Logo12,
        },
    ];
    return (
        <div className={cx('list')}>
            {data.map((item, index) => (
                <div className={cx('item')} key={index}>
                    <img src={item.logo} alt="anh" />
                </div>
            ))}
        </div>
    );
}

export default Index;
