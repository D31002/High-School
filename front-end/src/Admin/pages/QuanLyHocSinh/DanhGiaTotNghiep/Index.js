import React from 'react';
import classNames from 'classnames/bind';
import Styles from './DanhGiaTN.module.scss';

const cx = classNames.bind(Styles);

function Index() {
    return <div className={cx('wrapper')}>Index</div>;
}

export default Index;
