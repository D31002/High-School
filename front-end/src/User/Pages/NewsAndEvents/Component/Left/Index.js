import React, { useState } from 'react';
import classNames from 'classnames/bind';
import Styles from './left.module.scss';
import Paginate from '../../../../../Component/paginate/paginate';

const cx = classNames.bind(Styles);

function Index({ data }) {
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;

    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = postsPerPage + startIndex;
    const newdatas = data.slice(startIndex, endIndex);
    const totalPage = data.length;

    return (
        <div className={cx('wrapper')}>
            {newdatas.map((item, index) => (
                <div className={cx('item')} key={index}>
                    <div className={cx('content')}>
                        <img src={item.img} alt="anh" />
                        <div className={cx('description')}>
                            <h1>{item.title}</h1>
                            <p>{item.description}</p>
                        </div>
                    </div>
                </div>
            ))}
            <Paginate
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                postsPerPage={postsPerPage}
                totalPage={totalPage}
            />
        </div>
    );
}

export default Index;
