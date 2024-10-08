import React from 'react';
import classNames from 'classnames/bind';
import Styles from './News.module.scss';
import Left from './Left/Index';
// import Right from './Right/Index';

const cx = classNames.bind(Styles);

function Index({ data, currentPage, setCurrentPage, totalPages }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('left')}>
                    <Left
                        data={data}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalPages={totalPages}
                    />
                </div>
                {/* <div className={cx('right')}>
                    <Right data={dataNews} />
                </div> */}
            </div>
        </div>
    );
}

export default Index;
