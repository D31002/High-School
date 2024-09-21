import React, { useState } from 'react';
import classNames from 'classnames/bind';
import Styles from './Hopthoai.module.scss';
import HeaderOutside from './Outside/Header';
import ContainerOutside from './Outside/Container';
import HeaderInside from './Inside/Header';
import ContainerInside from './Inside/Container';
const cx = classNames.bind(Styles);

function Index({ setShowConvo, setShowchat }) {
    const [showInside, SetShowInside] = useState(false);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                {showInside === false && <HeaderOutside setShowConvo={setShowConvo} setShowchat={setShowchat} />}
                {showInside && (
                    <HeaderInside SetShowInside={SetShowInside} setShowConvo={setShowConvo} setShowchat={setShowchat} />
                )}
            </div>
            {showInside === false && <ContainerOutside SetShowInside={SetShowInside} />}
            {showInside && <ContainerInside />}
        </div>
    );
}

export default Index;
