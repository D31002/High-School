import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Styles from './Detail.module.scss';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { useHandleDispatch } from '../../../../services/useHandleDispatch';
import { useSelector } from 'react-redux';
import { News } from '../../../../redux/selectors';
import { useParams } from 'react-router-dom';
import Button from '../../../../Component/button/Button';

const cx = classNames.bind(Styles);

function Index() {
    const { newsId } = useParams();
    const news = useSelector(News);
    const [newsById, setNewsById] = useState();
    const { getallnews, getnewsById } = useHandleDispatch();

    const getnewsbyid = async () => {
        const respose = await getnewsById(newsId);
        if (respose.code === 1000) {
            setNewsById(respose.result);
        }
    };

    useEffect(() => {
        getallnews(1, 6);
        getnewsbyid();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('header')}>
                    <h1 className={cx('title')}>{newsById?.title}</h1>
                    <div className={cx('createdAt')}>{newsById?.createdAt}</div>
                </div>
                <div className={cx('content')}>
                    <p>{newsById?.content}</p>
                    <p>
                        <img src={newsById?.imageMainUrl} alt="anh" />
                    </p>
                    {newsById?.contentSectionResponses?.map((section) => (
                        <div className={cx('section')} key={section.id}>
                            <h3>{section.sectionTitle}</h3>
                            <p>
                                <span>{section.sectionContent}</span>
                            </p>
                            <p>
                                {section?.imagesResponseList.map((image) => (
                                    <img src={image.imageUrl} alt="anh" />
                                ))}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div className={cx('others')}>
                <span className={cx('other-title')}>CÁC TIN MỚI NHẤT</span>
                <div className={cx('list-other')}>
                    {news?.map((item) => (
                        <Button className={cx('item-other')} key={item.id} to={`/tin-tuc/${item.id}`}>
                            <img src={item.imageMainUrl} alt="anh" />
                            <div className={cx('box-text')}>
                                <h5>{item.content}</h5>
                                <div className={cx('createdAt')}>
                                    <DateRangeIcon />
                                    {item.createdAt}
                                </div>
                            </div>
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Index;
