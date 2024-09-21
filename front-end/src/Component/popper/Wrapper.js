import React from 'react';
import classNames from 'classnames/bind';
import Styles from './Popper.module.scss';

const cx = classNames.bind(Styles);

function Wrapper({ children, crud }) {
    const classes = cx('wrapper', {
        crud,
    });
    return <div className={classes}>{children}</div>;
}

export default Wrapper;
