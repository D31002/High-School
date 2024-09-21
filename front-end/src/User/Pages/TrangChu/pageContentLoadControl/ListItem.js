import React from 'react';
import Button from '../../../../Component/button/Button';
import classNames from 'classnames/bind';
import Styles from './ListItem.module.scss';
const cx = classNames.bind(Styles);

function ListItem({ data, iconPosition }) {
    return (
        <Button className={cx('item-notifycation', iconPosition)} to={data.to}>
            {data.img && <img src={data.img} alt="anh" />}
            <div className={cx('news-content')}>
                <div className={cx('item-title')}>{data.title}</div>
                <p>{data.body}</p>
            </div>
        </Button>
    );
}

export default ListItem;
