import React from 'react';
import classNames from 'classnames/bind';
import Styles from './Benefit.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRoadBridge } from '@fortawesome/free-solid-svg-icons';
import Img1 from '../../../Component/Assets/Img/benefit-1.png';
import Img2 from '../../../Component/Assets/Img/benefit-2.png';
import Img3 from '../../../Component/Assets/Img/benefit-3.png';
import Img4 from '../../../Component/Assets/Img/benefit-4.png';
import Img5 from '../../../Component/Assets/Img/benefit-5.png';
import Img6 from '../../../Component/Assets/Img/img7.jpg';

const cx = classNames.bind(Styles);

function Index() {
    const data = [
        {
            img: Img1,
            title: 'TRANG BỊ CHUYÊN MÔN CAO',
            description:
                'Là ngôi trường ngoài công lập tiên phong triển khai chương trình giáo dục phổ thông mới cho học sinh lớp 10, Trường .... tự tin là ngôi trường có chương trình giáo dục tiên tiến nhất hiện nay.',
        },
        {
            img: Img2,
            title: 'TÍCH HỢP THÊM KỸ NĂNG MỀM',
            description:
                'Trường luôn có rất nhiều các hoạt động giải trí hàng năm để học sinh được giải trí cũng như trau dồi thêm các kỹ năng mềm cần thiết, rèn luyện thể lực, tính tư duy, sáng tạo trong công việc.',
        },
        {
            img: Img3,
            title: 'HỌC VỚI GIÁO VIÊN GIÀU KINH NGHIỆM',
            description:
                'Với đội ngũ giáo viên được tuyển dụng và đào tạo một cách bài bản, các giáo trình được soạn kỹ lưỡng để đưa kiến thức đến cho các em học sinh một cách tự nhiên, dễ hiểu.',
        },
        {
            img: Img4,
            title: 'ĐIỀU KIỆN THI ĐẠI HỌC CHÍNH QUY',
            description:
                'Trường THPT luôn tạo điều kiện tốt nhất để các em học sinh có đủ điều kiện để tham gia rèn luyện hoàn thiện bản thân. Đặc biệt hơn, tùy thuộc vào mong muốn và nguyện vọng của học sinh, trường cũng có thể hỗ trợ để các em giành được các học bổng ở các trường đại học top đầu Việt Nam.',
        },
        {
            img: Img5,
            title: 'XÂY DỰNG TINH THẦN TỰ HỌC',
            description:
                'Tinh thần tự học cần được rèn luyện và thực hiện liên tục không chỉ trong môi trường học tập mà còn ở khắp mọi nơi. Chính vì vậy các giáo viên chúng tôi luôn nhắc nhở, hướng dẫn cho các em học sinh các tự học và xây dựng tinh thần tự học một cách đúng đắn, khoa học nhất.',
        },
        {
            img: Img6,
            title: 'VĂN BẰNG QUỐC GIA',
            description:
                'Trường .... có một môi trường đào tạo khoa học tiên tiến. Đảm bảo các học sinh sau khi tốt nghiệp có thể thành thạo tiếng Anh, các kỹ năng mềm, cùng với đó là những kiến thức cấp 3 quan trọng bổ trợ cho quá trình tham gia kỳ thi THPT Quốc Gia và tương lai sau này.',
        },
    ];
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('heading')}>
                    <h1>LỢI ÍCH KHI NHẬP HỌC</h1>
                </div>
                <div className={cx('title')}>
                    <FontAwesomeIcon icon={faRoadBridge} className={cx('icon')} />
                    <span>
                        Các cơ sở của Nhà trường đều được xây dựng mới, trang thiết bị hiện đại 100% theo tiêu chuẩn
                        Quốc tế.
                    </span>
                </div>
            </div>
            <div className={cx('container')}>
                {data.map((item, index) => (
                    <div className={cx('item')} key={index}>
                        <div className={cx('content')}>
                            <img src={item.img} alt="anh" />
                            <div className={cx('title')}>{item.title}</div>
                            <div className={cx('description')}>{item.description}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Index;
