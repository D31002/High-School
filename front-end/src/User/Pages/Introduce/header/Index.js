import React from 'react';
import classNames from 'classnames/bind';
import Styles from './header.module.scss';
import Button from '../../../../Component/button/Button';
import FanpageImg from '../../../Component/Assets/Img/camera.png';
import InboxImg from '../../../Component/Assets/Img/book.png';

const cx = classNames.bind(Styles);

function Index() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('heading')}>
                <h1>VỀ CHÚNG TÔI</h1>
                <p>
                    Một ngôi trường có chất lượng giảng dạy nằm trong các trường hàng đầu tại Việt Nam. Được thành lập
                    vào năm 2000, đến nay trường đã được đầu tư bài bản về cơ sở hạ tầng, chất lượng giảng dạy và chương
                    trình giáo dục, trở thành một trường học nhận được sự tin tưởng của đông đảo phụ huynh và học sinh.
                </p>
                <p>
                    Trường không chỉ tạo ra những người học giỏi, mà còn là nơi nuôi dưỡng tinh thần tự tin, khả năng tư
                    duy sáng tạo, và ý thức xã hội. Chúng tôi tự hào về sứ mệnh giáo dục và sẽ tiếp tục đồng hành cùng
                    học sinh trên con đường vinh quang của kiến thức và sự phát triển cá nhân.
                </p>
            </div>

            <div className={cx('link')}>
                <Button className={cx('fanpage')} to="/">
                    <img src={FanpageImg} alt="anh" />
                    <h3>FANPAGE</h3>
                </Button>
                <Button className={cx('inbox')} to="/">
                    <img src={InboxImg} alt="anh" />
                    <h3>LIÊN HỆ TƯ VẤN</h3>
                </Button>
            </div>
        </div>
    );
}

export default Index;
