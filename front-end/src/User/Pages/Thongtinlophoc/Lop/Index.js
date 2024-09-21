import React from 'react';
import classNames from 'classnames/bind';
import Styles from './lop.module.scss';
import { useParams } from 'react-router-dom';
const cx = classNames.bind(Styles);

function Index() {
    const { name } = useParams();
    // const selectedLopId = localStorage.getItem('selectedLopId');
    const selectedLopGVCV = localStorage.getItem('selectedLopGVCV');

    return (
        <div className={cx('wrapper')}>
            <div className={cx('heading')}>
                <span>Lớp {name}</span>
                <h1>Thông tin lớp {name}</h1>
                <p>(năm học 2023-2024)</p>
            </div>
            <div className={cx('introduce')}>
                <p>I . GIÁO VIÊN CHỦ NHIỆM</p>
                <div className={cx('img')}>
                    <img src="https://thsp.ctu.edu.vn/images/upload/Van_Ut/b1.1.jpg" alt="anh" />
                    <p>thầy {selectedLopGVCV}</p>
                    <p>thạc sĩ</p>
                </div>
            </div>
            <div className={cx('introduce')}>
                <p>I . THÔNG TIN VỀ LỚP</p>
                <div className={cx('img')}>
                    <img src="https://thsp.ctu.edu.vn/images/upload/Van_Ut/b2.jpg" alt="anh" />
                </div>
            </div>
            <p>- Sĩ số: 34 (20 nữ, 14 nam).</p>
            <p>
                - Kết quả tuyển sinh 2022 của B1K11: Trung bình Toán - 8,85đ; Trung bình Tiếng anh - 9,5đ; Điểm TB tổng
                - 42,23đ.
            </p>
            <p>
                - Định hướng phát triển năm học 2022-2023: tham gia đầy đủ các phong trào của trường; 100% học sinh đạt
                danh hiệu Học sinh Giỏi và Hạnh kiểm Tốt; thực hiện tốt nội quy Nhà trường đưa ra.
            </p>
        </div>
    );
}

export default Index;
