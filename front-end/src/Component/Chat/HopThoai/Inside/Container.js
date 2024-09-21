import React from 'react';
import classNames from 'classnames/bind';
import Styles from './Inside.module.scss';
import Button from '../../../button/Button';

const cx = classNames.bind(Styles);

function Container() {
    return (
        <div className={cx('wrapper-container')}>
            <div className={cx('content')}>
                <div className={cx('events')}>
                    <div className={cx('empty')}>
                        <div className={cx('empty-icon')}></div>
                        <div className={cx('empty-text')}>Gửi một tin nhắn để bắt đầu hội thoại!</div>
                    </div>
                    <div className={cx('poweredby')}>
                        <Button
                            className={cx('poweredby-text')}
                            href="https://subiz.com.vn/vi/?utm_source=id-acrgfmlatppnkwrvmwmz&utm_medium=widget&utm_campaign=widget_referral"
                            target="_blank"
                        >
                            <img
                                src="https://vcdn.subiz-cdn.com/widget-v4/public/assets/img/subiz-mono.877e9f5.svg"
                                alt="anh"
                            />
                            <span>Subiz</span>
                        </Button>
                    </div>
                </div>
            </div>
            <div className={cx('message-input')}>
                <textarea
                    className={cx('message-input--input')}
                    maxlength="1024"
                    placeholder="Nhập tin nhắn…"
                    rows="1"
                    data-emojiable="true"
                    spellCheck="false"
                ></textarea>
                <div className={cx('operation')}>
                    <div className={cx('emoji')}></div>
                    <div className={cx('message-input--btn')}></div>
                </div>
            </div>
            {/* <div className={cx('form')}>
                <p>
                    Chào Quý Phụ huynh! Quý Phụ huynh đang cần hỗ trợ thông tin gì ạ? Hãy để lại thắc mắc. Nhà trường sẽ
                    giải đáp ngay ạ
                </p>
                <div className={cx('form-input')}>
                    <span className={cx('label')}>Họ Và Tên</span>
                    <input type="text" />
                </div>
                <div className={cx('form-input')}>
                    <span className={cx('label')}>Số Điện Thoại </span>
                    <input type="text" />
                </div>
                <div className={cx('form-input')}>
                    <span className={cx('label')}>Tỉnh, Thành Phố</span>
                    <input type="text" />
                </div>
                <div className={cx('form-input')}>
                    <span className={cx('label')}>Câu Hỏi Của Bạn</span>
                    <textarea type="text" />
                </div>
            </div>
            <div className={cx('message')}>
                <Button className={cx('btn-start')}>Để Lại Tin Nhắn</Button>
            </div> */}
        </div>
    );
}

export default Container;
