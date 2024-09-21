import React from 'react';
import classNames from 'classnames/bind';
import Styles from './container.module.scss';

const cx = classNames.bind(Styles);

function Index() {
    const data = [
        {
            title: 'TẦM NHÌN',
            description:
                'Trở thành trường có chất lượng giảng dạy hàng đầu tại Việt Nam. Đồng thời là nơi thúc đẩy phát triển học sinh một cách toàn diện; bao gồm trí tuệ, thể chất, tinh thần, sáng tạo và kỹ năng độc lập để phù hợp với môi trường Đại học trong và ngoài nước.',
        },
        {
            title: 'SỨ MỆNH',
            description:
                'Trường có sứ mệnh là đào tạo các em trở thành những công dân gương mẫu và có trách nhiệm với xã hội. Đồng thời, giúp các em ươm mầm tiềm năng và phẩm chất của mình, sao cho mỗi em đều có khả năng để sống hạnh phúc và thành công. Từ đó góp phần dựng xây đất nước ngày một lớn mạnh và hội nhập với bè bạn quốc tế.',
        },
        {
            title: 'CƠ SỞ VẬT CHẤT',
            description:
                'Trường tự tin là ngôi trường có cơ sở vật chất được xây mới và đầu tư trang thiết bị hiện đại 100% theo chuẩn Quốc tế, hỗ trợ tối đa các em học sinh trong học tập và rèn luyện. Ngoài ra, chúng tôi cũng có phòng ở khang trang, thoáng mát và được trang bị hệ thống điều hòa, mang đến cho các em không gian thoải mái trong học tập và sinh hoạt.',
        },
        {
            title: 'KỶ LUẬT',
            description:
                'Với phương châm “Kỷ cương – Tình thương – Trách nhiệm”, học sinh nội trú sẽ có cơ hội được sinh hoạt trong môi trường kỷ luật nghiêm nhất ở VIỆT NAM hiện nay. Các em sẽ được thầy cô rèn luyện đạo đức, nề nếp sinh hoạt khoa học và nói không với các chất kích thích trong môi trường học đường.',
        },
        {
            title: 'CHĂM SÓC',
            description:
                'Trường đặc biệt đầu tư hệ thống chăm sóc sức khỏe học sinh toàn diện, cung cấp và cập nhật tất cả thông tin về tình hình thể trạng của các em, bao gồm sức khỏe thể chất và tinh thần. Không chỉ thế, chúng tôi còn có đội ngũ giáo viên, giáo vụ, nhân viên y tế học đường và ban quản sinh với tinh thần làm việc chuyên nghiệp, cùng tấm lòng nhiệt huyết dành cho các em học sinh.',
        },
        {
            title: 'DU HỌC',
            description:
                'Trường sẽ hiện thực hóa ước mơ khám phá chân trời mới cho các em với mức học phí và chi phí hợp lý. Với văn phòng tư vấn du học chuyên nghiệp cùng mối quan hệ Quốc tế đáng tin cậy, phụ huynh và học sinh có thể an tâm tin tưởng ở chúng tôi. Mọi quy trình hướng dẫn đăng ký và thanh toán sẽ được Trường tư vấn tận tình, cụ thể và không tính phí. Đặc biệt, chúng tôi còn hỗ trợ dịch vụ chứng minh tài chính khi đi du học cho phụ huynh và học sinh.',
        },
    ];
    return (
        <div className={cx('wrapper')}>
            <div className={cx('list')}>
                {data.map((item, index) => (
                    <div className={cx('item')} key={index}>
                        <div className={cx('content')}>
                            <h2>{item.title}</h2>
                            <p>{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Index;
