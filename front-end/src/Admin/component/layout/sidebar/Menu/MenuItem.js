import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import Styles from './Menu.module.scss';
import Tooltip from '../../../../../Component/Tooltip/Index';

const cx = classNames.bind(Styles);

function MenuItem({ content, to, icon, active }) {
    return (
        <Tooltip content={content} right>
            <NavLink className={cx('menu-item', { active })} to={to}>
                <span className={cx('icon')}>{icon}</span>
            </NavLink>
        </Tooltip>
    );
}

export default MenuItem;
