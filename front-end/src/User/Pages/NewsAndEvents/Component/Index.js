import React from 'react';
import classNames from 'classnames/bind';
import Styles from './News.module.scss';
import Left from './Left/Index';
import Right from './Right/Index';
import Img from '../../../Component/Assets/Img/news-1.png';

const cx = classNames.bind(Styles);

function Index({ data }) {
    const dataNews = [
        {
            img: Img,
            date: '19/04/2023',
            title: 'Có nên đến lò luyện thi cho phần đánh giá năng lực hằng năm?',
            description:
                'Có nên đến “lò” luyện thi cho phần đánh giá năng lực hằng năm? Khi kết quả của kỳ thi đánh giá năng lực (ĐGNL) được nhiều trường sử dụng để tuyển sinh đại học, cũng là lúc mà nhiều “lò” luyện thi năng lực trở nên rầm rộ. Dẫn đến việc các em học sinh cấp 3 đều “đổ xô” đến đây để ôn thi.',
        },
        {
            img: 'https://thptvietau.edu.vn/wp-content/uploads/2023/04/1.1.-Mot-trong-nhung-chi-tieu-xet-tuyen-dai-hoc.jpg',
            date: '30/04/2023',
            title: 'Vì sao học sinh đều thi chứng chỉ IELTS? Nên học IELTS khi nào?',
            description:
                'IELTS (International English Language Testing System) là một trong những chứng chỉ tiếng Anh quốc tế. Mặc dù được ra mắt lần đầu vào năm 1980, song hiện nay chứng chỉ IELTS đang dần trở nên phổ biến hơn tại Việt Nam. Đặc biệt là đối với các em học sinh ở nhiều độ tuổi. Vì không chỉ đánh giá đúng năng lực của người học, IELTS còn mang lại nhiều lợi ích khác cho họ.',
        },
        {
            img: 'https://thptvietau.edu.vn/wp-content/uploads/2023/04/1.3.-Tao-nhieu-co-hoi-viec-lam-quoc-te.jpg',
            date: '20/04/2023',
            title: 'Tạo nhiều cơ hội việc làm quốc tế',
            description:
                'Có nên đến “lò” luyện thi cho phần đánh giá năng lực hằng năm? Khi kết quả của kỳ thi đánh giá năng lực (ĐGNL) được nhiều trường sử dụng để tuyển sinh đại học, cũng là lúc mà nhiều “lò” luyện thi năng lực trở nên rầm rộ. Dẫn đến việc các em học sinh cấp 3 đều “đổ xô” đến đây để ôn thi.',
        },
        {
            img: Img,
            date: '19/04/2023',
            title: 'ĐIỀU KIỆN THI ĐẠI HỌC CHÍNH QUY',
            description:
                'Có nên đến “lò” luyện thi cho phần đánh giá năng lực hằng năm? Khi kết quả của kỳ thi đánh giá năng lực (ĐGNL) được nhiều trường sử dụng để tuyển sinh đại học, cũng là lúc mà nhiều “lò” luyện thi năng lực trở nên rầm rộ. Dẫn đến việc các em học sinh cấp 3 đều “đổ xô” đến đây để ôn thi.',
        },
    ];

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('left')}>
                    <Left data={data} />
                </div>
                <div className={cx('right')}>
                    <Right data={dataNews} />
                </div>
            </div>
        </div>
    );
}

export default Index;
