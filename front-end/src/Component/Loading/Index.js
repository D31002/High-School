import React from 'react';
import classNames from 'classnames/bind';
import Styles from './Loading.module.scss';

const cx = classNames.bind(Styles);

function Index() {
    return (
        <div className={cx('loading')}>
            <h3>Đang tải dữ liệu</h3>
            <div className={cx('dot-container')}>
                <div className={cx('dot')}></div>
                <div className={cx('dot')}></div>
                <div className={cx('dot')}></div>
            </div>
        </div>
    );
}

export default Index;
