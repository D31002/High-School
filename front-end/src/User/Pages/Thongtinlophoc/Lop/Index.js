import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Styles from './lop.module.scss';
import { useParams } from 'react-router-dom';
import { useHandleDispatch } from '../../../../services/useHandleDispatch';
import { schoolYears, Classes, authUser, userToken } from '../../../../redux/selectors';
import { useSelector } from 'react-redux';
import GroupChat from '../GroupChat/Index';
const cx = classNames.bind(Styles);

function Index() {
    const { id } = useParams();
    const user = useSelector(authUser);
    const token = useSelector(userToken);
    const SchoolYears = useSelector(schoolYears);
    const classes = useSelector(Classes);
    const [studentIds, setStudentIds] = useState([]);
    const { getallByNow, getallschoolyear, getstudentIdByClassRoomId } = useHandleDispatch();

    useEffect(() => {
        if (id) {
            const get = async () => {
                const response = await getstudentIdByClassRoomId(id);
                if (response.code === 1000) {
                    setStudentIds(response.result);
                }
            };
            get();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);
    useEffect(() => {
        getallschoolyear();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        if (SchoolYears && SchoolYears[0]?.id) {
            getallByNow(SchoolYears[0]?.id);
        } // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [SchoolYears]);

    const getClassRoom = () => {
        return classes.find((c) => c.id === parseInt(id));
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('heading')}>
                <span>Lớp {getClassRoom()?.name}</span>
                <h1>Thông tin lớp {getClassRoom()?.name}</h1>
                <p>{`năm học ${SchoolYears[0]?.schoolYear} - ${SchoolYears[0]?.schoolYear + 1}`}</p>
            </div>
            <div className={cx('introduce')}>
                <p>I . GIÁO VIÊN CHỦ NHIỆM</p>
                <div className={cx('img')}>
                    <img
                        src={
                            getClassRoom()?.classTeacher?.userProfileResponse?.imageUrl ||
                            'https://res.cloudinary.com/danrswhe6/image/upload/v1725669304/anhdaidien_w5zpy2.webp'
                        }
                        alt="anh"
                    />
                    <p>Thầy/Cô : {getClassRoom()?.classTeacher?.userProfileResponse?.fullName}</p>
                </div>
            </div>
            <div className={cx('introduce')}>
                <p>II . THÔNG TIN VỀ LỚP</p>
            </div>
            <p>- Sĩ số: {studentIds?.length || 0} học sinh.</p>
            <p>
                - Khối ngành : {getClassRoom()?.combination?.name}, {'bao gồm các môn : '}
                {getClassRoom()
                    ?.combination?.subjects?.map((subject) => subject.name)
                    .join(' - ')}
            </p>
            <p>
                {`- Định hướng phát triển năm học ${SchoolYears[0]?.schoolYear} - ${
                    SchoolYears[0]?.schoolYear + 1
                }: tham gia đầy đủ các phong trào của trường; 100% học sinh đạt
                danh hiệu Học sinh Giỏi và Hạnh kiểm Tốt; thực hiện tốt nội quy Nhà trường đưa ra.`}
            </p>
            {(studentIds
                .map((studentId) => studentId.studentId)
                ?.includes(user?.userProfileResponse?.userType === 'student' && user?.id) ||
                getClassRoom()?.classTeacher?.id ===
                    (user?.userProfileResponse?.userType === 'teacher' && user?.id)) && (
                <GroupChat classRoom={getClassRoom()} studentIds={studentIds} token={token} />
            )}
        </div>
    );
}

export default Index;
