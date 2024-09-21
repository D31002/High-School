import React from 'react';
import classNames from 'classnames/bind';
import Style from '../Activity.module.scss';

const cx = classNames.bind(Style);

function Index({ title, img }) {
    return (
        <div className={cx('movement-item')}>
            <h4 className={cx('movement-item-heading')}>{title}</h4>
            <div className={cx('movement-item-img')}>
                <img src={img} alt="anh" />
            </div>
        </div>
    );
}

export default Index;
