import React from 'react';
import classNames from 'classnames/bind';
import Styles from './Benefit.module.scss';
import Item from './Item/Index';

const cx = classNames.bind(Styles);

function Index() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('heading')}>
                    <h3>TIN TỨC MỚI NHẤT</h3>
                    <h1>TIN TỨC – TUYỂN DỤNG</h1>
                </div>
            </div>
            <div className={cx('content')}>
                <Item />
            </div>
        </div>
    );
}

export default Index;
