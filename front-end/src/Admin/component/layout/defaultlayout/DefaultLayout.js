import React from 'react';
import Header from '../header/header';
import Sidebar from '../sidebar/sidebar';
import Styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(Styles);

function DefaultLayout({ children }) {
    const navigate = useNavigate();
    return (
        <div className={cx('wrapper')}>
            <Header />

            <div className={cx('container')}>
                <div className={cx('sidebar')}>
                    <Sidebar />
                </div>
                <div className={cx('content')}>
                    <div className={cx('back')} onClick={() => navigate(`/admin/classRoom`)}>
                        <ArrowBackIcon className={cx('icon')} />
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default DefaultLayout;
