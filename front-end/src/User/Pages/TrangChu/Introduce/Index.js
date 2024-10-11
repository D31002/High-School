import React from 'react';
import classNames from 'classnames/bind';
import Styles from './introduce.module.scss';
import { motion } from 'framer-motion';
import { rightAnimation, imageAnimation } from '../../../../Component/animation/Animation';
import { useScroll } from '../../../../Component/UseScroll/Index';
import Img2 from '../../../Component/Assets/Img/b.png';
import Img3 from '../../../Component/Assets/Img/c.png';
import Img4 from '../../../Component/Assets/Img/d.png';
import Img5 from '../../../Component/Assets/Img/e.png';
import Img6 from '../../../Component/Assets/Img/f.png';
import Img7 from '../../../Component/Assets/Img/g.png';
const cx = classNames.bind(Styles);

function Index() {
    const data = [
        {
            img: Img2,
            title: 'Hoàn thành Mọi mục tiêu',
        },
        {
            img: Img3,
            title: 'Lợi ích Với học sinh',
        },
        {
            img: Img4,
            title: 'Sự hài lòng Của cha mẹ',
        },
        {
            img: Img5,
            title: 'Sáng tạo Và đột phá',
        },
        {
            img: Img6,
            title: 'Trách nhiệm Trong công việc',
        },
        {
            img: Img7,
            title: 'Đoàn kết Tinh thần giảng dạy',
        },
    ];
    const [element, controls] = useScroll();
    return (
        <div className={cx('wrapper')} ref={element}>
            <motion.div
                className={cx('panner')}
                variants={imageAnimation}
                animate={controls}
                transition={{ delay: 0.2, type: 'tween' }}
            >
                <img
                    src="https://res.cloudinary.com/danrswhe6/image/upload/v1721960169/imageStudentPageHome_kbh77m.png"
                    alt="anh"
                />
            </motion.div>
            <motion.div
                className={cx('review')}
                variants={rightAnimation}
                animate={controls}
                transition={{ type: 'tween' }}
            >
                <div className={cx('review-top')}>
                    <h3>VỀ CHÚNG TÔI</h3>
                    <h1>MỘT SỐ GIỚI THIỆU </h1>
                    <p>
                        Đây là một ngôi nơi có chất lượng giáo dục nằm trong các 'Top' hàng đầu tại Việt Nam. Được thành
                        lập vào năm 2000, đến nay nơi này đã được đầu tư bài bản về cơ sở hạ tầng, chất lượng giảng dạy
                        và chương trình giáo dục, trở thành một nơi học nhận được sự tin tưởng của đông đảo phụ huynh và
                        học sinh.
                    </p>
                </div>

                <div className={cx('review-footer')}>
                    {data.map((item, index) => (
                        <div className={cx('featured')} key={index}>
                            <img src={item.img} alt="anh" />
                            <span className={cx('title')}>{item.title}</span>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}

export default Index;
