import React from 'react';
import classNames from 'classnames/bind';
import Styles from './Right.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import Img from '../../../../Component/Assets/Img/news-img1.png';

const cx = classNames.bind(Styles);

function Index({ data }) {
    const libraryImg = [
        {
            img: Img,
        },
        {
            img: 'https://thptvietau.edu.vn/wp-content/uploads/2023/04/1.1.-Mot-trong-nhung-chi-tieu-xet-tuyen-dai-hoc.jpg',
        },
        {
            img: 'https://thptvietau.edu.vn/wp-content/uploads/2023/04/1.3.-Tao-nhieu-co-hoi-viec-lam-quoc-te.jpg',
        },
        {
            img: Img,
        },
    ];
    const datanews = data.slice(0, 7);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('news')}>
                <h3>CÁC TIN MỚI NHẤT</h3>
                {datanews.map((item, index) => (
                    <div className={cx('item')} key={index}>
                        <img src={item.img} alt="anh" />
                        <div className={cx('title')}>
                            <h1>{item.title}</h1>
                            <div className={cx('date')}>
                                <FontAwesomeIcon icon={faCalendarDays} className={cx('icon')} />
                                <span>{item.date}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className={cx('imgs')}>
                <h3>THƯ VIỆN ẢNH</h3>
                <div className={cx('img')}>
                    {libraryImg.map((item, index) => (
                        <img src={item.img} alt="anh" key={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Index;
