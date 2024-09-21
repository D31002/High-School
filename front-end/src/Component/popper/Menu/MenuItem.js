import React from 'react';
import Button from '../../button/Button';
import Styles from './Menu.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(Styles);

function MenuItem({ data }) {
    return (
        <Button className={cx('menu-item')} to={data.to} onClick={data.onclick}>
            <span className={cx('icon')}>{data.icon}</span>
            <p>{data.title}</p>
        </Button>
    );
}

export default MenuItem;
