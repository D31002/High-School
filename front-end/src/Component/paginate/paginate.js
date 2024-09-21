import React from 'react';
import classNames from 'classnames/bind';
import Styles from './paginate.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(Styles);

function Paginate({ totalPages, currentPage, setCurrentPage }) {
    let pages = [];

    for (let i = 0; i < totalPages; i++) {
        pages.push(i);
    }
    const handleprev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };
    const handleNext = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className={cx('paginate-container')}>
            <div className={cx('pagination')}>
                <div className={cx('move')}>
                    <FontAwesomeIcon
                        icon={faAngleLeft}
                        onClick={handleprev}
                        className={cx('move-icon', { disabled: currentPage === 0 })}
                    />
                </div>
                <div className={cx('move')}>
                    <FontAwesomeIcon
                        icon={faAngleRight}
                        onClick={handleNext}
                        className={cx('move-icon', { disabled: currentPage === totalPages - 1 })}
                    />
                </div>
                <div className={cx('pageoftotal')}>
                    Page {currentPage + 1} of {totalPages}
                </div>
                <div className={cx('gottopage')}>
                    <span>Go to page: </span>
                    <input
                        type="number"
                        onChange={(e) => {
                            const value = parseInt(e.target.value);
                            if (value >= 1 && value <= totalPages) {
                                setCurrentPage(value - 1);
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default Paginate;
