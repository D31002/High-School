import React from 'react';
import classNames from 'classnames/bind';
import Styles from './information.module.scss';
import Button from '../../../../Component/button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faFax, faMapMarkerAlt, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebookSquare, faInstagram, faLinkedin, faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons';

const cx = classNames.bind(Styles);

function Index() {
    return (
        <div className={cx('wrapper')}>
            <h4>THÔNG TIN LIÊN HỆ</h4>
            <div className={cx('btn-information')}>
                <Button className={cx('btn-information-item')} to="/">
                    <div className={cx('item-content')}>
                        <FontAwesomeIcon icon={faMapMarkerAlt} className={cx('item-icon')} />
                        <span>abc, Đ abc, P.abc, Q. abc, TP.abc</span>
                    </div>
                </Button>
                <Button className={cx('btn-information-item')} to="/">
                    <div className={cx('item-content')}>
                        <FontAwesomeIcon icon={faPhoneAlt} className={cx('item-icon')} />
                        <span>ĐT: +00 0000 000</span>
                    </div>
                </Button>
                <Button className={cx('btn-information-item')} to="/">
                    <div className={cx('item-content')}>
                        <FontAwesomeIcon icon={faFax} className={cx('item-icon')} />
                        <span>Fax: +0000 000 000</span>
                    </div>
                </Button>
                <Button className={cx('btn-information-item')} to="/">
                    <div className={cx('item-content')}>
                        <FontAwesomeIcon icon={faAt} className={cx('item-icon')} />
                        <span>abc@abc.edu.vn</span>
                    </div>
                </Button>
            </div>
            <div className={cx('btn-socical')}>
                <Button className={cx('btn-socical-item')} href="https://www.facebook.com/" target="_blank">
                    <FontAwesomeIcon icon={faFacebookSquare} />
                </Button>
                <Button className={cx('btn-socical-item')} href="https://www.youtube.com/" target="_blank">
                    <FontAwesomeIcon icon={faYoutube} />
                </Button>
                <Button className={cx('btn-socical-item')} href="https://www.instagram.com/" target="_blank">
                    <FontAwesomeIcon icon={faInstagram} />
                </Button>
                <Button className={cx('btn-socical-item')} href="https://www.linkedin.com/" target="_blank">
                    <FontAwesomeIcon icon={faLinkedin} />
                </Button>
                <Button className={cx('btn-socical-item')} href="https://www.Tiktok.com/" target="_blank">
                    <FontAwesomeIcon icon={faTiktok} />
                </Button>
            </div>
        </div>
    );
}

export default Index;
