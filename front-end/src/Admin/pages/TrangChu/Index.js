import React from 'react';
import classNames from 'classnames/bind';
import Styles from './home.module.scss';
import Button from '../../../Component/button/Button';
import { motion } from 'framer-motion';
import { rightAnimation, leftAnimation, centerAnimation } from '../../../Component/animation/Animation';
import { useScroll } from '../../../Component/UseScroll/Index';

const cx = classNames.bind(Styles);

function Index() {
    const [element, controls] = useScroll();

    const buttons = [
        {
            to: '/admin/Danh-Sach-Lop-Hoc-Theo-Nam',
            title: 'Quản Lý Lớp Học',
            imgSrc: 'https://res.cloudinary.com/danrswhe6/image/upload/v1721960219/Icon-SchoolClassroom_ebpyp1.png',
            animation: leftAnimation,
        },
        {
            to: '/admin/quan-ly-giao-vien',
            title: 'Quản lý giáo viên',
            imgSrc: 'https://res.cloudinary.com/danrswhe6/image/upload/v1721960196/Icon-User_t8r0ip.png',
            animation: centerAnimation,
        },
        {
            to: '/admin/xep-lich-Giang-Day',
            title: 'Xếp lịch giảng dạy',
            imgSrc: 'https://res.cloudinary.com/danrswhe6/image/upload/v1721960218/Icon-KeHoach_ugb632.png',
            animation: rightAnimation,
        },
        {
            to: '/admin/classRoom',
            title: 'Quản Lý Học Sinh',
            imgSrc: 'https://res.cloudinary.com/danrswhe6/image/upload/v1721960196/Icon-User_t8r0ip.png',
            animation: leftAnimation,
        },
        {
            to: '/admin/xem-lich-Giang-Day',
            title: 'Lịch Giảng Dạy',
            imgSrc: 'https://res.cloudinary.com/danrswhe6/image/upload/v1721960218/Icon-KeHoach_ugb632.png',
            animation: centerAnimation,
        },
        {
            to: '/admin/diem-danh',
            title: 'Điểm danh',
            imgSrc: 'https://res.cloudinary.com/danrswhe6/image/upload/v1721960218/Icon-KeHoach_ugb632.png',
            animation: rightAnimation,
        },
        {
            to: '/admin/thong-ke',
            title: 'Thống kê điểm số',
            imgSrc: 'https://res.cloudinary.com/danrswhe6/image/upload/v1727070822/thong-ke_dx0jge.png',
            animation: leftAnimation,
        },
        {
            to: '/admin/quan-ly-news',
            title: 'Quản lý tin tức sự kiện',
            imgSrc: 'https://res.cloudinary.com/danrswhe6/image/upload/v1728004973/news_v6imib.png',
            animation: rightAnimation,
        },
    ];

    return (
        <div className={cx('wrapper')} ref={element}>
            <div className={cx('items')}>
                {buttons.map((button, index) => (
                    <motion.div
                        key={index}
                        className={cx('item')}
                        variants={button.animation}
                        animate={controls}
                        transition={{ type: 'tween' }}
                    >
                        <Button className={cx('btn')} to={button.to}>
                            <div className={cx('title')}>{button.title}</div>
                            <img src={button.imgSrc} alt="icon" />
                        </Button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default Index;
