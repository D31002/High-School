import React from 'react';
import classNames from 'classnames/bind';
import Styles from './GTTS.module.scss';
import Button from '../../../Component/button/Button';
import Tick from '../../Component/Assets/Img/tick.png';
import QTLV1 from '../../Component/Assets/Img/QUY TRÌNH LÀM VIỆC - 1.png';
import QTLV2 from '../../Component/Assets/Img/QUY TRÌNH LÀM VIỆC - 2.png';
import QTLV3 from '../../Component/Assets/Img/QUY TRÌNH LÀM VIỆC - 3.png';
import QTLV4 from '../../Component/Assets/Img/QUY TRÌNH LÀM VIỆC - 4.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(Styles);

function Index() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h1>HỆ THỐNG GIÁO DỤC</h1>
                <p>
                    Được thành lập từ năm 2000, với hơn 2500 học sinh và 400 nhân viên – giáo viên hiện đang học tập và
                    làm việc với môi trường không ngừng phát triển. Trường đầu tư tốt nhất về chất lượng giáo dục trong
                    hệ thống các trường THPT tại Tại Việt Nam, mang đến cho học sinh những giá trị hữu ích, giúp các em
                    đạt được những thành công vượt trội tại các trường Đại học ở Việt Nam và Quốc Tế
                </p>
                <div className={cx('btn-link')}>
                    <Button className={cx('btn')} to="/">
                        LIÊN HỆ TƯ VẤN
                    </Button>
                </div>
            </div>

            <div className={cx('center')}>
                <div className={cx('container')}>
                    <img
                        src="https://res.cloudinary.com/danrswhe6/image/upload/v1721960169/imageStudentPageHome_kbh77m.png"
                        alt="anh"
                    />
                    <div className={cx('vision')}>
                        <h1>TẦM NHÌN PHÁT TRIỂN & SỨ MỆNH GIÁO DỤC</h1>
                        <div className={cx('vision-introduce')}>
                            <img src={Tick} alt="anh" />
                            <span>Trở thành Trường có chất lượng giảng dạy hàng đầu tại Việt Nam</span>
                        </div>
                        <div className={cx('vision-introduce')}>
                            <img src={Tick} alt="anh" />
                            <span>
                                Là nơi thúc đẩy học sinh phát triển toàn diện: Trí tuệ, cảm xúc, tinh thần, sáng tạo và
                                kỹ năng độc lập.
                            </span>
                        </div>
                        <div className={cx('vision-introduce')}>
                            <img src={Tick} alt="anh" />
                            <span>
                                Xây dựng hình mẫu công dân toàn cầu luôn sẵn sàng chinh phục đường đua hội nhập Quốc Tế.
                            </span>
                        </div>
                        <div className={cx('vision-introduce')}>
                            <img src={Tick} alt="anh" />
                            <span>
                                Lấy người học làm trung tâm, phát triển toàn diện trên mỗi học sinh đủ Trí – Đức – Thể –
                                Mỹ
                            </span>
                        </div>
                        <div className={cx('vision-introduce')}>
                            <img src={Tick} alt="anh" />
                            <span>
                                Khích lệ các em đạt được tiềm năng độc đáo của bản thân mình và trở thành người có trách
                                nghiệm trong việc học tập, cá nhân, xã hội và nghề nghiệp trong tương lai.
                            </span>
                        </div>
                    </div>
                </div>
                <div className={cx('btn-link')}>
                    <Button className={cx('btn')} to="/">
                        <span>ĐĂNG KÝ DỰ TUYỂN</span>
                        <FontAwesomeIcon icon={faPlus} className={cx('icon')} />
                    </Button>
                </div>
            </div>

            <div className={cx('footer')}>
                <h1>QUY TRÌNH LÀM VIỆC CỦA TRƯỜNG BAO GỒM</h1>
                <div className={cx('working-process')}>
                    <div className={cx('item')}>
                        <img src={QTLV1} alt="anh" />
                        <p>Xác định yêu cầu của học sinh</p>
                    </div>
                    <div className={cx('item')}>
                        <img src={QTLV2} alt="anh" />
                        <p>Xác nhận hồ sơ xét tuyển</p>
                    </div>
                    <div className={cx('item')}>
                        <img src={QTLV3} alt="anh" />
                        <p>Học sinh tham khảo học phí</p>
                    </div>
                    <div className={cx('item')}>
                        <img src={QTLV4} alt="anh" />
                        <p>Đăng ký dự tuyển</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Index;
