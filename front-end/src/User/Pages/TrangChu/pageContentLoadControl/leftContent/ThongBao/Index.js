import React from 'react';
import classNames from 'classnames/bind';
import Styles from '../../ListItem.module.scss';
import ListItem from '../../ListItem';

const cx = classNames.bind(Styles);
const data = [
    {
        title: 'Danh sách chuyển trường đầu năm học 2023-2024',
        to: '/',
    },
    {
        title: 'Hướng dẫn PHHS chi tiết về quy trình chuyển trường năm học 2023-2024',
        to: '/',
    },
    {
        title: 'Thông báo quy trình giải quyết công tác chuyển trường và tiếp nhân học sinh năm học 2023-2024',
        to: '/',
    },
    {
        title: '📣📣📣 Trường THPT CẦN THƠ trân trọng thông báo lịch kiểm tra khảo sát chất lượng tiếng Anh và lịch họp CMHS khối Liên kết Quốc tế năm học 2023-2024🌹🌹🌹',
        to: '/',
    },
    {
        title: 'Thông báo về việc phúc khảo bài thi tốt nghiệp THPT 2023 và trả học bạ, giấy CNTN và KQ thi',
        to: '/',
    },
];

function Index({ className }) {
    return (
        <div className={cx('sub-notification')}>
            <div className={cx('heading')}>
                <h4>THÔNG BÁO</h4>
            </div>
            <div className={cx('list-notification')}>
                {data.map((item, index) => {
                    return <ListItem key={index} data={item} iconPosition={className} />;
                })}
            </div>
        </div>
    );
}

export default Index;
