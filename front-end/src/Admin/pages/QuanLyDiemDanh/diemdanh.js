import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Styles from './diemdanh.module.scss';
import Button from '../../../Component/button/Button';
import SelectOption from '../../../Component/SelectOption/Index';
import Loading from '../../../Component/Loading/Index';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Radio,
    TablePagination,
    TextField,
} from '@mui/material';
import { useHandleDispatch } from '../../../services/useHandleDispatch';
import { useSelector } from 'react-redux';
import {
    userToken,
    schoolYears,
    Classes,
    AttendanceStatus,
    Students,
    totalElementsStudent,
    StudentsLoading,
    semesters,
    Session,
} from '../../../redux/selectors';
import {
    showBeforeSubmit,
    showErrorMessage,
    showSuccessMessage,
    showWarningMessage,
} from '../../../Component/Notification/Index';
import Nodata from '../../../Component/NoData/Index';

const cx = classNames.bind(Styles);

function Diemdanh() {
    const token = useSelector(userToken);
    const SchoolYears = useSelector(schoolYears);
    const classRooms = useSelector(Classes);
    const students = useSelector(Students);
    const Semesters = useSelector(semesters);
    const sessions = useSelector(Session);
    const studentsLoading = useSelector(StudentsLoading);
    const attendanceStatus = useSelector(AttendanceStatus);
    const TotalElements = useSelector(totalElementsStudent);
    const {
        getallschoolyear,
        getallclassesbyyearandgrade,
        getallAttendanceStatus,
        getallstudentbyclassroomid,
        getallsemester,
        createattendance,
        getallSession,
        getsemesterNow,
    } = useHandleDispatch();
    const [yearId, setYearId] = useState();
    const [classRoomId, setClassRoomId] = useState();
    const [sessionId, setSessionId] = useState();
    const [keywordClass, setKeywordClass] = useState('');
    const [keyWordSchoolYear, setKeyWordSchoolYear] = useState('');
    const [keyWordStudent, setKeyWordStudent] = useState('');
    const [currentPage, setCrrentPage] = useState(1);
    const [semesterNow, setSemesterNow] = useState();
    const [pageSize, setPageSize] = useState(7);
    useEffect(() => {
        getallAttendanceStatus(token);
        getallsemester(token);
        getallSession(token);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getallschoolyear(keyWordSchoolYear, token);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keyWordSchoolYear]);

    useEffect(() => {
        setYearId(SchoolYears[0]?.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [SchoolYears]);

    useEffect(() => {
        setClassRoomId(classRooms[0]?.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [classRooms]);

    useEffect(() => {
        if (yearId) {
            getallclassesbyyearandgrade(token, yearId, '', keywordClass);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [yearId, keywordClass]);

    useEffect(() => {
        if (yearId && classRoomId) {
            getallstudentbyclassroomid(token, classRoomId, currentPage, pageSize, keyWordStudent);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [classRoomId, yearId, currentPage, pageSize, keywordClass, keyWordStudent]);

    useEffect(() => {
        if (yearId) {
            const currentSemester = async () => {
                const response = await getsemesterNow(token);
                if (response.code === 1000) {
                    setSemesterNow(response.result);
                }
            };
            currentSemester();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Semesters, yearId]);

    const dataformatOptionOfSchoolYear = SchoolYears.map((year) => ({
        id: year.id,
        nameOption: `${year.schoolYear} - ${year.schoolYear + 1}`,
    }));

    const dataformatOptionOfClassRoom = classRooms?.length
        ? classRooms.map((classRoom) => ({
              id: classRoom.id,
              nameOption: `${classRoom.name}`,
          }))
        : [];
    const dataformatOptionOfSession = sessions.map((session) => ({
        id: session.id,
        nameOption: `${session.sessionType}`,
    }));

    const handleChangeOptionSchoolYear = (id) => {
        setYearId(id);
    };
    const handleSearchChangeSchoolYear = (event) => {
        setKeyWordSchoolYear(event.target.value);
    };
    const handleChangeOptionClassRoom = (id) => {
        setClassRoomId(id);
    };
    const handleChangeOptionSession = (id) => {
        setSessionId(id);
    };
    const handleSearchChangeClassRoom = (event) => {
        setKeywordClass(event.target.value);
        setCrrentPage(1);
    };
    const handleSearchChangeStudent = (e) => {
        setKeyWordStudent(e.target.value);
    };

    const handleChangePage = (event, newPage) => {
        setCrrentPage(newPage + 1);
    };
    const handleChangepageSize = (event) => {
        setPageSize(+event.target.value);
        setCrrentPage(1);
    };

    const [studentStatus, setStudentStatus] = useState([]);

    const handleStatusChange = (studentId, statusId) => {
        if (sessionId) {
            const existingIndex = studentStatus.findIndex((item) => item.studentId === studentId);

            if (existingIndex !== -1) {
                if (studentStatus[existingIndex].statusId === statusId) {
                    const updatedStudentStatus = studentStatus.filter((item) => item.studentId !== studentId);
                    setStudentStatus(updatedStudentStatus);
                } else {
                    const updatedStudentStatus = [...studentStatus];
                    updatedStudentStatus[existingIndex] = { studentId, statusId: statusId, sessionId: sessionId };
                    setStudentStatus(updatedStudentStatus);
                }
            } else {
                setStudentStatus((prevStudentStatus) => [
                    ...prevStudentStatus,
                    { studentId, statusId: statusId, sessionId: sessionId },
                ]);
            }
        } else {
            showWarningMessage('Vui lòng chọn buổi học để điểm danh');
        }
    };

    const getDayOfWeek = () => {
        const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
        const currentDay = new Date().getDay();
        return days[currentDay];
    };
    const handleSubmit = () => {
        if (semesterNow) {
            if (classRoomId && sessionId) {
                showBeforeSubmit('Bạn chắc chứ ?').then(async (result) => {
                    if (result.isConfirmed) {
                        const response = await createattendance(token, classRoomId, semesterNow?.id, studentStatus);
                        if (response?.code === 1000) {
                            showSuccessMessage('Thành công');
                            setStudentStatus([]);
                        } else {
                            showErrorMessage(response?.message);
                        }
                    } else {
                        showErrorMessage('Bạn đừng phân vân nữa:)');
                    }
                });
            } else {
                showErrorMessage('Lỗi dữ liệu');
            }
        } else {
            showWarningMessage('Không thuộc học kỳ hiện tại');
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('select-option')}>
                    <SelectOption
                        title="Chọn năm học"
                        handleSearchChange={handleSearchChangeSchoolYear}
                        dataOptions={dataformatOptionOfSchoolYear}
                        onclick={(id) => handleChangeOptionSchoolYear(id)}
                        selectedOption={yearId}
                    />
                    <SelectOption
                        title="Chọn lớp học"
                        handleSearchChange={handleSearchChangeClassRoom}
                        dataOptions={dataformatOptionOfClassRoom}
                        onclick={(id) => handleChangeOptionClassRoom(id)}
                        selectedOption={classRoomId}
                    />
                    <SelectOption
                        title="Chọn buổi"
                        // handleSearchChange={handleSearchChangeClassRoom}
                        dataOptions={dataformatOptionOfSession}
                        onclick={(id) => handleChangeOptionSession(id)}
                        selectedOption={sessionId}
                    />
                    {semesterNow && (
                        <div className={cx('semesterNow')}>
                            {semesterNow ? (
                                <>
                                    <div className={cx('now')}>
                                        Học kỳ hiện tại: {semesterNow?.name} năm học {SchoolYears[0]?.schoolYear} -{' '}
                                        {SchoolYears[0]?.schoolYear + 1}
                                    </div>
                                    <div className={cx('now')}>Hôm nay là : {getDayOfWeek()}</div>
                                </>
                            ) : (
                                <div className={cx('now')}>Học kỳ hiện tại: {semesterNow?.name}</div>
                            )}
                        </div>
                    )}
                </div>
                {studentStatus.length > 0 && (
                    <div className={cx('submit')}>
                        <Button btn onClick={handleSubmit}>
                            Hoàn Thành
                        </Button>
                    </div>
                )}
            </div>
            <TextField
                label="Search"
                variant="outlined"
                value={keyWordStudent}
                onChange={handleSearchChangeStudent}
                sx={{ width: '200px' }}
                size="small"
                InputProps={{
                    style: { fontSize: '1.4rem' },
                }}
                InputLabelProps={{
                    style: { fontSize: '1.4rem' },
                }}
            />
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className={cx('datarow')}>Mã số học sinh</TableCell>
                            <TableCell className={cx('datarow')}>Họ Tên</TableCell>
                            {attendanceStatus.map((status, index) => (
                                <TableCell className={cx('datarow')} key={index}>
                                    {status.statusName}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.length > 0 ? (
                            students.map((student) => (
                                <TableRow key={student.id}>
                                    <TableCell className={cx('datarow')}>{student?.studentCode}</TableCell>
                                    <TableCell className={cx('datarow')}>
                                        {student?.userProfileResponse?.fullName}
                                    </TableCell>
                                    {attendanceStatus.map((status, index) => (
                                        <TableCell key={index}>
                                            <Radio
                                                value={status.id}
                                                onClick={() => handleStatusChange(student.id, status.id)}
                                                checked={studentStatus.some(
                                                    (stustatus) =>
                                                        stustatus.studentId === student.id &&
                                                        stustatus.statusId === status.id,
                                                )}
                                            />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell align="center" colSpan={2 + attendanceStatus.length}>
                                    <Nodata />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 7, 10]}
                component="div"
                count={TotalElements || 0}
                rowsPerPage={pageSize || 5}
                page={currentPage - 1 || 0}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangepageSize}
                sx={{
                    '& .MuiTablePagination-toolbar': {
                        minHeight: '70px',
                    },
                    '& .MuiTablePagination-input': {
                        fontSize: '1.2rem',
                    },
                    '& .MuiTablePagination-selectLabel': {
                        fontSize: '1.2rem',
                    },
                    '& .MuiTablePagination-displayedRows': {
                        fontSize: '1.2rem',
                    },
                    '& .MuiTablePagination-actions': {
                        fontSize: '1.2rem',
                    },
                }}
            />

            {studentsLoading && <Loading />}
        </div>
    );
}

export default Diemdanh;
