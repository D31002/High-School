import React from 'react';
import classNames from 'classnames/bind';
import Styles from './left.module.scss';
import DateRangeIcon from '@mui/icons-material/DateRange';
import Paginate from '../../../../../Component/paginate/paginate';
import Button from '../../../../../Component/button/Button';

const cx = classNames.bind(Styles);

function Index({ data, currentPage, setCurrentPage, totalPages }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                {data.map((item, index) => (
                    <Button className={cx('item')} key={index} to={`/tin-tuc/${item.id}`}>
                        <div className={cx('content')}>
                            <img src={item.imageMainUrl} alt="anh" />
                            <div className={cx('description')}>
                                <p>
                                    <DateRangeIcon />
                                    {item.createdDate}
                                </p>
                                <h1>{item.title}</h1>
                                <p>{item.content}</p>
                            </div>
                        </div>
                    </Button>
                ))}
            </div>
            <Paginate currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
        </div>
    );
}

export default Index;
