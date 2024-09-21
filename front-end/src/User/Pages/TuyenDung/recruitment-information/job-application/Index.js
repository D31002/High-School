import React from 'react';
import classNames from 'classnames/bind';
import Styles from './job-application.module.scss';
import Job1 from '../../../../Component/Assets/Img/job1.png';
import Job2 from '../../../../Component/Assets/Img/job2.png';
import Job3 from '../../../../Component/Assets/Img/job3.png';
import Job4 from '../../../../Component/Assets/Img/job4.png';

const cx = classNames.bind(Styles);

function Index() {
    return (
        <div className={cx('wrapper')}>
            <h1>HỒ SƠ XIN VIỆC</h1>
            <div className={cx('working-process')}>
                <div className={cx('item')}>
                    <img src={Job1} alt="anh" />
                    <p>Đơn xin việc</p>
                </div>
                <div className={cx('item')}>
                    <img src={Job2} alt="anh" />
                    <p>Sơ yếu lý lịch</p>
                    <p>(có xác nhận của chính quyền địa phương)</p>
                </div>
                <div className={cx('item')}>
                    <img src={Job3} alt="anh" />
                    <p>Bản sao CMND và hộ khẩu</p>
                    <p>(công chứng)</p>
                </div>
                <div className={cx('item')}>
                    <img src={Job4} alt="anh" />
                    <p>Các giấy tờ, văn bằng liên quan.</p>
                </div>
            </div>
        </div>
    );
}

export default Index;
