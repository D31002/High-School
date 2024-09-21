import React from 'react';
import classNames from 'classnames/bind';
import Styles from '../../ListItem.module.scss';
import ListItem from '../../ListItem';
import Button from '../../../../../../Component/button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(Styles);

const data = [
    {
        img: 'https://www.ctu.edu.vn/images/upload/news/2023/ltkkdbdt04a.jpg',
        title: 'Lễ tổng kết năm học 2022 - 2023 Khoa Dự bị Dân tộc, Trường Đại học Cần Thơ',
        to: '/',
        body: 'Ngày 07/9/2023, Khoa Dự bị Dân tộc (DBDT), Trường Đại học Cần Thơ (ĐHCT) tổ chức Lễ tổng kết công tác đào tạo dự bị đại học năm học 2022 - 2023. Tham dự buổi lễ có PGS.TS. Trần Trung Tính, Phó Hiệu trưởng Trường ĐHCT; đại diện lãnh đạo các khoa, phòng ban chức năng trong Trường; Ban Chủ nhiệm, quý thầy, cô giảng dạy và học sinh của Khoa DBDT.Theo Quy chế tuyển sinh của Bộ Giáo dục và Đào tạo trong ưu tiên tuyển sinh và Nghị quyết số 30a/2008/NQ-CP của Chính phủ về chương trình hỗ trợ giảm nghèo nhanh và bền vững đối với 20 huyện nghèo thuộc khu vực Tây Nam Bộ, Khoa DBDT thực hiện tổ chức đào tạo hệ xét tuyển thẳng vào học bổ sung kiến thức. Qua 10 năm, Khoa DBDT đã đào tạo được hơn 2.500 học sinh được xét tuyển thẳng. Theo đó, trong năm học 2022 - 2023, Khoa DBDT đã tiếp nhận và tổ chức giảng dạy cho 256 học sinh. Các học sinh được chia thành 7 lớp học và bồi dưỡng kiến thức với 4 môn học: Toán học, Ngữ văn, tiếng Anh và Tin học.',
    },
    {
        img: 'https://www.ctu.edu.vn/images/upload/news/2023/kgthptthsp2a.jpg',
        title: 'Lễ khai giảng năm học 2023 - 2024 Trường THPT Thực hành Sư phạm, Trường Đại học Cần Thơ',
        to: '/',
        body: 'Hòa trong không khí phấn khởi, vui tươi của học sinh cả nước đón chào năm học mới, sáng ngày 05/9/2023, Trường THPT Thực hành Sư phạm - Trường Đại học Cần Thơ (ĐHCT) đã long trọng tổ chức Lễ Khai giảng năm học 2023 - 2024. Buổi lễ có sự tham dự của đại diện Sở Giáo dục và Đào tạo thành phố Cần Thơ; đại diện Ban Giám hiệu Trường ĐHCT, Đoàn Thanh niên; các khoa, phòng, ban, trung tâm trực thuộc Trường ĐHCT. Về phía Trường THPT Thực hành Sư phạm có các nguyên lãnh đạo, Ban Giám hiệu, Ban Đại diện Hội cha mẹ học sinh cùng các cán bộ, giáo viên, nhân viên và toàn thể học sinh của trường.',
    },
    {
        img: 'https://www.ctu.edu.vn/images/upload/news/2023/lptn01a.jpg',
        title: 'Lấy phiếu tín nhiệm đối với chức danh, chức vụ lãnh đạo, quản lý thuộc Trường Đại học Cần Thơ',
        to: '/',
        body: 'Thực hiện Quy định số 96-QĐ/TW ngày 02/02/2023 của Bộ Chính trị về lấy phiếu tín nhiệm đối với chức danh, chức vụ lãnh đạo, quản lý trong hệ thống chính trị; nhằm thực hiện chủ trương của Đảng về xây dựng, chỉnh đốn Đảng và hệ thống chính trị; đấu tranh phòng, chống tham nhũng, tiêu cực; xây dựng đội ngũ cán bộ lãnh đạo, quản lý các cấp có đủ phẩm chất, năng lực, uy tín, ngang tầm nhiệm vụ, căn cứ Kế hoạch số 194-KH/TU ngày 16/5/2023 của Thành ủy Cần Thơ về việc thực hiện lấy phiếu tín nhiệm đối với cán bộ giữ chức danh, chức vụ lãnh đạo, quản lý của các cơ quan, đơn vị trong hệ thống chính trị, ngày 04/8/2023, Đảng ủy Trường Đại học Cần Thơ tổ chức Hội nghị lấy phiếu tín nhiệm Ban Thường vụ Đảng ủy trường, nhiệm kỳ 2020-2025 với thành phần tham dự gồm các đồng chí trong Ban Chấp hành Đảng bộ trường.Tiếp theo đó, thực hiện Kế hoạch số 19-KH/BCSĐ ngày 18/7/2023 của Ban cán sự đảng Bộ Giáo dục và Đào tạo và Kế hoạch số 2906/KH-ĐHCT ngày 08/8/2023 của Tập thể lãnh đạo Trường Đại học Cần Thơ, ngày 31/8/2023, Tập thể lãnh đạo trường tổ chức Hội nghị lấy phiếu tín nhiệm Chủ tịch Hội đồng trường và các Phó Hiệu trưởng Trường Đại học Cần Thơ, nhiệm kỳ 2020-2025 với thành phần tham dự là các đồng chí trong Ban Chấp hành Đảng bộ trường, Phó Chủ tịch Hội đồng trường, các Phó Hiệu trưởng, trưởng và phó phụ trách các đơn vị thuộc và trực thuộc Trường, Chủ tịch Công đoàn Trường, Bí thư Đoàn Thanh niên Trường và Chủ tịch Hội Cựu Chiến binh Trường.',
    },
    {
        img: 'https://www.ctu.edu.vn/images/upload/news/2023/tdsvindo-tkt-05.jpg',
        title: 'Chương trình trao đổi sinh viên ngắn hạn tại trường đại học Airlangga, Indonesia',
        to: '/',
        body: 'Từ ngày 21/5 đến ngày 27/5/2023, Trường Kinh tế - Trường Đại học Cần Thơ đã tổ chức cho 19 sinh viên tham gia chương trình trao đổi học tập ngắn hạn tại Trường Đại học Airlangga, Indonesia. Cán bộ dẫn đoàn gồm PGS. TS. Võ Văn Dứt, Trưởng Khoa Kinh doanh quốc tế; ThS. Trần Việt Thanh Trúc, Giảng viên Khoa Tài chính - Ngân hàng và ThS. Nguyễn Thị Thúy Ngân, Giảng viên Khoa Kinh tế học cùng với 19 sinh viên từ các chuyên ngành khác nhau thỏa điều kiện tuyển chọn về học lực và tiếng Anh.Chuyến trao đổi là cơ hội để sinh viên trải nghiệm và tích lũy những kiến thức trong môi trường học tập quốc tế. Đồng thời, chương trình trao đổi còn đóng góp tích cực vào việc tăng cường tình hữu nghị và sự hợp tác giữa Trường Kinh tế - Trường Đại học Cần Thơ, Việt Nam và Khoa Kinh tế và Kinh doanh - Trường Đại học Airlangga, Indonesia.',
    },
    {
        img: 'https://www.ctu.edu.vn/images/upload/news/2023/APU2023-02a.jpg',
        title: 'Sinh viên Trường Công nghệ Thông tin và Truyền thông - Trường Đại học Cần Thơ trao đổi học tập tại Malaysia',
        to: '/',
        body: 'Từ ngày 18 đến ngày 22 tháng 7 năm 2023, 15 sinh viên Trường Công nghệ Thông tin và Truyền thông (CNTT-TT) được Trường Đại học Cần Thơ (ĐHCT) cấp học bổng khuyến khích để đi tham quan học tập ngắn hạn tại Trường Đại học Châu Á Thái Bình Dương, Malaysia (APU).Chuyến đi đã tạo điều kiện cho các em có cơ hội tham quan cơ sở vật chất, tìm hiểu về điều kiện học tập các phòng thí nghiệm của Trường APU. Tại đây, các em được tham gia hai khóa đào tạo về Công nghệ IoT và An ninh mạng, giao lưu với giảng viên và sinh viên của Trường APU.Cũng trong dịp này các giảng viên dẫn đoàn của Trường CNTT-TT đã có buổi làm việc với lãnh đạo Trường Kỹ thuật (thuộc APU) và các bộ môn của Trường APU về thiết lập hợp tác trong lĩnh vực An ninh mạng giữa hai đơn vị.',
    },
    {
        img: 'https://www.ctu.edu.vn/images/upload/news/2023/svtkttqhtdailoan01a.jpg',
        title: 'Sinh viên Trường Kinh tế, Trường Đại học Cần Thơ học tập thực tế tại Đại học Yuan Ze - Đài Loan',
        to: '/',
        body: 'Từ ngày 06/5 đến ngày 10/5/2023, Trường Kinh tế - Trường Đại học Cần Thơ (Can Tho University School of Economics - CSE) đã tổ chức chuyến trao đổi học tập ngắn hạn cho 20 sinh viên có thành tích học tập xuất sắc tại Đại học Yuan Ze Đài Loan (YZU). Tham gia dẫn đoàn là hai giảng viên của CSE gồm Cô Lê Trần Thiên Ý – Phó Trưởng Khoa Kinh doanh quốc tế và Thầy Nguyễn Minh Cảnh – giảng viên Khoa Quản trị Kinh doanh. Trường Đại học Yuan Ze là trường đại học tư thục thuộc Tập đoàn Far Eastern. YZU tọa lạc tại thành phố Taoyuan, Đài Loan và được thành lập vào năm 1989. Trường nằm trong top 12 trường đại học hàng đầu tại Đài Loan, với hơn 9.000 sinh viên đang theo học. Ngoài ra, YZU được xếp hạng 1.000+ đại học thế giới năm 2020 bởi Times Higher Education, và được xếp hạng 251–300 bởi Times Higher Education Young University năm 2020.',
    },
    {
        img: 'https://www.ctu.edu.vn/images/upload/Tap_chi_Khoa_hoc_DHCTa.jpg',
        title: 'Điểm công trình Tạp chí Khoa học Đại học Cần Thơ năm 2023',
        to: '/',
        body: 'Ngày 05/7/2023, Hội đồng Giáo sư Nhà nước đã ban hành Quyết định số 22/QĐ-HĐGSNN phê duyệt danh mục tạp chí khoa học được tính điểm năm 2023. Theo đó, Tạp chí Khoa học Đại học Cần Thơ ngôn ngữ tiếng Việt và CTU Journal of Innovation and Sustainable Development ngôn ngữ tiếng Anh được phê duyệt trong các danh mục tạp chí Hội đồng Giáo sư ngành, liên ngành năm 2023 như sau:',
    },
    {
        img: 'https://www.ctu.edu.vn/images/upload/Tap_chi_Khoa_hoc_DHCTa.jpg',
        title: 'Điểm công trình Tạp chí Khoa học Đại học Cần Thơ năm 2023',
        to: '/',
        body: 'Ngày 05/7/2023, Hội đồng Giáo sư Nhà nước đã ban hành Quyết định số 22/QĐ-HĐGSNN phê duyệt danh mục tạp chí khoa học được tính điểm năm 2023. Theo đó, Tạp chí Khoa học Đại học Cần Thơ ngôn ngữ tiếng Việt và CTU Journal of Innovation and Sustainable Development ngôn ngữ tiếng Anh được phê duyệt trong các danh mục tạp chí Hội đồng Giáo sư ngành, liên ngành năm 2023 như sau:',
    },
];

function Index() {
    return (
        <div className={cx('sub-notification')}>
            <div className={cx('heading')}>
                <h4>TIN TỨC</h4>
            </div>
            <div className={cx('list-notification')}>
                {data.map((item, index) => {
                    return <ListItem key={index} data={item} />;
                })}
            </div>
            <div className={cx('more-news')}>
                <Button className={cx('more-news-btn')} to="/tintuc">
                    <FontAwesomeIcon icon={faArrowRight} className={cx('more-btn-icon')} />
                    <span>Xem Thêm</span>
                </Button>
            </div>
            <div className={cx('img')}></div>
        </div>
    );
}

export default Index;
