import React from 'react';
import classNames from 'classnames/bind';
import Styles from './Button.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(Styles);

function Button({
    to,
    href,
    primary = false,
    func = false,
    iconPosition = false,
    control = false,
    btn = false,
    children,
    onClick,
    ...passProps
}) {
    let Comp = 'button';

    const props = {
        onClick,
        ...passProps,
    };

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    const classes = cx('wrapper', {
        primary,
        func,
        control,
        iconPosition,
        btn,
    });

    return (
        <Comp className={classes} {...props}>
            {children}
        </Comp>
    );
}

export default Button;
