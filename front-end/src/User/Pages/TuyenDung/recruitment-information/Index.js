import React from 'react';
import classNames from 'classnames/bind';
import Styles from './recruitment-information.module.scss';
import Accordion from './accordion/Index';
import JobApplication from './job-application/Index';
import Time from './Time/Index';
import Form from './Form/Index';
const cx = classNames.bind(Styles);

function Index() {
    return (
        <div className={cx('wrapper')}>
            <h1>THÔNG TIN TUYỂN DỤNG CHI TIẾT</h1>
            <Accordion />
            <JobApplication />
            <Time />
            <Form />
        </div>
    );
}

export default Index;
