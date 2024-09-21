import React from 'react';
import classNames from 'classnames/bind';
import Styles from './Inside.module.scss';

const cx = classNames.bind(Styles);

function Header({ SetShowInside, setShowchat, setShowConvo }) {
    const handleComback = () => {
        SetShowInside(false);
    };
    const handleCloseInside = () => {
        setShowchat(true);
        SetShowInside(false);
        setShowConvo(false);
    };
    return (
        <div className={cx('header-children')}>
            <div className={cx('come-back')} onClick={handleComback}></div>
            <img src="https://tse3.mm.bing.net/th?id=OIP.7y34p7gUXDojc6MZz5AwfwHaHJ&pid=Api&P=0&h=180" alt="anh" />
            <div className={cx('introduction')}>
                <h3 className={cx('tilte')}>Trường </h3>
                <p className={cx('content')}>
                    Chào Quý Phụ huynh! Quý Phụ huynh đang cần hỗ trợ thông tin gì ạ? Hãy nhắn tại đây để được giải đáp
                </p>
            </div>
            <div className={cx('close')} onClick={handleCloseInside}></div>
        </div>
    );
}

export default Header;
