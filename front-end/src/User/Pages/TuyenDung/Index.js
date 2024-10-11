import React from 'react';
import classNames from 'classnames/bind';
import Styles from './TuyenDung.module.scss';
import Information from './recruitment-information/Index';

const cx = classNames.bind(Styles);

function Index() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('introduce')}>
                    <h1>TUYỂN DỤNG</h1>
                    <p>
                        Trường là Trường đầu tư về chất lượng giáo dục hàng đầu trong hệ thống các Trường tại Việt Nam,
                        cung cấp cho học sinh những kiến thức tốt nhất, nhằm chuẩn bị cho các em đạt được những thành
                        công cao nhất trong các Trường Đại học tại Việt Nam và Quốc tế, đảm bảo các em có kiến thức vượt
                        trội so với các trường khác sau một năm học tại Trường Việt Âu. Nâng cao trình độ ngoại ngữ bằng
                        chương trình Tiếng Anh Quốc Tế.
                    </p>
                    <p>
                        Trong năm học 2023 – 2024, để tiếp tục thực hiện sứ mệnh của mình, nhà trường cần tuyển thêm một
                        số giáo viên tham gia giảng dạy cho các bộ môn Toán học, Tin học, Sinh học, Hóa học, Ngữ văn,
                        Giáo dục Công dân, Mỹ thuật, và Âm nhạc với chi tiết như dưới đây.
                    </p>
                </div>
                <img
                    src="https://res.cloudinary.com/danrswhe6/image/upload/v1721960169/imageStudentPageHome_kbh77m.png"
                    alt="anh"
                />
            </div>
            <div className={cx('recruitment-information')}>
                <Information />
            </div>
        </div>
    );
}

export default Index;
