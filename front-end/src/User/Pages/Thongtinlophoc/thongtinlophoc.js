import React, { useEffect } from 'react';
import classNames from 'classnames/bind';
import Styles from './hs.module.scss';
import { useHandleDispatch } from '../../../services/useHandleDispatch';
import { schoolYears, Classes } from '../../../redux/selectors';
import { useSelector } from 'react-redux';
import Button from '../../../Component/button/Button';
const cx = classNames.bind(Styles);

function Hocsinh() {
    const SchoolYears = useSelector(schoolYears);
    const classes = useSelector(Classes);
    const { getallByNow, getallschoolyear } = useHandleDispatch();

    useEffect(() => {
        getallschoolyear();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        if (SchoolYears && SchoolYears[0]?.id) {
            getallByNow(SchoolYears[0]?.id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [SchoolYears]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('list-class')}>
                {classes?.map((data, index) => (
                    <Button key={index} to={`/thongtinlophoc/${data.id}`} className={cx('item')}>
                        <div className={cx('item-name')}>{data.name}</div>
                        <div className={cx('item-gvcv')}>
                            <div>{`GVCN : ${data?.classTeacher?.userProfileResponse?.fullName || 'không có'}`}</div>
                            <img
                                src={
                                    data?.classTeacher?.userProfileResponse?.imageUrl ||
                                    'https://res.cloudinary.com/danrswhe6/image/upload/v1725669304/anhdaidien_w5zpy2.webp'
                                }
                                alt="Ảnh đại diện"
                            />
                        </div>
                    </Button>
                ))}
            </div>
        </div>
    );
}

export default Hocsinh;
