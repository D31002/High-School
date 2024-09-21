import React from 'react';
import classNames from 'classnames/bind';
import styles from './Headeronly.module.scss';
import Header from '../header/header';

const cx = classNames.bind(styles);

function Headeronly({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('content')}>{children}</div>
        </div>
    );
}

export default Headeronly;
