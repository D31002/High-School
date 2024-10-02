import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Styles from './AcademicResult.module.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useSelector } from 'react-redux';
import { authUser, userToken, Category, semesters, schoolYears, AttendanceStatus } from '../../../redux/selectors';
import { useHandleDispatch } from '../../../services/useHandleDispatch';
import Loading from '../../../Component/Loading/Index';

const cx = classNames.bind(Styles);

function Index() {
    const user = useSelector(authUser);
    const token = useSelector(userToken);
    const category = useSelector(Category);
    const schoolyears = useSelector(schoolYears);
    const Semesters = useSelector(semesters);
    const attendanceStatus = useSelector(AttendanceStatus);
    const [schoolYearNow, setSchoolYearNow] = useState();
    const [semesterNow, setSemesterNow] = useState();
    const [classRoomOfStudent, setClassRoomOfStudent] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [academicOfStudent, setAcademicOfStudent] = useState();
    const [AttendanceOfStudent, setAttendanceOfStudent] = useState();
    const {
        getallCategory,
        getallschoolyear,
        getclassRoomNOWofStudent,
        getallsemester,
        getacademicOfStudent,
        getattendanceOfStudent,
        getallAttendanceStatus,
        calculateMeanScoreOfSubject,
    } = useHandleDispatch();

    useEffect(() => {
        getallCategory(token);
        getallschoolyear();
        getallsemester(token);
        getallAttendanceStatus(token);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setSchoolYearNow(schoolyears[0]);
    }, [schoolyears]);
    useEffect(() => {
        if (schoolYearNow) {
            const getCurrentSemester = currentSemester();
            setSemesterNow(getCurrentSemester);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [schoolYearNow]);

    useEffect(() => {
        const getAcademic = async (studentId, classRoomId, semesterId) => {
            const Academicresponse = await getacademicOfStudent(token, studentId, classRoomId, semesterId);
            if (Academicresponse.code === 1000) {
                setAcademicOfStudent(Academicresponse.result);
            }
            const Atteandanceresponse = await getattendanceOfStudent(token, studentId, classRoomId, semesterId);
            if (Atteandanceresponse.code === 1000) {
                setAttendanceOfStudent(Atteandanceresponse.result);
            }
        };

        if (user && classRoomOfStudent && semesterNow) {
            getAcademic(user?.id, classRoomOfStudent?.id, semesterNow?.id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, classRoomOfStudent, semesterNow]);

    useEffect(() => {
        const getclassRoom = async (studentId, schoolYearId) => {
            const response = await getclassRoomNOWofStudent(token, studentId, schoolYearId);
            if (response.code === 1000) {
                setClassRoomOfStudent(response.result);
            }
        };

        if (user?.id && schoolYearNow?.id) {
            getclassRoom(user?.id, schoolYearNow?.id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.id, schoolYearNow]);

    const currentSemester = () => {
        const today = new Date();
        const semester = Semesters?.find((semester) => {
            const startYear = semester?.startMonth >= 9 ? schoolYearNow?.schoolYear : schoolYearNow?.schoolYear + 1;
            const endYear = schoolYearNow?.schoolYear + 1;

            const startHK = new Date(startYear, semester?.startMonth - 1, semester?.startDay);
            const endHK = new Date(endYear, semester?.endMonth - 1, semester?.endDay);

            return today >= startHK && today <= endHK;
        });
        return semester;
    };
    const getScores = (categoryId, subjectId) => {
        const category = academicOfStudent?.scoresResponses?.find((item) => item.categoryId === categoryId);
        const scores = category?.scores?.filter((score) => score.subjectId === subjectId);
        if (scores?.length > 0) {
            return scores.map((score) => score.score).join(' | ');
        }
        return 'Chưa có';
    };

    const getSumNumber = (statusId) => {
        let number = 0;
        AttendanceOfStudent?.forEach((attendance) => {
            if (attendance?.attendanceStatus?.id === statusId) {
                number++;
            }
        });
        return number;
    };
    const [meanScores, setMeanScores] = useState({});
    useEffect(() => {
        const fetchMeanScores = async () => {
            if (classRoomOfStudent?.combination?.subjects) {
                setIsLoading(true);
                const scores = {};
                const subjectPromises = classRoomOfStudent.combination.subjects.map(async (subject) => {
                    let meanScore = null;

                    if (academicOfStudent && academicOfStudent?.id !== 0) {
                        meanScore = await calculateMeanScoreOfSubject(
                            token,
                            user?.id,
                            classRoomOfStudent?.id,
                            semesterNow?.id,
                            subject?.id,
                        );
                    }

                    scores[subject?.id] = meanScore?.result;
                });
                await Promise.all(subjectPromises);
                setMeanScores(scores);
                setIsLoading(false);
            }
        };
        fetchMeanScores();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [classRoomOfStudent, semesterNow, user, token, academicOfStudent]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}></div>
            <div className={cx('body')}>
                <div className={cx('table-result')}>
                    <h3
                        className={cx('head')}
                    >{`Kết quả học tập của ${user?.userProfileResponse?.fullName} trong ${semesterNow?.name}`}</h3>
                    <TableContainer>
                        <Table sx={{ border: '1px solid #e0e0e0' }}>
                            <TableBody>
                                <TableRow>
                                    <TableCell className={cx('datarow')}>Điểm TB</TableCell>
                                    <TableCell className={cx('datarow')}>
                                        {academicOfStudent && academicOfStudent?.meanScore !== 0
                                            ? academicOfStudent?.meanScore
                                            : 'chưa xét'}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className={cx('datarow')}>Xếp hạng</TableCell>
                                    <TableCell className={cx('datarow')}>
                                        {academicOfStudent && academicOfStudent?.studentRank !== 0
                                            ? academicOfStudent?.studentRank
                                            : 'chưa xét'}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className={cx('datarow')}>Danh hiệu</TableCell>
                                    <TableCell className={cx('datarow')}>Chưa xét</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className={cx('datarow')}>Hạnh kiểm</TableCell>
                                    <TableCell className={cx('datarow')}>
                                        {academicOfStudent?.conduct ? academicOfStudent?.conduct?.name : 'chưa xét'}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className={cx('datarow')}>Học lực</TableCell>
                                    <TableCell className={cx('datarow')}>
                                        {academicOfStudent?.academicPerformance
                                            ? academicOfStudent?.academicPerformance?.name
                                            : 'chưa xét'}
                                    </TableCell>
                                </TableRow>
                                {attendanceStatus?.map((status, index) => (
                                    <TableRow key={index}>
                                        <TableCell className={cx('datarow')}>{status.statusName}</TableCell>
                                        <TableCell className={cx('datarow')}>{getSumNumber(status.id)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div className={cx('table-scores')}>
                    <h3 className={cx('head')}>{`Bảng điểm các môn ${semesterNow?.name}`}</h3>
                    <TableContainer>
                        <Table sx={{ border: '1px solid #e0e0e0' }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell className={cx('datarow')}>Môn học</TableCell>
                                    {category.map((category, index) => (
                                        <TableCell key={index} className={cx('datarow')}>
                                            {category.name}
                                        </TableCell>
                                    ))}
                                    <TableCell className={cx('datarow')}>Điểm trung bình</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {classRoomOfStudent?.combination?.subjects?.map((subject, index) => (
                                    <TableRow key={index}>
                                        <TableCell className={cx('datarow')}>{subject.name}</TableCell>
                                        {category.map((cat, categoryIndex) => (
                                            <TableCell key={categoryIndex} className={cx('datarow')}>
                                                {getScores(cat?.id, subject?.id) || 'Chưa có'}
                                            </TableCell>
                                        ))}
                                        <TableCell className={cx('datarow')}>
                                            {meanScores[subject?.id]?.meanScore || 'Chưa tính'}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
            {isLoading && <Loading />}
        </div>
    );
}

export default Index;
