import React from 'react';
import Menu from '../../../../../Component/popper/Menu/Menu';
import Button from '../../../../../Component/button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import Styles from '../Container.module.scss';

const cx = classNames.bind(Styles);

const MenuItems = [
    {
        icon: <FontAwesomeIcon icon={faCaretRight} />,
        title: 'Giới Thiệu Tuyển Sinh',
        to: '/tuyensinh/gioithieutuyensinh',
    },
    {
        icon: <FontAwesomeIcon icon={faCaretRight} />,
        title: 'Hồ Sơ Xét Tuyển',
        to: '/',
        // dataChildren: [
        //     { title: 'Thi Vào Lớp 10', to: '/' },
        //     { title: 'Định Hướng Nghề Nghiệp', to: '/tuvantuyensinh' },
        //     { title: 'Tuổi 15 Con Cần gì', to: '/' },
        // ],
    },
    {
        icon: <FontAwesomeIcon icon={faCaretRight} />,
        title: 'Đăng Ký Dự Tuyển',
        to: '/',
    },
    {
        icon: <FontAwesomeIcon icon={faCaretRight} />,
        title: 'Học Phí Tham Khảo',
        to: '/',
    },
];
function Index() {
    return (
        <Menu items={MenuItems} className={cx('menu-header')}>
            <div className={cx('menu-header-item')}>
                <Button className={cx('primary')}>
                    Tuyển Sinh
                    <FontAwesomeIcon icon={faChevronDown} className={cx('menu-icon')} />
                </Button>
            </div>
        </Menu>
    );
}

export default Index;
