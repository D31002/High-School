import React from 'react';
import classNames from 'classnames/bind';
import Styles from './Outside.module.scss';
import Button from '../../../button/Button';

const cx = classNames.bind(Styles);

function Container({ SetShowInside }) {
    const handleShowInside = () => {
        SetShowInside(true);
    };
    return (
        <div className={cx('wrapper-container')}>
            <div className={cx('convo-list')}>
                <h3 className={cx('convo-list-title')}>Danh sách hộp thoại</h3>
                <div className={cx('convo-list-item')}>
                    <img
                        src="https://tse3.mm.bing.net/th?id=OIP.7y34p7gUXDojc6MZz5AwfwHaHJ&pid=Api&P=0&h=180"
                        alt="anh"
                    />
                    <div className={cx('convo-last-info')}>
                        <div className={cx('name')}>
                            <h4>Trường</h4>
                            <span>1h</span>
                        </div>
                        <div className={cx('message')}>Gửi cho bạn một tin nhắn</div>
                    </div>
                </div>
            </div>
            <div className={cx('footer')}>
                <Button className={cx('btn-start')} onClick={handleShowInside}>
                    <span>Tạo hội thoại mới</span>
                    <img
                        src="https://vcdn.subiz-cdn.com/widget-v4/public/assets/img/send.6db52a9.svg"
                        alt="hoi thoai"
                    />
                </Button>
            </div>
        </div>
    );
}

export default Container;
