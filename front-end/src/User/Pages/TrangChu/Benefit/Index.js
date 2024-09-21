import React from 'react';
import classNames from 'classnames/bind';
import Styles from './Benefit.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRoadBridge } from '@fortawesome/free-solid-svg-icons';
import Item from './Item/Index';

const cx = classNames.bind(Styles);

function Index() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('heading')}>
                    <h1>LỢI ÍCH KHI NHẬP HỌC</h1>
                </div>
                <div className={cx('title')}>
                    <FontAwesomeIcon icon={faRoadBridge} className={cx('icon')} />
                    <span>
                        Các cơ sở của Nhà trường đều được xây dựng mới, trang thiết bị hiện đại 100% theo tiêu chuẩn
                        Quốc tế.
                    </span>
                </div>
            </div>
            <div className={cx('content')}>
                <Item />
            </div>
        </div>
    );
}

export default Index;
