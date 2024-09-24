import React from 'react';
import classNames from 'classnames/bind';
import Styles from './home.module.scss';
import Button from '../../../Component/button/Button';

const cx = classNames.bind(Styles);

function Index() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('items')}>
                <Button className={cx('item')} to="/admin/Danh-Sach-Lop-Hoc-Theo-Nam">
                    <div className={cx('title')}>Quản Lý Lớp Học</div>
                    <img
                        src="https://res.cloudinary.com/danrswhe6/image/upload/v1721960219/Icon-SchoolClassroom_ebpyp1.png"
                        alt="iconClass"
                    />
                </Button>
                <Button className={cx('item')} to="/admin/quan-ly-giao-vien">
                    <div className={cx('title')}>Quản lý giáo viên</div>
                    <img
                        src="https://res.cloudinary.com/danrswhe6/image/upload/v1721960196/Icon-User_t8r0ip.png"
                        alt="iconClass"
                    />
                </Button>
                <Button className={cx('item')} to="/admin/xep-lich-Giang-Day">
                    <div className={cx('title')}>Xếp lịch giảng dạy</div>
                    <img
                        src="https://res.cloudinary.com/danrswhe6/image/upload/v1721960218/Icon-KeHoach_ugb632.png"
                        alt="iconClass"
                    />
                </Button>
                <Button className={cx('item')} to="/admin/classRoom">
                    <div className={cx('title')}>Quản Lý Học Sinh</div>
                    <img
                        src="https://res.cloudinary.com/danrswhe6/image/upload/v1721960196/Icon-User_t8r0ip.png"
                        alt="iconClass"
                    />
                </Button>

                <Button className={cx('item')} to="/admin/xem-lich-Giang-Day">
                    <div className={cx('title')}>Lịch Giảng Dạy</div>
                    <img
                        src="https://res.cloudinary.com/danrswhe6/image/upload/v1721960218/Icon-KeHoach_ugb632.png"
                        alt="iconClass"
                    />
                </Button>
                <Button className={cx('item')} to="/admin/diem-danh">
                    <div className={cx('title')}>Điểm danh</div>
                    <img
                        src="https://res.cloudinary.com/danrswhe6/image/upload/v1721960218/Icon-KeHoach_ugb632.png"
                        alt="iconClass"
                    />
                </Button>
                <Button className={cx('item')} to="/admin/thong-ke">
                    <div className={cx('title')}>Thống kê điểm số</div>
                    <img
                        src="https://res.cloudinary.com/danrswhe6/image/upload/v1727070822/thong-ke_dx0jge.png"
                        alt="iconClass"
                    />
                </Button>
            </div>
        </div>
    );
}

export default Index;
