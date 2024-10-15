import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Styles from './XepGiangDay.module.scss';
import { useHandleDispatch } from '../../../services/useHandleDispatch';
import { useSelector } from 'react-redux';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Button from '../../../Component/button/Button';
import Loading from '../../../Component/Loading/Index';
import { schoolYears, Teachers, TeachLoading, Teachs, userToken } from '../../../redux/selectors';
import Modal from '../../../Component/Modal/Index';
import {
    showBeforeDelete,
    showErrorMessage,
    showSuccessMessage,
    showWarningMessage,
} from '../../../Component/Notification/Index';
import SelectOption from '../../../Component/SelectOption/Index';
import Nodata from '../../../Component/NoData/Index';

const cx = classNames.bind(Styles);

function XepGiangDay() {
    const [dataGenerate, setDataGenerate] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const token = useSelector(userToken);
    const teachs = useSelector(Teachs);
    const teachers = useSelector(Teachers);
    const teachLoading = useSelector(TeachLoading);
    const SchoolYears = useSelector(schoolYears);
    const [YearId, setYearId] = useState();
    const [dataEdit, setDataEdit] = useState({
        teachId: '',
        teacherId: '',
    });
    const [keyWordSchoolYear, setKeyWordSchoolYear] = useState();
    const {
        generateschedules,
        saveschedules,
        getallschoolyear,
        getschedulesbySchoolYearId,
        deleteschedulesbySchoolYearId,
        getteacherbyid,
        editschedules,
        getallteacherbysubjectInNotpagination,
    } = useHandleDispatch();
    const dataformatOptionOfSchoolYear = SchoolYears.map((year) => ({
        id: year.id,
        nameOption: `${year.schoolYear} - ${year.schoolYear + 1}`,
    }));
    const dataformatOptionOfTeacher = teachers?.map((teacher) => ({
        id: teacher.id,
        nameOption: `${teacher.teacherCode} - ${teacher.userProfileResponse.fullName}`,
    }));
    useEffect(() => {
        if (SchoolYears && SchoolYears.length <= 0) {
            getallschoolyear(keyWordSchoolYear);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (SchoolYears && SchoolYears[0]?.id) {
            if (teachs?.length <= 0) {
                getschedulesbySchoolYearId(token, SchoolYears[0]?.id);
            }
            setYearId(SchoolYears[0]?.id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [SchoolYears]);

    useEffect(() => {
        if (YearId && teachs?.schoolYearResponse?.id !== YearId) {
            getschedulesbySchoolYearId(token, YearId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [YearId]);

    const handleSearchChangeSchoolYear = (event) => {
        setKeyWordSchoolYear(event.target.value);
    };
    const handleChangeOptionSchoolYear = (id) => {
        setYearId(id);
    };

    const handleGenerateTKB = async () => {
        if (YearId) {
            setLoading(true);
            const response = await generateschedules(token, YearId);
            if (response.code === 1000) {
                setDataGenerate(response.result);
            } else {
                showErrorMessage(response.message);
            }
            setLoading(false);
        } else {
            showWarningMessage('Vui lòng chọn năm để tạo lịch ngẫu nhiên');
        }
    };

    const handleSaveTKB = async () => {
        const newDataSave = dataGenerate?.teachDetails?.map((item) => ({
            lessonId: item.lesson?.id,
            teacherId: item.teacherResponse?.id,
            subjectId: item.subjectResponse?.id,
            schoolYearId: YearId,
            classRoomId: item.classEntityResponse?.id,
            dayOfWeek: item.dayOfWeek,
        }));
        const resposne = await saveschedules(token, newDataSave);
        if (resposne.code === 1000) {
            await getschedulesbySchoolYearId(token, YearId);
            setDataGenerate([]);
            showSuccessMessage('thành công');
        } else {
            showErrorMessage(resposne.message);
        }
    };
    const handleDeleteTKB = async () => {
        if (YearId && teachs?.teachDetails?.length > 0) {
            showBeforeDelete(`Bạn muốn xóa :)`).then(async (result) => {
                if (result.isConfirmed) {
                    await deleteschedulesbySchoolYearId(token, YearId);
                    getschedulesbySchoolYearId(token, YearId);
                } else {
                    showErrorMessage('Bạn đừng phân vân nữa:)');
                }
            });
        } else {
            showErrorMessage('Lỗi khi xóa');
        }
    };

    const processData = (data) => {
        if (!Array.isArray(data)) {
            return;
        }
        const classSchedules = {};
        const teacherScheduleMap = {};

        data.forEach((item) => {
            const classRoomId = item.classEntityResponse?.id;
            const className = item.classEntityResponse.name;
            const classTeacher = item.classEntityResponse.classTeacher?.userProfileResponse?.fullName || 'Chưa có';

            if (!classSchedules[classRoomId]) {
                classSchedules[classRoomId] = {
                    className,
                    classTeacher,
                    schedule: {},
                };
            }

            if (item.lesson) {
                const period = item.lesson.lesson;
                const day = item.dayOfWeek;
                const teacherId = item.teacherResponse?.id;
                const subject = item.subjectResponse.name;
                const lessonId = item.id || null;

                const key = `${day}-${period}-${teacherId}`;

                if (teacherScheduleMap[key]) {
                    teacherScheduleMap[key].forEach((scheduledClass) => {
                        scheduledClass.isDuplicate = true;
                    });
                } else {
                    teacherScheduleMap[key] = [];
                }

                const lessonData = {
                    lessonId: lessonId,
                    subject: `${subject} (GV.${item.teacherResponse?.userProfileResponse?.fullName})`,
                    time: `${item.lesson?.start} - ${item.lesson?.end}`,
                    isDuplicate: false,
                };

                teacherScheduleMap[key].push(lessonData);

                if (!classSchedules[classRoomId].schedule[day]) {
                    classSchedules[classRoomId].schedule[day] = {};
                }

                classSchedules[classRoomId].schedule[day][period] = lessonData;
            }
        });

        Object.values(teacherScheduleMap).forEach((scheduleGroup) => {
            if (scheduleGroup.length > 1) {
                scheduleGroup.forEach((lesson) => {
                    lesson.isDuplicate = true;
                });
            }
        });
        return Object.values(classSchedules).sort((a, b) => a.className.localeCompare(b.className));
    };

    const scheduleData = processData(
        teachs?.teachDetails?.length > 0 ? teachs.teachDetails : dataGenerate?.teachDetails,
    );

    const oncloseModal = () => {
        setShowModal(false);
    };

    const handleEditLesson = async (id) => {
        if (id) {
            setShowModal(true);
            let teach;
            if (teachs.teachDetails?.length <= 0) {
                teach = dataGenerate.teachDetails.find((item) => item.id === id);
            } else {
                teach = teachs.teachDetails.find((item) => item.id === id);
            }
            await getallteacherbysubjectInNotpagination(token, teach?.subjectResponse?.id);
            setDataEdit({ ...dataEdit, teachId: teach?.id, teacherId: teach?.teacherResponse?.id });
        }
    };
    const handleChangeOptionTeacher = (id) => {
        setDataEdit({ ...dataEdit, teacherId: id });
    };

    const handleSubmitEdit = async () => {
        if (dataEdit.teacherId) {
            const response = await getteacherbyid(token, dataEdit.teacherId);
            if (response.code === 1000) {
                let index;
                if (teachs.teachDetails?.length <= 0) {
                    index = dataGenerate.teachDetails.findIndex((item) => item.id === dataEdit.teachId);
                    if (index !== -1) {
                        const t = dataGenerate.teachDetails.find((item) => item.id === dataEdit.teachId);
                        const list = dataGenerate.teachDetails.filter(
                            (teach) =>
                                teach.classEntityResponse.id === t.classEntityResponse.id &&
                                teach.subjectResponse.id === t.subjectResponse.id,
                        );
                        const updatedTeachDetails = [...dataGenerate.teachDetails];
                        list?.forEach((teach) => {
                            const index = updatedTeachDetails.findIndex((item) => item.id === teach.id);
                            if (index !== -1) {
                                updatedTeachDetails[index] = {
                                    ...updatedTeachDetails[index],
                                    teacherResponse: response.result,
                                };
                            }
                        });
                        setDataGenerate({
                            ...dataGenerate,
                            teachDetails: updatedTeachDetails,
                        });
                        showSuccessMessage('Cập nhật thành công');
                    } else {
                        showErrorMessage('Không tìm thấy dữ liệu để cập nhật');
                    }
                } else {
                    const res = await editschedules(token, dataEdit);
                    if (res.code === 1000) {
                        setShowModal(false);
                        await getschedulesbySchoolYearId(token, YearId);
                        showSuccessMessage('Cập nhật thành công');
                    } else {
                        showErrorMessage(res.message);
                    }
                }
            }
        } else {
            showWarningMessage('Vui lòng chọn giáo viên');
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
                        selectedOption={YearId}
                    />
                </div>
                <div>
                    {teachs.teachDetails?.length > 0 && (
                        <Button onClick={handleDeleteTKB} btn>
                            Xóa thời khóa biểu
                        </Button>
                    )}
                    {teachs.teachDetails?.length <= 0 && (
                        <Button onClick={handleGenerateTKB} btn>
                            Tạo thời khóa biểu
                        </Button>
                    )}

                    {dataGenerate?.teachDetails?.length > 0 && (
                        <Button onClick={handleSaveTKB} btn>
                            Lưu
                        </Button>
                    )}
                </div>
            </div>

            {(loading || teachLoading) && <Loading />}

            <div>
                {scheduleData?.length > 0 ? (
                    scheduleData.map(({ className, classTeacher, schedule }, index) => (
                        <div key={index} className={cx('table-wrapper')}>
                            <div className={cx('ClassRoom')}>{`TKB Lớp ${className} - GVCN: ${classTeacher}`}</div>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className={cx('datarow')}>Tiết</TableCell>
                                            {['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'].map(
                                                (day) => (
                                                    <TableCell key={day}>{day}</TableCell>
                                                ),
                                            )}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {Array.from({ length: 9 }, (_, i) => i + 1).map((period) => (
                                            <TableRow key={period}>
                                                <TableCell className={cx('datarow')}>{`Tiết ${period}`}</TableCell>
                                                {[
                                                    'MONDAY',
                                                    'TUESDAY',
                                                    'WEDNESDAY',
                                                    'THURSDAY',
                                                    'FRIDAY',
                                                    'SATURDAY',
                                                ].map((day) => (
                                                    <TableCell
                                                        key={day}
                                                        onClick={() =>
                                                            handleEditLesson(schedule[day]?.[period]?.lessonId)
                                                        }
                                                        className={cx('datarow', {
                                                            duplicate: schedule[day]?.[period]?.isDuplicate,
                                                        })}
                                                    >
                                                        {day === 'MONDAY' && period === 1
                                                            ? `chào cờ (GVCN.${classTeacher})`
                                                            : day === 'SATURDAY' && period === 5
                                                            ? `Sinh hoạt (GVCN.${classTeacher})`
                                                            : schedule[day]?.[period]?.subject || ''}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    ))
                ) : (
                    <Nodata />
                )}

                {showModal && (
                    <Modal edit onClose={oncloseModal} handleSubmitEdit={handleSubmitEdit}>
                        <SelectOption
                            title="Chọn giáo viên"
                            dataOptions={dataformatOptionOfTeacher}
                            onclick={(id) => handleChangeOptionTeacher(id)}
                            selectedOption={dataEdit?.teacherId}
                            w400
                        />
                    </Modal>
                )}
            </div>
        </div>
    );
}

export default XepGiangDay;
