import React from 'react';
import classNames from 'classnames/bind';
import Styles from './Item.module.scss';
import Img1 from '../../../../Component/Assets/Img/number-1.png';
import Img2 from '../../../../Component/Assets/Img/number-2.png';
import Img3 from '../../../../Component/Assets/Img/number-3.png';
import Img4 from '../../../../Component/Assets/Img/number-4.png';

const cx = classNames.bind(Styles);

function Index() {
    const data = [
        {
            img: Img1,
            number: '1.500+',
            title: 'Học Sinh đang theo học THPT',
        },
        {
            img: Img2,
            number: '100%',
            title: 'Học sinh Tốt nghiệp THPT Quốc Gia',
        },
        {
            img: Img3,
            number: '96%',
            title: 'Học sinh trúng tuyển Đại Học',
        },
        {
            img: Img4,
            number: '500+',
            title: 'Học sinh đạt chứng chỉ Anh Văn Quốc Tế',
        },
    ];
    return (
        <div className={cx('list')}>
            {data.map((item, index) => (
                <div className={cx('item')} key={index}>
                    <div className={cx('img')}>
                        <img src={item.img} alt="anh" />
                    </div>
                    <div className={cx('container')}>
                        <span className={cx('number')}>{item.number}</span>
                        <p className={cx('title')}>{item.title}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Index;
