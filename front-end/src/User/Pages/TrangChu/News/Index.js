import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Styles from './news.module.scss';
import Button from '../../../../Component/button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { News, NewsTotalPages } from '../../../../redux/selectors';
import { useSelector } from 'react-redux';
import { useHandleDispatch } from '../../../../services/useHandleDispatch';

const cx = classNames.bind(Styles);

function Index() {
    const news = useSelector(News);
    const totalPages = useSelector(NewsTotalPages);
    const { getallnews } = useHandleDispatch();
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        getallnews(currentPage, 3);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        } else {
            setCurrentPage(totalPages);
        }
    };
    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        } else {
            setCurrentPage(1);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('heading')}>
                    <h3>TIN TỨC MỚI NHẤT</h3>
                    <h1>TIN TỨC</h1>
                </div>
            </div>
            <div className={cx('content')}>
                <Button className={cx('btn-prev')}>
                    <FontAwesomeIcon icon={faArrowLeft} onClick={handlePrev} />
                </Button>
                <Button className={cx('btn-next')}>
                    <FontAwesomeIcon icon={faArrowRight} onClick={handleNext} />
                </Button>
                <div className={cx('list-news')}>
                    {news?.map((item, index) => (
                        <div className={cx('item')} key={index}>
                            <div className={cx('container')}>
                                <Button className={cx('information')} to="/">
                                    <img src={item.imageMainUrl} alt="anh" />
                                    <div className={cx('title')}>{item.title}</div>
                                    <div className={cx('date')}>
                                        <FontAwesomeIcon icon={faCalendarDays} className={cx('icon')} />
                                        <span>{item.createdAt}</span>
                                    </div>
                                    <div className={cx('description')}>{item.content}</div>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={cx('pagination-dots')}>
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <div
                            key={index}
                            className={cx('page-dot', {
                                active: index + 1 === currentPage,
                            })}
                            onClick={() => setCurrentPage(index + 1)}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Index;
