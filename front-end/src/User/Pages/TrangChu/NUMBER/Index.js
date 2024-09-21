import React from 'react';
import classNames from 'classnames/bind';
import Styles from './NUMBER.module.scss';
import Item from './Item/Index';

const cx = classNames.bind(Styles);

function Index() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('img')}>
                <div className={cx('fill')}></div>
            </div>
            <div className={cx('content')}>
                <div className={cx('heading')}>
                    <h3>Đối Tác & Khách Hàng</h3>
                    <h1>THPT .... Với Những Con Số Đầy Ấn Tượng</h1>
                </div>
                <Item />
            </div>
        </div>
    );
}

export default Index;
