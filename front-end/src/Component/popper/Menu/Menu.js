import React from 'react';
import Tippy from '@tippyjs/react/headless';
import PopperWrapper from '../Wrapper';
import Styles from './Menu.module.scss';
import classNames from 'classnames/bind';
import MenuItem from './MenuItem';

const cx = classNames.bind(Styles);

function Menu({ children, items = [], crud = false }) {
    const renderItems = () => {
        return items.map((item, index) => {
            return <MenuItem key={index} data={item} crud />;
        });
    };
    return (
        <Tippy
            delay={[0, 200]}
            interactive
            placement="bottom-end"
            render={(attrs) => (
                <div className={cx('menu-items', { crud })} tabIndex="-1" {...attrs}>
                    <PopperWrapper crud={crud}>{renderItems()}</PopperWrapper>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
}

export default Menu;
