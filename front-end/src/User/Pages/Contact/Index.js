import React from 'react';
import classNames from 'classnames/bind';
import Styles from './Contact.module.scss';
import Button from '../../../Component/button/Button';

const cx = classNames.bind(Styles);

function Index() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('row')}>
                <div className={cx('item')}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.8415183216944!2d105.77061529999999!3d10.0299337!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0895a51d60719%3A0x9d76b0035f6d53d0!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBD4bqnbiBUaMah!5e0!3m2!1svi!2s!4v1694859141183!5m2!1svi!2s"
                        title="Trường THPT ...."
                        loading="lazy"
                    ></iframe>
                </div>
                <div className={cx('item')}>
                    <h1 className={cx('heading')}>TRƯỜNG THPT</h1>
                    <ul className={cx('list-address')}>
                        <li className={cx('item-address')}>
                            <span className={cx('item-address-title')}> Địa chỉ: </span>
                            <span className={cx('item-address-description')}>
                                04, Đ 3/2, P.Xuân Khánh, Q.Ninh Kiều, TP.Cần Thơ
                            </span>
                        </li>
                        <li className={cx('item-address')}>
                            <span className={cx('item-address-title')}> Hotline: </span>
                            <span className={cx('item-address-description')}>0943946242 – 0932323323</span>
                        </li>
                        <li className={cx('item-address')}>
                            <span className={cx('item-address-title')}> Email: </span>
                            <span className={cx('item-address-description')}>dai03102002@gmail.com</span>
                        </li>
                        <li className={cx('item-address')}>
                            <span className={cx('item-address-title')}> Website: </span>
                            <span className={cx('item-address-description')}>www.highschool.com</span>
                        </li>
                        <li className={cx('item-address')}>
                            <span className={cx('item-address-title')}> Giờ mở cửa: </span>
                            <span className={cx('item-address-description')}>
                                Thứ 2-Thứ 6: 7am-5pm / Thứ 7: 8am – 5pm
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={cx('row')}>
                <div className={cx('item')}>
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
                            <textarea placeholder="Nội Dung" type="text" />
                        </p>
                        <div className={cx('btn-send')}>
                            <Button className={cx('send')}>Gửi</Button>
                        </div>
                    </div>
                </div>
                <div className={cx('item')}>
                    <img
                        src="https://res.cloudinary.com/danrswhe6/image/upload/v1721960169/imageStudentPageHome_kbh77m.png"
                        alt="anh"
                    />
                </div>
            </div>
        </div>
    );
}

export default Index;
