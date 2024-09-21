import React from 'react';
import classNames from 'classnames/bind';
import Styles from '../../ListItem.module.scss';
import ListItem from '../../ListItem';

const cx = classNames.bind(Styles);
const data = [
    {
        title: 'Thông báo quy trình giải quyết công tác chuyển trường và tiếp nhận học sinh mới năm học 2023-2024',
        to: '/',
    },
    {
        title: 'Hướng dẫn SGDĐT về công tác chuyển trường và tiếp nhận học sinh năm học 2023-2024',
        to: '/',
    },
    {
        title: 'Hướng dẫn tổ chức kỳ thi tốt nghiệp 2023',
        to: '/',
    },
    {
        title: 'Đánh giá giáo viên theo chuẩn nghề nghiệp năm học 2023-2024',
        to: '/',
    },
    {
        title: 'Hưởng ứng cuộc thi truyền thông HĐCĐ NK 2018-2023',
        to: '/',
    },
    {
        title: 'Hưởng dẫn tuyển sinh vào lớp 10 năm học 2023-2024',
        to: '/',
    },
];

function Index({ className }) {
    return (
        <div className={cx('sub-notification')}>
            <div className={cx('heading')}>
                <h4>VĂN BẢN</h4>
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
