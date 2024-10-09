import { useDispatch } from 'react-redux';
import { showErrorMessage, showWarningMessage } from '../Component/Notification/Index';
import { useNavigate } from 'react-router-dom';
import {
    //IDENTITY-SERVICE
    userLogin,
    refreshToken,

    //PROFILE-SERVICE
    getMyInFo,
    editProfile,

    //Grade
    getAllGrade,

    //SchoolYear_service
    getAllSchoolYear,
    getAllSemester,
    getSemesterNow,

    //CLassEntity
    getAllClassesByYear,
    createClass,
    editClass,
    cpyData,
    deleteClass,
    getAllByNow,
    getAllClassesByYearAndGrade,
    getClassRoomById,
    getAllClassRoomOfTeacher,
    getClassRoomNOWofStudent,
    getClassRoomByClassTeacher,

    //Subject
    getAllCombination,
    getAllSubject,

    //teacher
    getAllTeacher,
    getTeacherById,
    addTeacherExisted,
    getAllTeacherBySubjectId,
    createTeacherInSubject,
    createTeacherInSubjectFromExcel,
    editTeacherInSubject,
    deleteTeacherInSubject,
    getAllTeachersNotBySubjectId,
    getAllTeacherBySubjectIdNotPagination,

    //Student
    getAllStatuses,
    getStudentNotClassRoom,
    editStudentInClassRoom,
    getAllStudentByClassRoomId,
    createStudentInClassRoom,
    createStudentFromExcel,
    addStudentExistedInClassRoom,
    deleteStudentInClassRoom,

    //schedule
    generateSchedules,
    getAllLessons,
    saveSchedules,
    getSchedulesBySchoolYearId,
    getSchedulesOfTeacherBySchoolYearId,
    getSubjectByTeacherAndClassRoom,
    deleteSchedulesBySchoolYearId,
    editSchedules,

    //Academic
    getAllAcademicOfStudentOfClassRoom,
    getAllCategory,
    getAllConduct,
    getAllAcademicPerformance,
    createScoresOfStudent,
    getAcademicOfStudent,
    calculateMeanScoreSemester,
    calculateMeanScoreSubject,
    assessmentAcademicResults,
    getAllAcademicResults,
    //Attendance
    getAllAttendanceStatus,
    getAllSession,
    createAttendance,
    getAttendanceOfStudent,

    //Parent
    getAllParentOfStudent,

    //relationship
    getStudentIdByClassRoomId,

    //news
    getAllNews,
    getNewsById,
    deleteNews,
    deleteSection,

    //outside
    getDiaGioiHanhChinhVN,
} from './axios';
import authSlice from '../ReducerSlice/authSlice';
import classesSlice from '../ReducerSlice/classesSlice';
import teacherSlice from '../ReducerSlice/teacherSlice';
import studentSlice from '../ReducerSlice/studentSlice';
import subjectSilce from '../ReducerSlice/subjectSlice';
import teachSlice from '../ReducerSlice/teachSlice';
import schoolSlice from '../ReducerSlice/schoolYear';
import gradeSlice from '../ReducerSlice/gradeSlice';
import academicResultSlice from '../ReducerSlice/academicResultSlice';
import attendanceSlice from '../ReducerSlice/attendanceSlice';
import newsSlice from '../ReducerSlice/newsSlice';

