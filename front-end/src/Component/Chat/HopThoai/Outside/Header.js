import React from 'react';
import classNames from 'classnames/bind';
import Styles from './Outside.module.scss';

const cx = classNames.bind(Styles);

function Index({ setShowConvo, setShowchat }) {
    const handleCloseShowConvo = () => {
        setShowConvo(false);
        setShowchat(true);
    };
    return (
        <>
            <div className={cx('header-inside')}>
                <div className={cx('header-top')}>
                    <h3 className={cx('tilte')}>Trường</h3>
                    <div className={cx('header-close')} onClick={handleCloseShowConvo}></div>
                </div>
                <div className={cx('header-body')}>
                    <img
                        src="https://tse3.mm.bing.net/th?id=OIP.7y34p7gUXDojc6MZz5AwfwHaHJ&pid=Api&P=0&h=180"
                        alt="anh"
                    />
                    <p className={cx('header-introduction')}>
                        Chào Quý Phụ huynh! Quý Phụ huynh đang cần hỗ trợ thông tin gì ạ? Hãy nhắn tại đây để được giải
                        đáp
                    </p>
                </div>
            </div>
        </>
    );
}

export default Index;
