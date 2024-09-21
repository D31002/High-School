import React from 'react';
import classNames from 'classnames/bind';
import Styles from './form.module.scss';
import Button from '../../../../../Component/button/Button';

const cx = classNames.bind(Styles);

function Index() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('working-process')}>
                <div className={cx('item')}>
                    <h1>THÔNG TIN PHÒNG HÀNH CHÍNH NHÂN SỰ</h1>
                    <ul className={cx('list-address')}>
                        <li className={cx('item-address')}>
                            <span className={cx('item-address-title')}> Địa chỉ: </span>
                            <span className={cx('item-address-description')}>abc, Đ abc, P.abc, Q. abc, TP.abc</span>
                        </li>
                        <li className={cx('item-address')}>
                            <span className={cx('item-address-title')}> Hotline: </span>
                            <span className={cx('item-address-description')}>0000.000.00 – 1111.111.111</span>
                        </li>
                        <li className={cx('item-address')}>
                            <span className={cx('item-address-title')}> Email: </span>
                            <span className={cx('item-address-description')}>abc@abc.edu.vn</span>
                        </li>
                        <li className={cx('item-address')}>
                            <span className={cx('item-address-title')}> Website: </span>
                            <span className={cx('item-address-description')}>www.abc.edu.vn</span>
                        </li>
                        <li className={cx('item-address')}>
                            <span className={cx('item-address-title')}> Giờ mở cửa: </span>
                            <span className={cx('item-address-description')}>
                                Thứ 2-Thứ 6: 7am-5pm / Thứ 7: 8am – 5pm
                            </span>
                        </li>
                    </ul>
                </div>
                <div className={cx('item')}>
                    <h1>NỘP HỒ SƠ DỰ TUYỂN TẠI ĐÂY</h1>
                    <div className={cx('input')}>
                        <p>
                            <input placeholder="Họ tên" type="text" />
                        </p>
                        <p>
                            <input placeholder="Email" type="text" />
                        </p>
                        <p>
                            <input placeholder="Số Điện Thoại" type="text" />
                        </p>
                        <p>
                            <input placeholder="Vị trí ứng tuyển" type="text" />
                        </p>
                        <p>
                            <span>Nộp cv</span>
                            <input type="file" id="fileInput" />
                        </p>
                        <div className={cx('btn-send')}>
                            <Button className={cx('send')}>Gửi</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Index;
