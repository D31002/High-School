import React from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

function Tooltip({ children, content, right = false }) {
    const placement = right ? 'right' : 'bottom';
    return (
        <Tippy content={content} placement={placement} arrow={true} animation="fade" theme="light">
            {children}
        </Tippy>
    );
}

export default Tooltip;
