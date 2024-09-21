import React from 'react';
import classNames from 'classnames/bind';
import Styles from './nodata.module.scss';

const cx = classNames.bind(Styles);

function Index() {
    return (
        <div className={cx('wrapper')}>
            <img src="https://res.cloudinary.com/danrswhe6/image/upload/v1725669021/no-data_t0fhx3.png" alt="Nodata" />
            <div className={cx('NODATA')}>Hiện tại không có dữ liệu, bạn hãy làm thay đổi nó đi</div>
        </div>
    );
}

export default Index;
