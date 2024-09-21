import React from 'react';
import classNames from 'classnames/bind';
import Styles from './Header.module.scss';
import Container from './Container/Index';
import HeaderTop from './Top/Index';

const cx = classNames.bind(Styles);

function Index() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('header')}>
                <HeaderTop />
            </div>
            <div className={cx('container')}>
                <Container />
            </div>
        </header>
    );
}

export default Index;