export const useHandleDispatch = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //IDENTITY-SERVICE
    const logoutUser = () => {
        try {
            dispatch(authSlice.actions.LOGOUT_SUCCESS());
        } catch (error) {}
    };
    const loginUser = async (datalogin, setDatalogin, usernameInputRef, prevPathname) => {
        try {
            dispatch(authSlice.actions.LOGIN_REQUEST());
            const response = await userLogin(datalogin);
            if (response.data.code === 1000) {
                const profileUser = await getMyInFo(response.data.result.token);
                if (profileUser.data.code === 1000) {
                    dispatch(
                        authSlice.actions.LOGIN_SUCCESS({
                            user: profileUser.data.result,
                            token: response.data.result.token,
                        }),
                    );
                }
                const roleNames = response.data.result.user.roles.map((r) => r.name);
                if (prevPathname.startsWith('/admin')) {
                    if (roleNames.includes('ADMIN') || roleNames.includes('TEACHER') || roleNames.includes('PROCTOR')) {
                        navigate(prevPathname);
                    } else {
                        showWarningMessage('bạn không có quyền truy cập');
                        navigate('/');
                    }
                } else {
                    if (roleNames.includes('ADMIN') || roleNames.includes('TEACHER') || roleNames.includes('PROCTOR')) {
                        navigate('/admin');
                    } else {
                        navigate(prevPathname);
                    }
                }
            }
        } catch (error) {
            console.log(error);
            if (error.response.data) {
                dispatch(authSlice.actions.LOGIN_FAILURE(error.response.data.message));
                showErrorMessage(`${error.response.data.message}<br>Lý do: Mã số hoặc Password không đúng`).then(
                    (result) => {
                        if (result.isConfirmed) {
                            setDatalogin({
                                userCode: '',
                                password: '',
                            });
                            usernameInputRef.current.focus();
                        }
                    },
                );
            }
        }
    };

    const refreshtoken = async (token) => {
        try {
            const response = await refreshToken(token);
            if (response.data.code === 1000) {
                dispatch(authSlice.actions.REFESH_TOKEN(response.data.result.token));
            }
        } catch (error) {}
    };
    //profile
    const editprofile = async (token, formData) => {
        try {
            const response = await editProfile(token, formData);
            if (response?.data?.code === 1000) {
                return response.data;
            }
        } catch (error) {
            return error?.response?.data;
        }
    };

    const updateuser = async (token) => {
        try {
            const profileUser = await getMyInFo(token);
            if (profileUser?.data?.code === 1000) {
                dispatch(authSlice.actions.UPDATE_USER(profileUser.data.result));
            }
        } catch (error) {
            return error?.response?.data;
        }
    };

    //TEACHER-SERVICE
    const getteacherbyid = async (token, id) => {
        try {
            const response = await getTeacherById(token, id);
            if (response.data.code === 1000) {
                return response.data;
            }
        } catch (error) {
            return error.response.data;
        }
    };
    const getallteacher = async (token) => {
        try {
            dispatch(teacherSlice.actions.FETCH_ALL_TEACHERS_REQUEST());
            const response = await getAllTeacher(token);
            if (response.data.code === 1000) {
                dispatch(teacherSlice.actions.FETCH_ALL_TEACHERS_NOT_PAGINATION_SUCCESS(response.data.result));
            }
        } catch (error) {
            dispatch(teacherSlice.actions.FETCH_ALL_TEACHERS_FAILURE(error.response.data.message));
        }
    };
    const getallteacherbysubjectid = async (token, subjectId, currentPage, pageSize, keyword) => {
        try {
            dispatch(teacherSlice.actions.FETCH_ALL_TEACHERS_REQUEST());
            const response = await getAllTeacherBySubjectId(token, subjectId, currentPage, pageSize, keyword);
            if (response.data.code === 1000) {
                dispatch(teacherSlice.actions.FETCH_ALL_TEACHERS_SUCCESS(response.data.result));
            }
        } catch (error) {
            dispatch(teacherSlice.actions.FETCH_ALL_TEACHERS_FAILURE(error.response.data.message));
        }
    };
    const getallteacherbysubjectInNotpagination = async (token, subjectId) => {
        try {
            dispatch(teacherSlice.actions.FETCH_ALL_TEACHERS_REQUEST());
            const response = await getAllTeacherBySubjectIdNotPagination(token, subjectId);
            if (response.data.code === 1000) {
                dispatch(teacherSlice.actions.FETCH_ALL_TEACHERS_NOT_PAGINATION_SUCCESS(response.data.result));
            }
        } catch (error) {
            dispatch(teacherSlice.actions.FETCH_ALL_TEACHERS_FAILURE(error.response.data.message));
        }
    };
    const getallteachernotbysubjectid = async (token, subjectId, keyword) => {
        try {
            const response = await getAllTeachersNotBySubjectId(token, subjectId, keyword);
            if (response.data.code === 1000) {
                return response.data;
            }
        } catch (error) {
            return error.response.data;
        }
    };
    const createteacherinsubject = async (token, subjectId, data) => {
        try {
            const response = await createTeacherInSubject(token, subjectId, data);
            if (response.data.code === 1000) {
                return response.data;
            }
        } catch (error) {
            return error.response.data;
        }
    };
    const createteacherinsubjectfromexcel = async (token, subjectId, data) => {
        try {
            const response = await createTeacherInSubjectFromExcel(token, subjectId, data);
            if (response.data.code === 1000) {
                return response.data;
            }
        } catch (error) {
            return error.response.data;
        }
    };
    const addteacherexisted = async (token, subjectId, teacherId) => {
        try {
            const response = await addTeacherExisted(token, subjectId, teacherId);
            if (response.data.code === 1000) {
                return response.data;
            }
        } catch (error) {
            return error.response.data;
        }
    };
    const editteacherinsubject = async (token, teacherId, data) => {
        try {
            const response = await editTeacherInSubject(token, teacherId, data);
            if (response.data.code === 1000) {
                return response.data;
            }
        } catch (error) {
            return error.response.data;
        }
    };
    const deleteteacherinsubject = async (token, subjectId, dataDel) => {
        try {
            const response = await deleteTeacherInSubject(token, subjectId, dataDel);
            if (response.data.code === 1000) {
                return response.data;
            }
        } catch (error) {
            return error.response.data;
        }
    };
    //STUDENT-SERVICE
    const getallstatus = async (token) => {
        try {
            dispatch(studentSlice.actions.GET_STUDENTS_LOADING());
            const response = await getAllStatuses(token);
            if (response.data.code === 1000) {
                dispatch(studentSlice.actions.GET_STATUS_SUCCESS(response.data.result));
            }
        } catch (error) {
            dispatch(studentSlice.actions.GET_STUDENTS_FAILURE(error.response.data.message));
        }
    };

    const getallstudentbyclassroomid = async (token, classRoomId, currentPage, pageSize, keyword) => {
        try {
            dispatch(studentSlice.actions.GET_STUDENTS_LOADING());
            const response = await getAllStudentByClassRoomId(token, classRoomId, currentPage, pageSize, keyword);
            if (response.data.code === 1000) {
                dispatch(studentSlice.actions.GET_STUDENTS_SUCCESS(response.data.result));
            }
        } catch (error) {
            dispatch(studentSlice.actions.GET_STUDENTS_FAILURE(error.response.data.message));
        }
    };

    const getstudentnotclassroom = async (token) => {
        try {
            const response = await getStudentNotClassRoom(token);
            if (response.data.code === 1000) {
                return response.data;
            }
        } catch (error) {
            return error.response.data;
        }
    };

    const createstudentinclassroom = async (token, classRoomId, data) => {
        try {
            const response = await createStudentInClassRoom(token, classRoomId, data);
            if (response.data.code === 1000) {
                return response.data;
            }
        } catch (error) {
            return error.response.data;
        }
    };
    const addstudentexistedinclassroom = async (token, studentId, classRoomId) => {
        try {
            const response = await addStudentExistedInClassRoom(token, studentId, classRoomId);
            if (response.data.code === 1000) {
                return response.data;
            }
        } catch (error) {
            return error.response.data;
        }
    };
    const createstudentfromexcel = async (token, classRoomId, data) => {
        try {
            const response = await createStudentFromExcel(token, classRoomId, data);
            if (response.data.code === 1000) {
                return response.data;
            }
        } catch (error) {
            return error.response.data;
        }
    };
    const editstudentinclassroom = async (token, studentId, data) => {
        try {
            const response = await editStudentInClassRoom(token, studentId, data);
            if (response.data.code === 1000) {
                return response.data;
            }
        } catch (error) {
            return error.response.data;
        }
    };
    const deletestudent = async (token, classRoomId, dataDel) => {
        try {
            const response = await deleteStudentInClassRoom(token, classRoomId, dataDel);
            if (response.data.code === 1000) {
                return response.data;
            }
        } catch (error) {
            return error.response.data;
        }
    };

    //SCHOOLYEAR-SERVICE
    const getallschoolyear = async (keyWord = '') => {
        try {
            dispatch(schoolSlice.actions.FETCH_ALL_SchoolYears_REQUEST());
            const response = await getAllSchoolYear(keyWord);
            if (response.data.code === 1000) {
                dispatch(schoolSlice.actions.FETCH_ALL_SchoolYears_SUCCESS(response.data.result));
            }
        } catch (error) {
            dispatch(schoolSlice.actions.FETCH_ALL_SchoolYears_FAILURE(error.response.data.message));
        }
    };
    const getallsemester = async (token) => {
        try {
            dispatch(schoolSlice.actions.FETCH_ALL_SchoolYears_REQUEST());
            const response = await getAllSemester(token);
            if (response.data.code === 1000) {
                dispatch(schoolSlice.actions.FETCH_ALL_Semesters_SUCCESS(response.data.result));
            }
        } catch (error) {
            dispatch(schoolSlice.actions.FETCH_ALL_SchoolYears_FAILURE(error.response.data.message));
        }
    };
    const getsemesterNow = async (token) => {
        try {
            const response = await getSemesterNow(token);
            if (response.data.code === 1000) {
                return response.data;
            }
        } catch (error) {
            return error.response.data;
        }
    };

    //CLASSROOM-SERVICE
    const getclassroombyid = async (token, classRoomId) => {
        try {
            dispatch(classesSlice.actions.FETCH_ALL_CLASSES_REQUEST());
            const response = await getClassRoomById(token, classRoomId);
            if (response.data.code === 1000) {
                dispatch(classesSlice.actions.FETCH_ALL_CLASSES_NOT_PAGINATION_SUCCESS(response.data.result));
            }
        } catch (error) {
            dispatch(classesSlice.actions.FETCH_ALL_CLASSES_FAILURE(error.response.data.message));
        }
    };
    const getallByNow = async (schoolYearId) => {
        try {
            dispatch(classesSlice.actions.FETCH_ALL_CLASSES_REQUEST());
            const response = await getAllByNow(schoolYearId);
            if (response.data.code === 1000) {
                dispatch(classesSlice.actions.FETCH_ALL_CLASSES_NOT_PAGINATION_SUCCESS(response.data.result));
            }
        } catch (error) {
            dispatch(classesSlice.actions.FETCH_ALL_CLASSES_FAILURE(error.response.data.message));
        }
    };
    const getclassRoomByClassTeacher = async (token, classRoomId, schoolYearId) => {
        try {
            const response = await getClassRoomByClassTeacher(token, classRoomId, schoolYearId);
            if (response.data.code === 1000) {
                return response.data;
            }
        } catch (error) {
            return error.response.data;
        }
    };
    const getclassRoomNOWofStudent = async (token, studentId, schoolYearId) => {
        try {
            const response = await getClassRoomNOWofStudent(token, studentId, schoolYearId);
            if (response.data.code === 1000) {
                return response.data;
            }
        } catch (error) {
            return error.response.data;
        }
    };
    const getallgrade = async (token) => {
        try {
            dispatch(gradeSlice.actions.FETCH_ALL_GRADES_REQUEST());
            const response = await getAllGrade(token);
            if (response.data.code === 1000) {
                dispatch(gradeSlice.actions.FETCH_ALL_GRADES_SUCCESS(response.data.result));
            }
        } catch (error) {
            dispatch(gradeSlice.actions.FETCH_ALL_GRADES_FAILURE(error.message));
        }
    };
    const getallclassesbyyear = async (token, yearId, currentPage, pagesize, keyWord) => {
        try {
            dispatch(classesSlice.actions.FETCH_ALL_CLASSES_REQUEST());
            const response = await getAllClassesByYear(token, yearId, currentPage, pagesize, keyWord);
            if (response.data.code === 1000) {
                dispatch(classesSlice.actions.FETCH_ALL_CLASSES_SUCCESS(response.data.result));
            }
        } catch (error) {
            dispatch(classesSlice.actions.FETCH_ALL_CLASSES_FAILURE(error.response.data.message));
        }
    };
    const getallclassesbyyearandgrade = async (token, yearid, gradeId, keyWord) => {
        try {
            dispatch(classesSlice.actions.FETCH_ALL_CLASSES_REQUEST());
            const response = await getAllClassesByYearAndGrade(token, yearid, gradeId, keyWord);
            if (response.data.code === 1000) {
                dispatch(classesSlice.actions.FETCH_ALL_CLASSES_NOT_PAGINATION_SUCCESS(response.data.result));
            }
        } catch (error) {
            dispatch(classesSlice.actions.FETCH_ALL_CLASSES_FAILURE(error.response.data.message));
        }
    };

    const getallclassroomOfteacher = async (token, teacherId, schoolYearId, gradeId) => {
        try {
            dispatch(classesSlice.actions.FETCH_ALL_CLASSES_REQUEST());
            const response = await getAllClassRoomOfTeacher(token, teacherId, schoolYearId, gradeId);
            if (response.data.code === 1000) {
                dispatch(classesSlice.actions.FETCH_ALL_CLASSES_NOT_PAGINATION_SUCCESS(response.data.result));
            }
        } catch (error) {
            dispatch(classesSlice.actions.FETCH_ALL_CLASSES_FAILURE(error.response.data.message));
        }
    };

    const createclass = async (token, dataAdd) => {
        try {
            const response = await createClass(token, dataAdd);
            if (response.data.code === 1000) {
                return response.data;
            }
        } catch (error) {
            return error.response.data;
        }
    };
    const editclass = async (token, dataEdit) => {
        try {
            const response = await editClass(token, dataEdit);
            if (response.data.code === 1000) {
                return response.data;
            }
        } catch (error) {
            return error.response.data;
        }
    };
    const deleteclass = async (token, dataDel) => {
        try {
            const response = await deleteClass(token, dataDel);
            if (response.data.code === 1000) {
                return response.data;
            }
        } catch (error) {
            return error.response.data;
        }
    };

    const cpydata = async (token, schoolYearId) => {
        try {
            const response = await cpyData(token, schoolYearId);
            if (response.data.code === 1000) {
                return response.data;
            }
        } catch (error) {
            return error.response.data;
        }
    };
    //SUBJECT-SERVICE
    const getallcombination = async (token) => {
        try {
            dispatch(subjectSilce.actions.GET_ALL_COMBINATION_REQUEST());
            const response = await getAllCombination(token);
            if (response.data.code === 1000) {
                dispatch(subjectSilce.actions.GET_ALL_COMBINATION_SUCCESS(response.data.result));
            }
        } catch (error) {
            dispatch(subjectSilce.actions.GET_ALL_COMBINATION_FAILURE(error.message));
        }
    };
    const getallsubject = async (token, keyword) => {
        try {
            dispatch(subjectSilce.actions.GET_ALL_SUBJECT_REQUEST());
            const response = await getAllSubject(token, keyword);
            if (response.data.code === 1000) {
                dispatch(subjectSilce.actions.GET_ALL_SUBJECT_SUCCESS(response.data.result));
            }
        } catch (error) {
            dispatch(subjectSilce.actions.GET_ALL_SUBJECT_FAILURE(error.message));
        }
    };
    //TEACH-SERVICE
    const generateschedules = async (token, schoolYearId) => {
        try {
            const response = await generateSchedules(token, schoolYearId);
            if (response.data.code === 1000) {
                return response.data;
            }
        } catch (error) {
            return error.response.data;
        }
    };
    const getschedulesbySchoolYearId = async (token, schoolYearId) => {
        try {
            dispatch(teachSlice.actions.FETCH_TEACHS_REQUEST());
            const response = await getSchedulesBySchoolYearId(token, schoolYearId);
            if (response.data.code === 1000) {
                dispatch(teachSlice.actions.FETCH_TEACHS_SUCCESS(response.data.result));
            }
        } catch (error) {
            dispatch(teachSlice.actions.FETCH_TEACHS_SUCCESS(error.response.data.message));
        }
    };

    const getsubjectByTeacherAndClassRoom = async (token, teacherId, classRoomId) => {
        try {
            const response = await getSubjectByTeacherAndClassRoom(token, teacherId, classRoomId);
            if (response.data.code === 1000) {
                return response.data;
            }
        } catch (error) {
            return error.response.data;
        }
    };

    const getschedulesofteacherbySchoolYearId = async (token, teacherId, schoolYearId) => {
        try {
            const response = await getSchedulesOfTeacherBySchoolYearId(token, teacherId, schoolYearId);
            if (response.data.code === 1000) {
                return response.data;
            }
        } catch (error) {
            return error.response.data;
        }
    };

    const deleteschedulesbySchoolYearId = async (token, schoolYearId) => {
        try {
            const response = await deleteSchedulesBySchoolYearId(token, schoolYearId);
            if (response.data.code === 1000) {
                return response.data;
            }
        } catch (error) {
            return error.response.data;
        }
    };
    const saveschedules = async (token, data) => {
        try {
            const response = await saveSchedules(token, data);
            if (response.data.code === 1000) {
                return response.data;
            }
        } catch (error) {
            return error.response.data;
        }
    };
    const editschedules = async (token, data) => {
        try {
            const response = await editSchedules(token, data);
            if (response.data.code === 1000) {
                return response.data;
            }
        } catch (error) {
            return error.response.data;
        }
    };
    const getalllesssons = async (token) => {
        try {
            const response = await getAllLessons(token);
            if (response.data.code === 1000) {
                dispatch(teachSlice.actions.FETCH_LESSONS_SUCCESS(response.data.result));
            }
        } catch (error) {
            dispatch(teachSlice.actions.FETCH_LESSONS_FAILURE(error.message));
        }
    };

    //Academic

    const getallAcademicResults = async (token, classRoomId, semesterId) => {
        try {
            const response = await getAllAcademicResults(token, classRoomId, semesterId);
            if (response.data.code === 1000) {
                return response.data;
            }
        } catch (error) {
            return error.response.data;
        }
    };

    const getallAcademicOfStudentOfClassRoom = async (
        token,
        classRoomId,
        semesterId,
        subjectId,
        currentPage,
        pageSize,
        keyword,
    ) => {
        try {
            dispatch(academicResultSlice.actions.FETCH_academicResults_REQUEST());
            const response = await getAllAcademicOfStudentOfClassRoom(
                token,
                classRoomId,
                semesterId,
                subjectId,
                currentPage,
                pageSize,
                keyword,
            );
            if (response.data.code === 1000) {
                dispatch(academicResultSlice.actions.FETCH_academicResults_SUCCESS(response.data.result));
            }
        } catch (error) {
            dispatch(academicResultSlice.actions.FETCH_academicResults_FAILURE(error.response.data.message));
        }
    };

    const getallAcademicOfStudentOfClassRoomNoPagination = async (
        token,
        classRoomId,
        semesterId,
        currentPage,
        subjectId,
        keyword,
    ) => {
        try {
            const response = await getAllAcademicOfStudentOfClassRoom(
                token,
                classRoomId,
                semesterId,
                subjectId,
                currentPage,
                '',
                keyword,
            );
            if (response.data.code === 1000) {
                return response.data;
            }
        } catch (error) {
            return error.response.data.message;
        }
    };

    const getacademicOfStudent = async (token, studentId, classRoomId, semesterId) => {
        try {
            const response = await getAcademicOfStudent(token, studentId, classRoomId, semesterId);
            if (response.data.code === 1000) {
                return response.data;
            }
        } catch (error) {
            return error.response.data;
        }
    };

    const getallCategory = async (token) => {
        try {
            dispatch(academicResultSlice.actions.FETCH_academicResults_REQUEST());
            const response = await getAllCategory(token);
            if (response.data.code === 1000) {
                dispatch(academicResultSlice.actions.FETCH_category_SUCCESS(response.data.result));
            }
        } catch (error) {
            dispatch(academicResultSlice.actions.FETCH_academicResults_FAILURE(error.response.data.message));
        }
    };

    const getallConduct = async (token) => {
        try {
            dispatch(academicResultSlice.actions.FETCH_academicResults_REQUEST());
            const response = await getAllConduct(token);
            if (response.data.code === 1000) {
                dispatch(academicResultSlice.actions.FETCH_conduct_SUCCESS(response.data.result));
            }
        } catch (error) {
            dispatch(academicResultSlice.actions.FETCH_academicResults_FAILURE(error.response.data.message));
        }
    };
    const getallAcademicPerformance = async (token) => {
        try {
            dispatch(academicResultSlice.actions.FETCH_academicResults_REQUEST());
            const response = await getAllAcademicPerformance(token);
            if (response.data.code === 1000) {
                dispatch(academicResultSlice.actions.FETCH_AcademicPerformance_SUCCESS(response.data.result));
            }
        } catch (error) {
            dispatch(academicResultSlice.actions.FETCH_academicResults_FAILURE(error.response.data.message));
        }
    };

    const createscoresOfStudent = async (token, teacherId, data) => {
        try {
            const response = await createScoresOfStudent(token, teacherId, data);
            if (response.data.code === 1000) {
                return response.data;
            }
        } catch (error) {
            return error.response.data;
        }
    };

    const calculateMeanScoreOfSubject = async (token, studentId, classRoomId, semesterId, subjectId) => {
        try {
            const response = await calculateMeanScoreSubject(token, studentId, classRoomId, semesterId, subjectId);
            if (response.data.code === 1000) {
                return response.data;
            }
        } catch (error) {
            return error.response.data;
        }
    };
    const calculateMeanScoreOfSemester = async (token, studentId, classRoomId, semesterId) => {
        try {
            const response = await calculateMeanScoreSemester(token, studentId, classRoomId, semesterId);
            if (response.data.code === 1000) {
                return response.data;
            }
        } catch (error) {
            return error.response.data;
        }
    };

    const assessmentacademicResults = async (token, data) => {
        try {
            const response = await assessmentAcademicResults(token, data);
            if (response.data.code === 1000) {
                return response.data;
            }
        } catch (error) {
            return error.response.data;
        }
    };

    //ATTENDANCE-SERVICE
    const getallAttendanceStatus = async (token) => {
        try {
            dispatch(attendanceSlice.actions.FETCH_REQUEST());
            const response = await getAllAttendanceStatus(token);
            if (response?.data?.code === 1000) {
                dispatch(attendanceSlice.actions.FETCH_attendanceStatus_SUCCESS(response?.data?.result));
            }
        } catch (error) {
            dispatch(attendanceSlice.actions.FETCH_FAILURE(error?.response?.data?.message));
        }
    };
    const getallSession = async (token) => {
        try {
            dispatch(attendanceSlice.actions.FETCH_REQUEST());
            const response = await getAllSession(token);
            if (response?.data?.code === 1000) {
                dispatch(attendanceSlice.actions.FETCH_session_SUCCESS(response?.data?.result));
            }
        } catch (error) {
            dispatch(attendanceSlice.actions.FETCH_FAILURE(error?.response?.data?.message));
        }
    };

    const getattendanceOfStudent = async (token, studentId, classRoomId, semesterId) => {
        try {
            const response = await getAttendanceOfStudent(token, studentId, classRoomId, semesterId);
            if (response?.data?.code === 1000) {
                return response?.data;
            }
        } catch (error) {
            return error?.response?.data;
        }
    };

    const createattendance = async (token, classRoomId, semesterId, data) => {
        try {
            const response = await createAttendance(token, classRoomId, semesterId, data);
            if (response?.data?.code === 1000) {
                return response?.data;
            }
        } catch (error) {
            return error?.response?.data;
        }
    };
    //Parent
    const getallParentOfStudent = async (token, studentId) => {
        try {
            const response = await getAllParentOfStudent(token, studentId);
            if (response?.data?.code === 1000) {
                return response?.data;
            }
        } catch (error) {
            return error?.response?.data;
        }
    };

    //relationship
    const getstudentIdByClassRoomId = async (classRoomId) => {
        try {
            const response = await getStudentIdByClassRoomId(classRoomId);
            if (response?.data?.code === 1000) {
                return response?.data;
            }
        } catch (error) {
            return error?.response?.data;
        }
    };
    //news
    const getallnews = async (currentPage, pagesize) => {
        try {
            dispatch(newsSlice.actions.FETCH_ALL_NEWS_REQUEST());
            const response = await getAllNews(currentPage, pagesize);
            if (response?.data?.code === 1000) {
                dispatch(newsSlice.actions.FETCH_ALL_NEWS_SUCCESS(response.data.result));
            }
        } catch (error) {
            dispatch(newsSlice.actions.FETCH_ALL_NEWS_FAILURE(error.response.data.message));
        }
    };
    const getnewsById = async (id) => {
        try {
            const response = await getNewsById(id);
            if (response?.data?.code === 1000) {
                return response?.data;
            }
        } catch (error) {
            return error?.response?.data;
        }
    };
    const deletenews = async (token, newsIds) => {
        try {
            const response = await deleteNews(token, newsIds);
            if (response?.data?.code === 1000) {
                return response.data;
            }
        } catch (error) {
            return error?.response?.data;
        }
    };
    const deletesection = async (token, sectionId) => {
        try {
            const response = await deleteSection(token, sectionId);
            if (response?.data?.code === 1000) {
                return response.data;
            }
        } catch (error) {
            return error?.response?.data;
        }
    };

    //outside
    const getdiaGioiHanhChinhVN = async () => {
        try {
            const response = await getDiaGioiHanhChinhVN();
            return response;
        } catch (error) {
            return error?.response;
        }
    };
    return {
        //User
        logoutUser,
        loginUser,
        refreshtoken,
        getteacherbyid,
        getallteacher,
        getallteacherbysubjectid,
        getallteachernotbysubjectid,
        createteacherinsubject,
        createteacherinsubjectfromexcel,
        addteacherexisted,
        editteacherinsubject,
        deleteteacherinsubject,
        getallstudentbyclassroomid,
        getstudentnotclassroom,
        createstudentinclassroom,
        createstudentfromexcel,
        addstudentexistedinclassroom,
        getallstatus,
        editstudentinclassroom,
        deletestudent,
        getallteacherbysubjectInNotpagination,

        //profile
        editprofile,
        updateuser,

        //SchoolYear
        getallschoolyear,
        getallsemester,
        getsemesterNow,

        //ClassEntity
        getclassroombyid,
        getallByNow,
        getclassRoomNOWofStudent,
        getallclassesbyyear,
        getallclassesbyyearandgrade,
        getallclassroomOfteacher,
        createclass,
        deleteclass,
        editclass,
        cpydata,
        getclassRoomByClassTeacher,

        //subject
        getallcombination,
        getallsubject,

        //Grade
        getallgrade,

        //teach
        generateschedules,
        getschedulesbySchoolYearId,
        deleteschedulesbySchoolYearId,
        getschedulesofteacherbySchoolYearId,
        getsubjectByTeacherAndClassRoom,
        saveschedules,
        editschedules,
        getalllesssons,

        //academic
        getallAcademicOfStudentOfClassRoom,
        getallAcademicOfStudentOfClassRoomNoPagination,
        getallCategory,
        getallConduct,
        getallAcademicPerformance,
        createscoresOfStudent,
        getacademicOfStudent,
        calculateMeanScoreOfSubject,
        calculateMeanScoreOfSemester,
        assessmentacademicResults,
        getallAcademicResults,

        //attendance
        getallAttendanceStatus,
        getallSession,
        createattendance,
        getattendanceOfStudent,

        //parent
        getallParentOfStudent,

        //relationship
        getstudentIdByClassRoomId,

        //news
        getallnews,
        getnewsById,
        deletenews,
        deletesection,

        //out
        getdiaGioiHanhChinhVN,
    };
};
