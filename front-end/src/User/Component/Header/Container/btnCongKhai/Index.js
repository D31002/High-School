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
        title: 'Hồ Sơ Pháp Lý',
        to: '/',
    },
    {
        icon: <FontAwesomeIcon icon={faCaretRight} />,
        title: 'Kết Quả Đào Tạo',
        to: '/',
    },
    {
        icon: <FontAwesomeIcon icon={faCaretRight} />,
        title: 'Kết Quả Học Tập',
        to: '/ket-qua-hoc-tap',
    },
    {
        icon: <FontAwesomeIcon icon={faCaretRight} />,
        title: 'Cơ Sở Vật Chất',
        to: '/',
    },
    {
        icon: <FontAwesomeIcon icon={faCaretRight} />,
        title: 'Thành Tích',
        to: '/',
    },
    {
        icon: <FontAwesomeIcon icon={faCaretRight} />,
        title: 'Thông tin lớp học',
        to: '/thongtinlophoc',
    },
];
function Index() {
    return (
        <Menu items={MenuItems} className={cx('menu-header')}>
            <div className={cx('menu-header-item')}>
                <Button className={cx('primary')} to="/">
                    Công Khai
                    <FontAwesomeIcon icon={faChevronDown} className={cx('menu-icon')} />
                </Button>
            </div>
        </Menu>
    );
}

export default Index;
