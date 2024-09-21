import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import Style from '../Activity.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(Style);

function Index({ images, title }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);

        // Làm sạch interval khi component bị unmounted
        return () => clearInterval(interval);
    }, [images]);
    const goToPreviousImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const goToNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };
    return (
        <div className={cx('image-slider')}>
            <h4 className={cx('extracurricular-item-heading')}>{title}</h4>
            <div className={cx('extracurricular-item-img')}>
                {images.length > 1 && (
                    <button onClick={goToPreviousImage} className={cx('previous')}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                )}
                {images.length > 0 && (
                    <div
                        className={cx('image-container')}
                        style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
                    ></div>
                )}
                {images.length > 1 && (
                    <button onClick={goToNextImage} className={cx('next')}>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                )}
            </div>
        </div>
    );
}

export default Index;
