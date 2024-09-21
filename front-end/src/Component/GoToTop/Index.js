import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Styles from './Gototop.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(Styles);

function Index() {
    const [gototop, setGototop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setGototop(true);
            } else {
                setGototop(false);
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleGototop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return (
        <>
            {gototop && (
                <button className={cx('gototop')} onClick={handleGototop}>
                    <FontAwesomeIcon icon={faArrowUp} className={cx('icon')} />
                    <span>TOP</span>
                </button>
            )}
        </>
    );
}

export default Index;
