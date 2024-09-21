import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Styles from './Number.module.scss';
const cx = classNames.bind(Styles);

function Quantity({ quantity }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (count < quantity) {
            const timeid = setInterval(() => {
                setCount((prevState) => {
                    if (prevState < quantity) {
                        return prevState + 1;
                    }
                    clearInterval(timeid);
                    return prevState;
                });
            }, 1);
            return () => {
                clearInterval(timeid);
            };
        }
    }, [count, quantity]);

    return <span className={cx('item-quantity')}>{count}</span>;
}

export default React.memo(Quantity);
