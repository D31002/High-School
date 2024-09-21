import React, { useState } from 'react';
import classNames from 'classnames/bind';
import Styles from './accordion.module.scss';
import Button from '../../../../../Component/button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(Styles);

function Index() {
    const accordionData = [
        {
            title: 'Giáo viên quản nhiệm lớp',
            content: (
                <div>
                    <p>
                        <span>
                            <strong>Mô tả công việc:</strong>
                        </span>
                    </p>
                    <ul>
                        <li>
                            <span>Theo dõi và hướng dẫn học sinh theo thời khoá biểu</span>
                        </li>
                        <li>
                            <span>Trao đổi và báo cáo kết quả học tập và sinh hoạt cho phụ huynh.</span>
                        </li>
                        <li>
                            <span>Các công việc khác theo phân công của BGH nhà trường.</span>
                        </li>
                    </ul>
                    <p>
                        <span>
                            Thời gian làm việc: Từ 7h15 đến 15h30 từ thứ 2 đến Thứ 6 hàng ngày. Thứ 7 làm việc buổi sáng
                        </span>
                    </p>
                    <p>
                        <span>
                            <strong>Yêu cầu:</strong>
                        </span>
                    </p>
                    <ul>
                        <li>
                            <span>Độ tuổi: từ 22 đến 45.</span>
                        </li>
                        <li>
                            <span>
                                Trình độ: Tốt nghiệp Đại học sư phạm chuyên ngành trở lên (hoặc Đại học chuyên ngành và
                                có chứng chỉ sư phạm giảng dạy phổ thông).
                            </span>
                        </li>
                        <li>
                            <span>Năng lực:</span>
                            <ul>
                                <li>
                                    <span>
                                        Kiến thức chuyên môn sâu rộng (CK), có kiến thức sư phạm (PK) và kiến thức nội
                                        dung sư phạm (PCK)
                                    </span>
                                </li>
                                <li>
                                    <p>
                                        <span>
                                            Áp dụng hiệu quả và sáng tạo các phương pháp dạy học lấy học sinh làm trọng
                                            tâm.
                                        </span>
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <span>Có khả năng rèn luyện cho học sinh năng lực tự học.</span>
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <span>
                                            Thành thạo ứng dụng CNTT, đặc biệt là trong lĩnh vực dạy học từ xa hoặc dạy
                                            học kết hợp.
                                        </span>
                                    </p>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            ),
        },
        {
            title: 'Giáo viên quản nhiệm nội trú',
            content: (
                <div>
                    <p>
                        <span>
                            <strong>MÔ TẢ CÔNG VIỆC:</strong>
                        </span>
                    </p>
                    <ul>
                        <li>
                            <span>
                                Quản lý học sinh nội trú và hướng dẫn học sinh nội trú học tập buổi tối, trực các vị
                                trí, quan sát và kiểm tra tình hình sinh hoạt và học tập của học sinh; giáo dục học sinh
                                theo quy định của nhà Trường;
                            </span>
                        </li>
                        <li>
                            <span>
                                Phối hợp với phụ huynh học sinh, giáo viên chủ nhiệm và các bộ phận khác trong việc giáo
                                dục và rèn luyện học sinh ngày càng tiến bộ, phát triển toàn diện;
                            </span>
                        </li>
                        <li>
                            <span>Hỗ trợ các công tác khác theo sự phân công của nhà trường;</span>
                        </li>
                    </ul>
                    <p>
                        <span>
                            Thời gian làm việc: Từ 15h30 đến 7h15 sáng hôm sau, buổi trưa trực tại phòng (bao cơm)
                        </span>
                    </p>
                    <p>
                        <span>
                            <strong>YÊU CẦU:</strong>
                        </span>
                    </p>
                    <ul>
                        <li>
                            <span>Tốt nghiệp trung cấp, cao đẳng, ĐH các ngành Sư phạm hoặc Tâm lý Giáo dục;</span>
                        </li>
                        <li>
                            <span>Ưu tiên ứng viên nhiều kinh nghiệm.</span>
                        </li>
                    </ul>
                </div>
            ),
        },
        {
            title: 'Giáo viên bộ môn',
            content: (
                <div>
                    <p>
                        <span>
                            <strong>MÔ TẢ CÔNG VIỆC:</strong>
                        </span>
                    </p>
                    <ul>
                        <li>
                            <span>
                                Giảng dạy: Giảng dạy nội dung liên quan đến môn học cụ thể cho học sinh hoặc sinh viên.
                                Điều này bao gồm việc chuẩn bị bài giảng, trình bày thông tin một cách rõ ràng và hỗ trợ
                                học sinh trong việc hiểu và áp dụng kiến thức.
                            </span>
                        </li>
                        <li>
                            <span>
                                Lập kế hoạch giảng dạy: Tạo ra kế hoạch giảng dạy và sắp xếp nội dung học tập để đảm bảo
                                rằng học sinh hoặc sinh viên hiểu và tiếp thu được kiến thức.
                            </span>
                        </li>
                        <li>
                            <span>
                                Đánh giá học sinh: Tiến hành các bài kiểm tra, bài tập, và bài thi để đánh giá sự hiểu
                                biết và tiến bộ của học sinh. Cung cấp thông tin phản hồi để giúp học sinh cải thiện.
                            </span>
                        </li>
                        <li>
                            <span>
                                Hướng dẫn và tư vấn học sinh: Hỗ trợ học sinh trong việc lựa chọn ngành nghề hoặc hướng
                                đi học tập, và cung cấp tư vấn về nhiều khía cạnh của cuộc sống học tập.
                            </span>
                        </li>
                    </ul>
                    <p>
                        <span>
                            Thời gian làm việc: Từ 7h15 đến 15h30 từ thứ 2 đến Thứ 6 hàng ngày. Thứ 7 làm việc buổi sáng
                        </span>
                    </p>
                    <p>
                        <span>
                            <strong>YÊU CẦU:</strong>
                        </span>
                    </p>
                    <ul>
                        <li>
                            <span>
                                Công việc của một giáo viên bộ môn đòi hỏi kiến thức chuyên môn sâu, kỹ năng giao tiếp
                                xuất sắc, khả năng quản lý lớp học và tư duy sáng tạo để tạo ra môi trường học tập thú
                                vị và hiệu quả.
                            </span>
                        </li>
                    </ul>
                </div>
            ),
        },
    ];

    const [openItems, setOpenItems] = useState([]);

    // Function to toggle the open state of an item
    const toggleItem = (index) => {
        if (openItems.includes(index)) {
            setOpenItems(openItems.filter((item) => item !== index));
        } else {
            setOpenItems([...openItems, index]);
        }
    };
    return (
        <div className={cx('accordion')}>
            {accordionData.map((item, index) => (
                <div className={cx('accordion-item')} key={index}>
                    <Button className={cx('accordion-title')} onClick={() => toggleItem(index)}>
                        <FontAwesomeIcon
                            icon={openItems.includes(index) ? faAngleDown : faAngleUp}
                            className={cx('icon')}
                        />
                        <span>{item.title}</span>
                    </Button>
                    <div
                        className={cx('accordion-inner', {
                            open: openItems.includes(index),
                        })}
                    >
                        {item.content}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Index;
