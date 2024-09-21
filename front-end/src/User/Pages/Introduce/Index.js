import React from 'react';
import classNames from 'classnames/bind';
import Styles from './Introduce.module.scss';
import Header from './header/Index';
import Container from './container/Index';

const cx = classNames.bind(Styles);

function Index() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('banner')}>
                <div className={cx('heading')}>
                    <h1>GIỚI THIỆU</h1>
                    <h3>TRANG CHỦ / GIỚI THIỆU</h3>
                </div>
            </div>
            <div className={cx('content')}>
                <div className={cx('header')}>
                    <Header />
                </div>
                <div className={cx('container')}>
                    <Container />
                </div>
            </div>
        </div>
    );
}

export default Index;
