import React from 'react';
import classNames from 'classnames/bind';
import Styles from './Time.module.scss';
import branding1 from '../../../../Component/Assets/Img/branding1.png';
import branding2 from '../../../../Component/Assets/Img/branding2.png';

const cx = classNames.bind(Styles);

function Index() {
    return (
        <div className={cx('wrapper')}>
            <h1>THỜI GIAN VÀ HÌNH THỨC NỘP HỒ SƠ</h1>
            <div className={cx('working-process')}>
                <div className={cx('item')}>
                    <img src={branding1} alt="anh" />
                    <p>1. Thời gian nhận hồ sơ:</p>
                    <span>Từ 7:30 đến 11h30 và 13:00 – 16:30 các ngày trong tuần từ thứ 2 đến thứ 6.</span>
                </div>
                <div className={cx('item')}>
                    <img src={branding2} alt="anh" />
                    <p>2. Hình thức nộp hồ sơ:</p>
                    <ul>
                        <li>Nộp qua Email: Vui lòng ghi rõ tiêu đề email: 'HỌ TÊN'_'ỨNG TUYỂN GIÁO VIÊN – MÔN'</li>
                        <li>
                            Nộp trực tiếp qua Website: Vui lòng điền đầy đủ thông tin và gửi CV qua Form ” NỘP HỒ SƠ DỰ
                            TUYỂN DƯỚI ĐÂY “
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Index;
