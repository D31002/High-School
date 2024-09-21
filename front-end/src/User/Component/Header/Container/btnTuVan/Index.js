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
        title: 'Thi Vào Lớp 10',
        to: '/',
    },
    {
        icon: <FontAwesomeIcon icon={faCaretRight} />,
        title: 'Hướng Nghề Nghiệp',
        to: '/tuvan/nghenghiep',
    },
];
function Index() {
    return (
        <Menu items={MenuItems} className={cx('menu-header')}>
            <div className={cx('menu-header-item')}>
                <Button className={cx('primary')}>
                    Tư Vấn
                    <FontAwesomeIcon icon={faChevronDown} className={cx('menu-icon')} />
                </Button>
            </div>
        </Menu>
    );
}

export default Index;
