import React from 'react';
import Styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup, faUsers } from '@fortawesome/free-solid-svg-icons';
import MenuItem from './Menu/MenuItem';
import { useLocation, useParams } from 'react-router-dom';

const cx = classNames.bind(Styles);

function Sidebar() {
    const location = useLocation();

    const { classRoomId } = useParams();
    return (
        <div className={cx('wrapper')}>
            <MenuItem
                content="Học sinh"
                to={`/admin/classRoom/${classRoomId}/student`}
                icon={<FontAwesomeIcon icon={faUsers} />}
                active={location.pathname.includes('/student')}
            />
            <MenuItem
                content="Bảng điểm"
                to={`/admin/classRoom/${classRoomId}/score`}
                icon={<FontAwesomeIcon icon={faLayerGroup} />}
                active={location.pathname.includes('/score')}
            />
        </div>
    );
}

export default Sidebar;
