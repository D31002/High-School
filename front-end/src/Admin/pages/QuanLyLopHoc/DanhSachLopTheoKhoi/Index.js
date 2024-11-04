import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Styles from './DanhSachTheoKhoi.module.scss';
import Button from '../../../../Component/button/Button';
import { useSelector } from 'react-redux';
import { Classes, schoolYears, userToken, Grades, authUser, classLoading } from '../../../../redux/selectors';
import { useHandleDispatch } from '../../../../services/useHandleDispatch';
import SelectOption from '../../../../Component/SelectOption/Index';
import Loading from '../../../../Component/Loading/Index';
import Nodata from '../../../../Component/NoData/Index';

const cx = classNames.bind(Styles);

function Index() {
    const user = useSelector(authUser);
    const roleNames = user.userProfileResponse.userResponse.roles.map((r) => r.name);
    const token = useSelector(userToken);
    const {
        getallschoolyear,
        getallclassesbyyearandgrade,
        getallgrade,
        getallclassroomOfteacher,
        getclassRoomByClassTeacher,
    } = useHandleDispatch();
    const classes = useSelector(Classes);
    const ClassLoading = useSelector(classLoading);
    const SchoolYears = useSelector(schoolYears);
    const grades = useSelector(Grades);
    const [YearId, setYearId] = useState(-1);
    const [gradeId, setGradeId] = useState('');
    const [keyWordSchoolYear, setKeyWordSchoolYear] = useState();
    const [keyWordGrade, setKeyWordGrade] = useState();
    const [classRoomClassTeacher, setClassRoomClassTeacher] = useState();

    useEffect(() => {
        getallgrade(token);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keyWordGrade]);

    useEffect(() => {
        setYearId(SchoolYears[0]?.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [SchoolYears]);
    useEffect(() => {
        if (YearId && YearId !== -1) {
            const getclassroom = async () => {
                if (roleNames.includes('ADMIN')) {
                    getallclassesbyyearandgrade(token, YearId, gradeId, '');
                } else if (roleNames.includes('TEACHER')) {
                    getallclassroomOfteacher(token, user?.id, YearId, gradeId);
                    const response = await getclassRoomByClassTeacher(token, user?.id, YearId);
                    if (response.code === 1000) {
                        setClassRoomClassTeacher(response.result);
                    } else {
                        setClassRoomClassTeacher(null);
                    }
                }
            };
            getclassroom();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [YearId, gradeId]);

    useEffect(() => {
        getallschoolyear(keyWordSchoolYear);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keyWordSchoolYear]);

    const dataformatOptionOfSchoolYear = SchoolYears.map((year) => ({
        id: year.id,
        nameOption: `${year.schoolYear} - ${year.schoolYear + 1}`,
    }));
    const dataformatOptionOfGrade = grades.map((grade) => ({
        id: grade.id,
        nameOption: `${grade.grade}`,
    }));

    const handleChangeOptionSchoolYear = (id) => {
        setYearId(id);
    };
    const handleChangeOptionGrade = (id) => {
        setGradeId(id);
    };

    const handleSearchChangeGrade = (event) => {
        setKeyWordGrade(event.target.value);
    };

    const handleSearchChangeSchoolYear = (event) => {
        setKeyWordSchoolYear(event.target.value);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('select-option')}>
                <SelectOption
                    title="Chọn năm học"
                    handleSearchChange={handleSearchChangeSchoolYear}
                    dataOptions={dataformatOptionOfSchoolYear}
                    onclick={(id) => handleChangeOptionSchoolYear(id)}
                    selectedOption={YearId}
                />
                <SelectOption
                    title="Chọn khối"
                    handleSearchChange={handleSearchChangeGrade}
                    dataOptions={dataformatOptionOfGrade}
                    onclick={(id) => handleChangeOptionGrade(id)}
                    selectedOption={gradeId}
                />
            </div>

            <div className={cx('list-class')}>
                <h2>LỚP CHỦ NHIỆM</h2>

                <div className={cx('class-teacher')}>
                    {classRoomClassTeacher ? (
                        <Button className={cx('item')} to={`/admin/classRoom/${classRoomClassTeacher?.id}/student`}>
                            <div className={cx('item-name')}>{classRoomClassTeacher?.name}</div>
                            <div className={cx('item-gvcv')}>
                                GVCN :{' '}
                                {classRoomClassTeacher?.classTeacher?.userProfileResponse?.fullName || 'Không có'}
                            </div>
                            <img
                                className={cx('image')}
                                src={
                                    classRoomClassTeacher?.classTeacher?.userProfileResponse?.imageUrl ||
                                    'https://res.cloudinary.com/danrswhe6/image/upload/v1725669304/anhdaidien_w5zpy2.webp'
                                }
                                alt="TeacherImage"
                            />
                        </Button>
                    ) : (
                        <div className={cx('nodata')}>KHÔNG CÓ DỮ LIỆU</div>
                    )}
                </div>

                <h2>DANH SÁCH LỚP ĐƯỢC QUẢN LÝ</h2>
                <div className={cx('class-teach')}>
                    {classes?.length > 0 ? (
                        classes?.map((item) => (
                            <Button key={item.id} className={cx('item')} to={`/admin/classRoom/${item.id}/student`}>
                                <div className={cx('item-name')}>{item.name}</div>
                                <div className={cx('item-gvcv')}>
                                    GVCN : {item?.classTeacher?.userProfileResponse?.fullName || 'Không có'}
                                </div>
                                <img
                                    className={cx('image')}
                                    src={
                                        item?.classTeacher?.userProfileResponse?.imageUrl ||
                                        'https://res.cloudinary.com/danrswhe6/image/upload/v1725669304/anhdaidien_w5zpy2.webp'
                                    }
                                    alt="TeacherImage"
                                />
                            </Button>
                        ))
                    ) : (
                        <Nodata />
                    )}
                </div>
            </div>

            {ClassLoading && <Loading />}
        </div>
    );
}

export default Index;
