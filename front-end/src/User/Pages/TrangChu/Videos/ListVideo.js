import React, { useRef } from 'react';
import Items from './Items';
import classNames from 'classnames/bind';
import Styles from './Video.module.scss';
import video1 from '../../../Component/Assets/video/video1.mp4';
import video2 from '../../../Component/Assets/video/video2.mp4';
import video3 from '../../../Component/Assets/video/video3.mp4';
import video4 from '../../../Component/Assets/video/video4.mp4';
import video5 from '../../../Component/Assets/video/video5.mp4';

const cx = classNames.bind(Styles);

function Index() {
    const videoSources = [video1, video2, video3, video4, video5];
    const videoref = useRef();

    const handlePlay = (index) => {
        videoref.current.play(index);
    };
    const handlePause = (index) => {
        videoref.current.pause(index);
    };
    const handleToggleFullscreen = (index) => {
        videoref.current.toggleFullscreen(index);
    };

    return (
        <div className={cx('List-video')}>
            <Items
                ref={videoref}
                handlePlay={handlePlay}
                handlePause={handlePause}
                handleToggleFullscreen={handleToggleFullscreen}
                videoSources={videoSources}
            />
        </div>
    );
}

export default Index;
