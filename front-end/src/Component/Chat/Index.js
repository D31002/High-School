import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Styles from './Chat.module.scss';
import Hopthoai from './HopThoai/Index';

const cx = classNames.bind(Styles);

function Index() {
    const [showchat, setShowchat] = useState(false);
    const [closechat, setClosechat] = useState(true);
    const [showConvo, setShowConvo] = useState(false);

    useEffect(() => {
        const timeid = setTimeout(() => {
            setShowchat(true);
        }, 3000);
        return () => {
            clearTimeout(timeid);
        };
    }, []);

    const handleClose = () => {
        setClosechat(false);
    };
    const handleShowConvo = () => {
        setShowConvo(true);
        setShowchat(false);
    };
    return (
        <div className={cx('chat')}>
            {showchat && (
                <>
                    {closechat && (
                        <div className={cx('chat-preview')}>
                            <div className={cx('body')}>
                                <img
                                    src="https://tse3.mm.bing.net/th?id=OIP.7y34p7gUXDojc6MZz5AwfwHaHJ&pid=Api&P=0&h=180"
                                    alt="anh"
                                />
                                <div className={cx('content')}>
                                    <h3 className={cx('title')}>Trường</h3>
                                    <p>
                                        Quý vị cần được hỗ trợ thông tin, xin hãy chat với cán bộ tư vấn của nhà trường!
                                    </p>
                                </div>
                                <div className={cx('close')} onClick={handleClose}></div>
                            </div>
                            <div className={cx('action')} onClick={handleShowConvo}>
                                <h2>Gửi tin nhắn</h2>
                            </div>
                        </div>
                    )}
                    <div className={cx('chat-button')} onClick={handleShowConvo}>
                        <div className={cx('chat-button-white')}></div>
                        <img
                            src="https://vcdn.subiz-cdn.com/widget-v4/public/assets/img/bubble_default.7d5e4ab.svg"
                            alt="chat"
                        />
                    </div>
                </>
            )}
            {showConvo && <Hopthoai setShowConvo={setShowConvo} setShowchat={setShowchat} />}
        </div>
    );
}

export default Index;
