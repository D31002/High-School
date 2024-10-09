import React from 'react';
import classNames from 'classnames/bind';
import Styles from './Home.module.scss';
import Introduce from './Introduce/Index';
import Benefit from './Benefit/Index';
// import Event from './EVENT/Index';
import Number from './NUMBER/Index';
import Logo from './LOGO/Index';
import News from './News/Index';
import { motion } from 'framer-motion';

const cx = classNames.bind(Styles);

function Home() {
    return (
        <motion.div
            className={cx('wrapper')}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className={cx('title')}>
                <p>CHÀO MỪNG ĐẾN TRANG THÔNG TIN ĐIỆN TỬ CỦA CHÚNG TÔI</p>
            </div>
            <div className={cx('content')}>
                <Introduce />
                <Benefit />
                <News />
                {/* <Event /> */}
                <Number />
                <Logo />
            </div>
        </motion.div>
    );
}

export default Home;
