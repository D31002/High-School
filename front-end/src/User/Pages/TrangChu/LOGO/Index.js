import React from 'react';
import classNames from 'classnames/bind';
import Styles from './LOGO.module.scss';
import Item from './Item/Index';

const cx = classNames.bind(Styles);

function Index() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <Item />
            </div>
        </div>
    );
}

export default Index;
