import React from 'react';
import classNames from 'classnames/bind';
import Styles from './map.module.scss';

const cx = classNames.bind(Styles);

function Index() {
    return (
        <div className={cx('wrapper')}>
            <h4>VỊ TRÍ CỦA CHÚNG TÔI TRÊN GOOGLE MAP</h4>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.8415183216944!2d105.77061529999999!3d10.0299337!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0895a51d60719%3A0x9d76b0035f6d53d0!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBD4bqnbiBUaMah!5e0!3m2!1svi!2s!4v1694859141183!5m2!1svi!2s"
                title="google map"
                loading="lazy"
            ></iframe>
        </div>
    );
}

export default Index;
