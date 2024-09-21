import React from 'react';
import classNames from 'classnames/bind';
import Styles from './HostLine.module.scss';
import Button from '../button/Button';

const cx = classNames.bind(Styles);

function Index() {
    return (
        <div className={cx('phone')}>
            <Button className={cx('number-phone')} href="/duongdaynong">
                <img src="https://hoalac-school.fpt.edu.vn/wp-content/uploads/callnow.png" alt="dienthoai" />
                <div className={cx('title-action')}>
                    <b>01 2345 6789</b>
                </div>
            </Button>
        </div>
    );
}

export default Index;
