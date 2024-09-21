import React from 'react';
import classNames from 'classnames/bind';
import Style from './Activity.module.scss';
import Movement from './movement/Index';
import Extracurricular from './extracurricular/Index';

const cx = classNames.bind(Style);

function Index() {
    const images1 = [
        'https://truongsaigongiadinh.edu.vn/wp-content/uploads/2023/03/IMG_0833-2048x1365.jpg',
        'https://truongsaigongiadinh.edu.vn/wp-content/uploads/2023/03/IMG_0663-2048x1365.jpg',
    ];
    const images2 = [
        'https://truongsaigongiadinh.edu.vn/wp-content/uploads/2023/03/IMG_0828-2048x1365.jpg',
        'https://truongsaigongiadinh.edu.vn/wp-content/uploads/2023/03/IMG_0833-2048x1365.jpg',
    ];
    return (
        <div className={cx('wrapper')}>
            <div className={cx('list-movement')}>
                <h2 className={cx('heading')}>HÌNH ẢNH VÀ CÁC VIDEO HOẠT ĐỘNG NỔI BẬT</h2>
                <div className={cx('movement-items')}>
                    <Movement
                        title="CÂU LẠC BỘ BÓNG ĐÁ"
                        img="https://truongsaigongiadinh.edu.vn/wp-content/uploads/2022/03/CLB-BO-BONG-DA.jpg"
                    />
                    <Movement
                        title="CÂU LẠC BỘ BÓNG BÀN"
                        img="https://truongsaigongiadinh.edu.vn/wp-content/uploads/2022/03/CLB-BONG-BAN.jpg"
                    />
                    <Movement
                        title="CÂU LẠC BỘ VÕ THUẬT"
                        img="https://truongsaigongiadinh.edu.vn/wp-content/uploads/2022/02/CLB-BO-VO-THUAT.jpg"
                    />
                    <Movement
                        title="CÂU LẠC BỘ ANH VĂN"
                        img="https://truongsaigongiadinh.edu.vn/wp-content/uploads/2022/03/CLB-ANH-VAN.jpg"
                    />
                    <Movement
                        title="CÂU LẠC BỘ TIN HỌC"
                        img="https://truongsaigongiadinh.edu.vn/wp-content/uploads/2022/03/CLB-TIN-HOC.jpg"
                    />
                    <Movement
                        title="CÂU LẠC BỘ VĂN NGHỆ"
                        img="https://truongsaigongiadinh.edu.vn/wp-content/uploads/2022/03/CLB-VAN-NGHE.jpg"
                    />
                </div>
            </div>
            <div className={cx('list-extracurricular')}>
                <h2 className={cx('heading')}>
                    HÌNH ẢNH VÀ VIDEO CỦA CÁC HOẠT ĐỘNG NGOẠI KHÓA - DÃ NGOẠI NĂM 2023 -2024
                </h2>
                <div className={cx('extracurricular-items')}>
                    <Extracurricular images={images1} title="NGOẠI KHÓA- CỦ CHI" />
                    <Extracurricular images={images2} title="MỘT SỐ HÌNH ẢNH" />
                </div>
            </div>
        </div>
    );
}

export default Index;
