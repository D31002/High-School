import React, { useState } from 'react';
import classNames from 'classnames/bind';
import Styles from './Input.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(Styles);

function Index(props) {
    const { errorMessage, refer, handleChange, disabled, ...inputProps } = props;
    const [focused, setFocused] = useState(false);
    const handlefocus = () => {
        setFocused(true);
    };
    return (
        <div className={cx('formInput')}>
            <input
                {...inputProps}
                ref={refer}
                onChange={handleChange}
                onBlur={handlefocus}
                focused={focused.toString()}
                spellCheck="false"
                disabled={disabled}
            />
            <div className={cx('success')}>
                <FontAwesomeIcon className={cx('icon')} icon={faCheck} />
                <span>success</span>
            </div>
            <div className={cx('error')}>{errorMessage}</div>
        </div>
    );
}

export default Index;
