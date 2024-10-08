import React from 'react';
import classNames from 'classnames/bind';
import Styles from './paginate.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(Styles);

function Paginate({ totalPages, currentPage, setCurrentPage }) {
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
                        className={cx('move-icon', { disabled: currentPage === 1 })}
                    />
                </div>
                <div className={cx('move')}>
                    <FontAwesomeIcon
                        icon={faAngleRight}
                        onClick={handleNext}
                        className={cx('move-icon', { disabled: currentPage === totalPages })}
                    />
                </div>
                <div className={cx('pageoftotal')}>
                    Page {currentPage} of {totalPages}
                </div>
                <div className={cx('gottopage')}>
                    <span>Go to page: </span>
                    <input
                        type="number"
                        onChange={(e) => {
                            const value = parseInt(e.target.value);
                            if (value >= 1 && value <= totalPages) {
                                setCurrentPage(value);
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default Paginate;
