import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import Styles from './Video.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faCompress, faExpand } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(Styles);

function Items(props, ref) {
    const videoRefs = useRef(Array.from({ length: 5 }, () => React.createRef()));
    const [isFullscreen, setIsFullscreen] = useState(Array.from({ length: 5 }, () => false));
    const [showPlay, setShowPlay] = useState(Array.from({ length: 5 }, () => true));

    useImperativeHandle(ref, () => ({
        play(index) {
            videoRefs.current[index].current.play();
        },
        pause(index) {
            videoRefs.current[index].current.pause();
        },
        toggleFullscreen(index) {
            if (!isFullscreen[index]) {
                enterFullscreen(index);
            } else {
                exitFullscreen(index);
            }
        },
    }));

    const enterFullscreen = (index) => {
        if (videoRefs.current[index].current.requestFullscreen) {
            videoRefs.current[index].current.requestFullscreen();
        } else if (videoRefs.current[index].current.mozRequestFullScreen) {
            videoRefs.current[index].current.mozRequestFullScreen();
        } else if (videoRefs.current[index].current.webkitRequestFullscreen) {
            videoRefs.current[index].current.webkitRequestFullscreen();
        } else if (videoRefs.current[index].current.msRequestFullscreen) {
            videoRefs.current[index].current.msRequestFullscreen();
        }
    };
    const exitFullscreen = (index) => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        setIsFullscreen((prev) => [...prev.slice(0, index), false, ...prev.slice(index + 1)]);
    };

    const handleplay = (index) => () => {
        props.handlePlay(index);
        setShowPlay((prev) => [...prev.slice(0, index), !prev[index], ...prev.slice(index + 1)]);
    };
    const handlepause = (index) => () => {
        props.handlePause(index);
        setShowPlay((prev) => [...prev.slice(0, index), !prev[index], ...prev.slice(index + 1)]);
    };
    const handleToggleFullscreen = (index) => () => {
        props.handleToggleFullscreen(index);
    };
    const handleVideoEnded = (index) => () => {
        // Khi video kết thúc, bắt đầu lại video và hiển thị nút phát
        videoRefs.current[index].current.currentTime = 0;
        setShowPlay((prev) => [...prev.slice(0, index), true, ...prev.slice(index + 1)]);
    };
    return (
        <div className={cx('video-items')}>
            <div className={cx('video-item-primary')}>
                {showPlay[0] && (
                    <FontAwesomeIcon icon={faPlay} className={cx('video-icon-play')} onClick={handleplay(0)} />
                )}
                <video
                    src={props.videoSources[0]}
                    ref={videoRefs.current[0]}
                    className={isFullscreen[0] ? cx('fullscreen-video') : cx('default')}
                    onEnded={handleVideoEnded(0)}
                />
                {showPlay[0] === false && (
                    <FontAwesomeIcon icon={faPause} className={cx('video-icon-pause')} onClick={handlepause(0)} />
                )}
                <FontAwesomeIcon
                    icon={isFullscreen[0] ? faCompress : faExpand}
                    className={cx('video-icon-expand')}
                    onClick={handleToggleFullscreen(0)}
                />
            </div>
            <div className={cx('video-items-secondary')}>
                {props.videoSources.slice(1).map((source, index) => (
                    <div className={cx('video-item-secondary')} key={index + 1}>
                        {showPlay[index + 1] && (
                            <FontAwesomeIcon
                                icon={faPlay}
                                className={cx('video-icon-play')}
                                onClick={handleplay(index + 1)}
                            />
                        )}
                        <video
                            src={source}
                            ref={videoRefs.current[index + 1]}
                            className={isFullscreen[index + 1] ? cx('fullscreen-video') : cx('default')}
                            onEnded={handleVideoEnded(index + 1)}
                        />
                        {showPlay[index + 1] === false && (
                            <FontAwesomeIcon
                                icon={faPause}
                                className={cx('video-icon-pause')}
                                onClick={handlepause(index + 1)}
                            />
                        )}
                        <FontAwesomeIcon
                            icon={isFullscreen[index + 1] ? faCompress : faExpand}
                            className={cx('video-icon-expand')}
                            onClick={handleToggleFullscreen(index + 1)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default forwardRef(Items);
