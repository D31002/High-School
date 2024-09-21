import React from 'react';
import classNames from 'classnames/bind';
import Styles from './EVENT.module.scss';
import Button from '../../../../Component/button/Button';
import Img from '../../../Component/Assets/Img/event-1.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(Styles);

function Index() {
    const data = [
        {
            img: Img,
            title: 'Giải Bóng Đá Nam Tại Trường',
        },
        {
            img: 'https://thptvietau.edu.vn/wp-content/uploads/2023/02/PNT2283.webp',
            title: 'Hoạt động ngoại khoá',
        },
        {
            img: 'https://thptvietau.edu.vn/wp-content/uploads/2023/04/1.1.-Huong-nghiep-cho-con-tu-som.jpg',
            title: 'Ngay hoi viec lam',
        },
        {
            img: 'https://thptvietau.edu.vn/wp-content/uploads/2023/02/TOAN2844.webp#main',
            title: 'Vui choi 26/3',
        },
    ];
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <span>UPCOMING EVENTS</span>
                <span className={cx('heading')}>SỰ KIỆN TIÊU BIỂU</span>
            </div>
            <div className={cx('list-event')}>
                {data.map((item, index) => (
                    <Button className={cx('item-event')} key={index} to="/">
                        <img className={cx('event-img')} src={item.img} alt="anh" />

                        <div className={cx('post-title')}>
                            <div className={cx('left')}>
                                <span className={cx('heading')}>Sự Kiện</span>
                                <p className={cx('title')}>{item.title}</p>
                            </div>
                            <FontAwesomeIcon icon={faArrowRight} className={cx('icon')} />
                        </div>
                    </Button>
                ))}
            </div>
            <div className={cx('more')}>
                <Button className={cx('title')} to="/sukien">
                    Xem Thêm Các Sự Kiện
                </Button>
            </div>
        </div>
    );
}

export default Index;
