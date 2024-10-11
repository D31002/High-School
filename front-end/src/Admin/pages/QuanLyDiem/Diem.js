import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Styles from './Diem.module.scss';
import Muitable from '../../../Component/MuiTable/Index';
import SelectOption from '../../../Component/SelectOption/Index';
import Modal from '../../../Component/Modal/Index';
import AddIcon from '@mui/icons-material/Add';
import { useParams } from 'react-router-dom';
import { useHandleDispatch } from '../../../services/useHandleDispatch';
import { useSelector } from 'react-redux';
import { showErrorMessage, showSuccessMessage, showWarningMessage } from '../../../Component/Notification/Index';
import {
    Classes,
    userToken,
    semesters,
    AcademicResults,
    totalElementsAcademicResults,
    Category,
    authUser,
} from '../../../redux/selectors';

const cx = classNames.bind(Styles);

function Diem() {
    const { classRoomId } = useParams();
    const classRoom = useSelector(Classes);
    const Semesters = useSelector(semesters);
    const teacher = useSelector(authUser);
    const token = useSelector(userToken);
    const academicResults = useSelector(AcademicResults);
    const category = useSelector(Category);
    const TotalElements = useSelector(totalElementsAcademicResults);

    const [showModal, setShowModal] = useState(false);
    const [showEditScores, setShowEditScores] = useState(false);
    const [currentPage, setCrrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    const [keyWord, setKeyWord] = useState('');
    const [subjectList, setSubjectList] = useState([]);
    const [subject, setSubject] = useState({});
    const [semesterNow, setSemesterNow] = useState();
    const [scoresRequests, setScoresRequests] = useState([]);
    const {
        getclassroombyid,
        getallsemester,
        getallAcademicOfStudentOfClassRoom,
        getallCategory,
        getsubjectByTeacherAndClassRoom,
        createscoresOfStudent,
        getsemesterNow,
    } = useHandleDispatch();

    const headCells = [
        { id: 'studentCode', label: 'MSHS' },
        { id: 'fullName', label: 'Họ Tên' },
        ...category.map((c) => ({ id: `${c.id}`, label: c.name })),
    ];

    const dataformatOptionOfSubject = classRoom?.combination?.subjects?.map((subject) => ({
        id: subject.id,
        nameOption: `${subject.name}`,
    }));

    const dataformatOptionOfSemester = Semesters.map((s) => ({
        id: s.id,
        nameOption: `${s.name}`,
    }));

    const handleChangeOptionSubject = async (id) => {
        const subject = classRoom?.combination?.subjects?.find((subject) => subject.id === id);
        setSubject(subject);
    };

    const handleChangeOptionSemester = async (id) => {
        setSemesterNow(Semesters?.find((semester) => semester?.id === id));
    };
    const handleSearch = (dataSearch) => {
        setKeyWord(dataSearch);
    };
    useEffect(() => {
        const currentSemester = async () => {
            const response = await getsemesterNow(token);
            if (response.code === 1000) {
                setSemesterNow(response.result);
            }
        };
        currentSemester();
        setSubject(classRoom?.combination?.subjects[0]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Semesters, classRoom]);

    useEffect(() => {
        const start = async () => {
            getclassroombyid(token, classRoomId);
            getallsemester(token);
            getallCategory(token);
            const response = await getsubjectByTeacherAndClassRoom(token, teacher?.id, classRoomId);
            if (response.code === 1000) {
                setSubjectList(response.result);
            }
        };
        start();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [teacher]);

    useEffect(() => {
        if (classRoomId && subject && semesterNow) {
            getallAcademicOfStudentOfClassRoom(
                token,
                classRoomId,
                semesterNow?.id,
                subject?.id,
                currentPage,
                pageSize,
                keyWord,
            );
        }
        if (subjectList?.map((s) => s?.id).includes(subject?.id)) {
            setShowEditScores(true);
        } else {
            setShowEditScores(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, subject, classRoomId, semesterNow, currentPage, pageSize, keyWord]);

    const prepareData = (results, categories) => {
        return results.map((student) => {
            const scoresByCategory = categories.reduce((acc, category) => {
                const scoreData = student.scoresResponses?.find((response) => response.categoryId === category.id);
                acc[category.id] = scoreData
                    ? scoreData.scores.map((score) => score.score).join(' | ')
                    : 'Chưa có điểm';
                return acc;
            }, {});

            return {
                id: student.studentId,
                studentCode: student.studentCode,
                fullName: student.fullName,
                ...scoresByCategory,
            };
        });
    };

    const preparedData = prepareData(academicResults, category);

    const handleInputChange = (studentId, categoryId, itemScore, value, inputIndex) => {
        let updatedValue = value;

        if (value > 10 || value < 0) {
            updatedValue = '';
        }
        const updatedScores = [...scoresRequests];

        const studentIndex = updatedScores.findIndex((request) => request.studentId === studentId);
        if (studentIndex !== -1) {
            const studentScores = updatedScores[studentIndex].scoresRequests;

            const scoreIndex = studentScores.findIndex(
                (score) =>
                    score.subjectId === subject.id &&
                    score.categoryId === categoryId &&
                    score.scoreId === itemScore?.scoreId &&
                    score.inputIndex === inputIndex,
            );
            if (scoreIndex !== -1) {
                studentScores[scoreIndex].score = updatedValue;
            } else {
                const newScore = {
                    score: updatedValue,
                    subjectId: subject.id,
                    categoryId: categoryId,
                    inputIndex: inputIndex,
                };
                if (itemScore?.scoreId) {
                    newScore.scoreId = itemScore.scoreId;
                }

                studentScores.push(newScore);
            }
            updatedScores[studentIndex].scoresRequests = studentScores;
        } else {
            const newScore = {
                score: updatedValue,
                subjectId: subject.id,
                categoryId: categoryId,
                inputIndex: inputIndex,
            };
            if (itemScore?.scoreId) {
                newScore.scoreId = itemScore.scoreId;
            }
            updatedScores.push({
                studentId: studentId,
                semesterId: semesterNow?.id,
                classRoomId: classRoomId,
                scoresRequests: [newScore],
            });
        }

        setScoresRequests(updatedScores);
    };
    const oncloseModal = () => {
        setShowModal(false);
        setScoresRequests([]);
    };
    const showmodal = async () => {
        setShowModal(true);
    };

    const handleSubmitEdit = async () => {
        if (scoresRequests.length <= 0) {
            showWarningMessage('Vui lòng thêm điểm');
        } else {
            const response = await createscoresOfStudent(token, teacher?.id, scoresRequests);
            if (response.code === 1000) {
                showSuccessMessage('Thành công');
                oncloseModal();
                getallAcademicOfStudentOfClassRoom(
                    token,
                    classRoomId,
                    semesterNow?.id,
                    subject.id,
                    currentPage,
                    pageSize,
                    keyWord,
                );
            } else {
                showErrorMessage(response.messge);
            }
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('select-option')}>
                    <SelectOption
                        title="Chọn môn học"
                        // handleSearchChange={handleSearchChangeSubject}
                        dataOptions={dataformatOptionOfSubject}
                        onclick={(id) => handleChangeOptionSubject(id)}
                        selectedOption={subject?.id}
                    />
                    <SelectOption
                        title="Chọn học kỳ"
                        // handleSearchChange={handleSearchChangeSubject}
                        dataOptions={dataformatOptionOfSemester}
                        onclick={(id) => handleChangeOptionSemester(id)}
                        selectedOption={semesterNow?.id}
                    />
                    {showEditScores && (
                        <div className={cx('add')} onClick={showmodal}>
                            <AddIcon /> Chỉnh sửa điểm
                        </div>
                    )}
                </div>
            </div>
            <div className={cx('table')}>
                <Muitable
                    title={`DANH SÁCH ĐIỂM : Môn ${subject?.name} - lớp ${classRoom?.name} - Hiện tại đang là : ${semesterNow?.name}`}
                    headCells={headCells}
                    handleSearch={handleSearch}
                    data={preparedData}
                    currentPage={currentPage}
                    setCrrentPage={setCrrentPage}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                    TotalElements={TotalElements}
                />
            </div>

            <div className={cx('modal')}>
                {showModal && (
                    <Modal
                        title="CHỈNH SỬA ĐIỂM SỐ"
                        hidden
                        edit
                        onClose={oncloseModal}
                        handleSubmitEdit={handleSubmitEdit}
                    >
                        {academicResults.map((student, index) => (
                            <div key={index} className={cx('student')}>
                                <div
                                    className={cx('student-name')}
                                >{`${student?.studentCode} - ${student?.fullName} `}</div>
                                <div>
                                    {category.map((category, index) => {
                                        const itemScore = student?.scoresResponses?.find(
                                            (stScore) => stScore.categoryId === category.id,
                                        );
                                        const numberOfInputs = (() => {
                                            switch (category.id) {
                                                case 1:
                                                    return 1;
                                                case 2:
                                                    return 3;
                                                case 3:
                                                    return 3;
                                                case 4:
                                                    return 1;
                                                default:
                                                    return 0;
                                            }
                                        })();
                                        return (
                                            <div className={cx('item-score')} key={index}>
                                                <div className={cx('score-name')}>{`${category.name} : `}</div>
                                                {[...Array(numberOfInputs)].map((_, inputIndex) => (
                                                    <input
                                                        key={inputIndex}
                                                        type="text"
                                                        defaultValue={itemScore?.scores[inputIndex]?.score}
                                                        onChange={(e) => {
                                                            const value = e.target.value;
                                                            if (value > 10 || value < 0) {
                                                                e.target.value = '';
                                                            }
                                                            handleInputChange(
                                                                student.studentId,
                                                                category.id,
                                                                itemScore?.scores[inputIndex],
                                                                value,
                                                                inputIndex,
                                                            );
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </Modal>
                )}
            </div>
        </div>
    );
}

export default Diem;
