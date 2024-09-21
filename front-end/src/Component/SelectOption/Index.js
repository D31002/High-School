import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Styles from './Select.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faSearch } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(Styles);

function Index({ title, handleSearchChange, dataOptions = [], onclick, selectedOption, w400 = false }) {
    const [selected, setSelected] = useState(title);

    useEffect(() => {
        const selectedOptionName =
            (selectedOption != null && dataOptions.find((option) => option.id === selectedOption)?.nameOption) || title;
        setSelected(selectedOptionName);
    }, [selectedOption, dataOptions, title]);

    const handleOptionClick = (id, nameOption) => {
        onclick(id);
        setSelected(nameOption);
    };
    return (
        <div className={cx('wrapper', { w400: w400 })}>
            <div className={cx('select-option')}>
                <div className={cx('select-btn')}>
                    <span>{selected}</span>
                    <FontAwesomeIcon className={cx('icon')} icon={faAngleDown} />
                </div>
                <div className={cx('content')}>
                    <div className={cx('seach')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faSearch} />
                        <input type="text" placeholder="seach" onChange={handleSearchChange} />
                    </div>
                    <ul className={cx('options')}>
                        {dataOptions.length > 0 ? (
                            dataOptions.map((option, index) => (
                                <li key={index} onClick={() => handleOptionClick(option.id, option.nameOption)}>
                                    {option.nameOption}
                                </li>
                            ))
                        ) : (
                            <li className={cx('no-data-message')}>Không có dữ liệu</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Index;
