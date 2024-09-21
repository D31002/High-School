import React from 'react';
import classNames from 'classnames/bind';
import Styles from './images.module.scss';
const cx = classNames.bind(Styles);

function Index() {
    const dataImg = [
        { src: 'https://www.ctu.edu.vn/images/2023/01/30/hoa-mai.jpg' },
        { src: 'https://www.ctu.edu.vn/images/2023/02/08/lrc.jpg' },
        { src: 'https://www.ctu.edu.vn/images/2022/08/12/ctu3.png' },
        { src: 'https://www.ctu.edu.vn/images/2022/08/12/hitech-2.jpg' },
        { src: 'https://www.ctu.edu.vn/images/2022/08/12/totnghiep.jpg' },
        { src: 'https://www.ctu.edu.vn/images/2022/05/17/lrc.webp' },
    ];
    return (
        <div className={cx('wrapper')}>
            <h1>GÓC ẢNH THPT CẦN THƠ</h1>
            <div className={cx('list-img')}>
                {dataImg.map((img, index) => {
                    return <img key={index} src={img.src} alt="anh" />;
                })}
            </div>
        </div>
    );
}

export default Index;
