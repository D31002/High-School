import React from 'react';
import Header from '../../Component/Header/Index';
import classNames from 'classnames/bind';
import Styles from './HeaderAndFooter.module.scss';
import Footer from '../../Component/Footer/Index';

const cx = classNames.bind(Styles);

function Index({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('content')}>{children}</div>
            <Footer />
        </div>
    );
}

export default Index;
