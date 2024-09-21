import React from 'react';
import classNames from 'classnames/bind';
import Styles from './Number.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit, faUserGraduate, faUsers, faMicroscope, faHandshake } from '@fortawesome/free-solid-svg-icons';
import Quantity from './Quantity';

const cx = classNames.bind(Styles);

function Index() {
    const data = [
        {
            icon: faUserEdit,
            quantity: 10000,
            title: 'Học Sinh',
        },
        {
            icon: faUsers,
            quantity: 2000,
            title: 'Thầy, Cô Giáo',
        },
        {
            icon: faUserGraduate,
            quantity: 7200,
            title: 'Học Sinh Giỏi',
        },
        {
            icon: faUserGraduate,
            quantity: 2800,
            title: 'Học Sinh Khá',
        },
        {
            icon: faMicroscope,
            quantity: 177,
            title: 'Đề Tài NCKH',
        },
        {
            icon: faHandshake,
            quantity: 43,
            title: 'Dự Án Quốc Tế',
        },
    ];
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <h1>TRẢI NGHIỆM ĐỂ TRƯỞNG THÀNH</h1>
                <p>
                    300,000 PHỤ HUYNH, 100,000 HỌC SINH ĐÃ TIN TƯỞNG LỰA CHỌN CT SCHOOL LÀM MÔI TRƯỜNG HỌC TẬP, TRẢI
                    NGHIỆM VÀ TRƯỞNG THÀNH CHO NHỮNG MẦM NON TƯƠNG LAI CỦA ĐẤT NƯỚC
                </p>
                <p>(Tính đến cuối năm 2022)</p>
            </div>
            <div className={cx('container')}>
                {data.map((item, index) => {
                    return (
                        <div className={cx('item')} key={index}>
                            <FontAwesomeIcon icon={item.icon} className={cx('item-icon')} />
                            <Quantity quantity={item.quantity} />
                            <span className={cx('title')}>{item.title}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Index;
