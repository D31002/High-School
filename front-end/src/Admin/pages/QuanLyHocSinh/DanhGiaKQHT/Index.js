import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Styles from './DanhGia.module.scss';
import Table from '../../../../Component/MuiTable/Index';
import { useSelector } from 'react-redux';
import { totalPagesStudent, userToken, Conduct, AcademicPerformance } from '../../../../redux/selectors';
import Modal from '../../../../Component/Modal/Index';
import Loading from '../../../../Component/Loading/Index';
import { useHandleDispatch } from '../../../../services/useHandleDispatch';
import Button from '../../../../Component/button/Button';
import { showErrorMessage, showSuccessMessage } from '../../../../Component/Notification/Index';
import SelectOption from '../../../../Component/SelectOption/Index';

const cx = classNames.bind(Styles);

const headCells = [
    { id: 'studentCode', label: 'MSHS' },
    { id: 'fullName', label: 'Họ tên' },
    { id: 'meanScore', label: 'Điểm TBHK' },
    { id: 'studentRank', label: 'Xếp hạng' },
    { id: 'conduct.name', label: 'Hạnh kiểm' },
    { id: 'academicPerformance.name', label: 'Học lực' },
];

function Index({ onclose, classRoom }) {
    const {
        getallAcademicOfStudentOfClassRoomNoPagination,
        getallConduct,
        calculateMeanScoreOfSemester,
        getsemesterNow,
        getallAcademicPerformance,
        assessmentacademicResults,
        calculateMeanScoreOfSubject,
    } = useHandleDispatch();
    const token = useSelector(userToken);
    const conducts = useSelector(Conduct);
    const academicPerformances = useSelector(AcademicPerformance);
    const totalPages = useSelector(totalPagesStudent);
    const [keyWord, setKeyWord] = useState('');
    console.log(setKeyWord);
    const [loading, setLoading] = useState(false);
    const [showSelectConduct, setShowSelectConduct] = useState(false);
    const [semesterNow, setSemesterNow] = useState();
    const [conductId, setConductId] = useState();
    const [academicEdit, setAcademicEdit] = useState();
    const [academicOfstudents, setAcademicOfstudents] = useState([]);

    const dataformatOptionOfConduct = conducts?.map((conduct) => ({
        id: conduct.id,
        nameOption: `${conduct.name}`,
    }));

    useEffect(() => {
        getallAcademicPerformance(token);
        getallConduct(token);
        const getsemesternow = async () => {
            const response = await getsemesterNow(token);
            if (response.code === 1000) {
                setSemesterNow(response.result);
            }
        };
        getsemesternow();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        if (academicOfstudents.length > 0) {
            const updatedStudents = academicOfstudents.map(async (student) => {
                const scores = [];
                const subjectPromises = classRoom?.combination?.subjects?.map(async (subject) => {
                    let meanScore = null;

                    if (student && student?.id !== 0 && student.scoresResponses !== null) {
                        meanScore = await calculateMeanScoreOfSubject(
                            token,
                            student?.studentId,
                            classRoom?.id,
                            semesterNow?.id,
                            subject?.id,
                        );
                    }

                    if (subject?.id !== 10) {
                        scores.push({
                            subjectId: subject?.id,
                            meanScore: meanScore?.result?.meanScore,
                        });
                    }
                });
                await Promise.all(subjectPromises);
                if (student?.meanScore != null && student?.conduct && student.scoresResponses !== null) {
                    let academicPerformance;
                    if (
                        student.meanScore >= 8 &&
                        scores?.every((score) => parseFloat(score.meanScore) >= 6.5) &&
                        student?.conduct?.id === 1
                    ) {
                        academicPerformance = academicPerformances?.find((p) => p.id === 1);
                    } else if (
                        student.meanScore >= 6.5 &&
                        student.meanScore < 8 &&
                        scores?.every((score) => parseFloat(score.meanScore) >= 5) &&
                        (student?.conduct?.id === 1 || student?.conduct?.id === 2)
                    ) {
                        academicPerformance = academicPerformances?.find((p) => p.id === 2);
                    } else if (
                        student.meanScore >= 5 &&
                        student.meanScore < 6.5 &&
                        scores?.every((score) => parseFloat(score.meanScore) >= 3.5) &&
                        (student?.conduct?.id === 1 || student?.conduct?.id === 2 || student?.conduct?.id === 3)
                    ) {
                        academicPerformance = academicPerformances?.find((p) => p.id === 3);
                    } else if (
                        student.meanScore >= 3.5 &&
                        student.meanScore < 5 &&
                        scores?.some((score) => parseFloat(score.meanScore) < 3.5) &&
                        (student?.conduct?.id === 1 || student?.conduct?.id === 2 || student?.conduct?.id === 3)
                    ) {
                        academicPerformance = academicPerformances?.find((p) => p.id === 4);
                    } else {
                        academicPerformance = academicPerformances?.find((p) => p.id === 5);
                    }
                    return {
                        ...student,
                        academicPerformance,
                    };
                }
                return student;
            });

            Promise.all(updatedStudents).then((result) => {
                if (JSON.stringify(result) !== JSON.stringify(academicOfstudents)) {
                    setAcademicOfstudents(result);
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [academicOfstudents]);
    useEffect(() => {
        if (academicOfstudents.length <= 0 && semesterNow) {
            const fetchStudents = async () => {
                setLoading(true);
                let allStudents = [...academicOfstudents];
                for (let i = 1; i <= totalPages; i++) {
                    const response = await getallAcademicOfStudentOfClassRoomNoPagination(
                        token,
                        classRoom?.id,
                        semesterNow?.id,
                        i,
                        -1,
                        keyWord,
                    );

                    if (response.code === 1000) {
                        allStudents = [...allStudents, ...response?.result?.data];
                    }
                }
                setAcademicOfstudents(allStudents);
                setLoading(false);
            };
            fetchStudents();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [totalPages, semesterNow]);

    const hanleSetHKGoodAll = () => {
        const updateAcademic = academicOfstudents.map((academicStudent) => ({
            ...academicStudent,
            conduct: conducts.find((conduct) => conduct.id === 1),
        }));
        setAcademicOfstudents(updateAcademic);
    };
    const calculateMeanScoreSemester = async () => {
        setLoading(true);
        const isvalid = academicOfstudents.some((academicStudent) => academicStudent.id === 0);
        if (!isvalid) {
            const studentMeanScores = academicOfstudents.map(async (academicStudent) => {
                if (academicStudent.id !== 0) {
                    const response = await calculateMeanScoreOfSemester(
                        token,
                        academicStudent?.studentId,
                        classRoom?.id,
                        semesterNow?.id,
                    );
                    if (response.code === 1000) {
                        return response.result;
                    } else {
                        showErrorMessage(response.message);
                    }
                }
            });
            const results = await Promise.all(studentMeanScores);
            const updatedAcademicOfStudents = academicOfstudents.map((academicStudent) => {
                const result = results.find((r) => r?.studentId === academicStudent?.studentId);
                if (result) {
                    return {
                        ...academicStudent,
                        meanScore: result.meanScore,
                    };
                }
                return academicStudent;
            });
            setAcademicOfstudents(updatedAcademicOfStudents);
        } else {
            showErrorMessage('Chưa đủ điểm để tính');
        }
        setLoading(false);
    };

    // const abc = () => {
    //     const updatedStudents = academicOfstudents.map((academicStudent) => ({
    //         ...academicStudent,
    //         studentRank: null,
    //         meanScore: Math.floor(Math.random() * 10) + 1,
    //         conduct: conducts[Math.floor(Math.random() * conducts.length)],
    //     }));
    //     setAcademicOfstudents(updatedStudents);
    // };

    const handleSortStudentrank = () => {
        const isvalid = !academicOfstudents.every(
            (academicStudent) =>
                academicStudent?.meanScore === null ||
                academicStudent?.meanScore === 0 ||
                academicStudent?.conduct === null,
        );
        if (isvalid) {
            const sortedStudents = academicOfstudents.sort((a, b) => {
                if (a.academicPerformance?.id !== b.academicPerformance?.id) {
                    return a.academicPerformance?.id - b.academicPerformance?.id;
                }
                return b.meanScore - a.meanScore;
            });

            sortedStudents.forEach((student, index) => {
                student.studentRank = index + 1;
            });
            setAcademicOfstudents([...sortedStudents]);
        } else {
            showErrorMessage('Tính điểm phải có đầy đủ Điểm TBHK và hạnh kiểm của toàn bộ Học sinh');
        }
    };
    const handleShowEdit = async (e, row) => {
        e.preventDefault();
        e.stopPropagation();
        setAcademicEdit(row);
        setShowSelectConduct(true);
        setConductId(row?.conduct?.id);
    };
    const handleChangeOptionConduct = (id) => {
        setConductId(id);
    };

    const handleSubmitChangeConductOfStudent = () => {
        const index = academicOfstudents?.findIndex(
            (academicStudent) => academicStudent?.studentId === academicEdit?.studentId,
        );
        const updatedAcademicOfStudents = [...academicOfstudents];
        updatedAcademicOfStudents[index].conduct = conducts?.find((conduct) => conduct?.id === conductId);
        setAcademicOfstudents(updatedAcademicOfStudents);
        setShowSelectConduct(false);
    };

    const oncloseSelectConduct = () => {
        setShowSelectConduct(false);
    };

    const handleSaveAcademicAll = async () => {
        const response = await assessmentacademicResults(token, academicOfstudents);
        if (response.code === 1000) {
            showSuccessMessage(response.result);
        } else {
            showErrorMessage(response.message);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <Modal
                title={`Đánh Giá Kết Quả Học Tập ${semesterNow?.name || ''}`}
                edit
                onClose={onclose}
                hidden
                oneItem
                handleSubmitEdit={handleSaveAcademicAll}
            >
                <div className={cx('content')}>
                    <div className={cx('btn')}>
                        <Button btn onClick={hanleSetHKGoodAll}>
                            Tất cả hạnh kiểm tốt
                        </Button>
                        <Button btn onClick={calculateMeanScoreSemester}>
                            Tính điểm TBHK
                        </Button>
                        <Button btn onClick={handleSortStudentrank}>
                            Tự động xếp hạng
                        </Button>
                        {/* <Button btn onClick={abc}>
                            ráng đại giá trị
                        </Button> */}
                    </div>
                    <Table
                        headCells={headCells}
                        data={academicOfstudents}
                        noPagination
                        action
                        handleShowEdit={handleShowEdit}
                    />
                </div>
            </Modal>
            {showSelectConduct && (
                <Modal onClose={oncloseSelectConduct} edit handleSubmitEdit={handleSubmitChangeConductOfStudent}>
                    <SelectOption
                        title="Chọn hạnh kiểm"
                        dataOptions={dataformatOptionOfConduct}
                        // // handleSearchChange={handleSearchChangeTeacherNotBySubjectId}
                        onclick={(id) => handleChangeOptionConduct(id)}
                        selectedOption={conductId}
                    />
                </Modal>
            )}

            {loading && <Loading />}
        </div>
    );
}

export default Index;
