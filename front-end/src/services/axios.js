import axios from 'axios';

const API_BASE_URL = 'http://localhost:8888/api/v1';

//IDENTITY-SERVICE
export const userLogin = (dataLogin) => {
    return axios.post(API_BASE_URL + '/identity/pl/auth/login', dataLogin);
};

export const refreshToken = (tokenold) => {
    return axios.post(API_BASE_URL + '/identity/pl/auth/refresh', { token: tokenold });
};

//PROFILE-SERVICE
export const getMyInFo = (token) => {
    return axios.get(API_BASE_URL + '/profile/pl/getMyInFo', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const editProfile = (token, formData) => {
    return axios.put(API_BASE_URL + '/profile/pl/editProfile', formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        },
    });
};

//SCHOOLYEAR_SEMESTER-SERVICE
export const getAllSchoolYear = (keyword) => {
    return axios.get(API_BASE_URL + `/year&semester/pl/schoolYear/getAll?keyword=${keyword}`);
};

export const getAllSemester = (token) => {
    return axios.get(API_BASE_URL + `/year&semester/pl/semester/getAll`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getSemesterNow = (token) => {
    return axios.get(API_BASE_URL + `/year&semester/pl/semester/getSemesterNow`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

//CLASSROOM-SERVICE
export const getClassRoomById = (token, classRoomId) => {
    return axios.get(API_BASE_URL + `/classRoom/pl/getById/${classRoomId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
export const getAllByNow = (schoolYearId) => {
    return axios.get(API_BASE_URL + `/classRoom/pl/getAllByNow?schoolYearId=${schoolYearId}`);
};

export const getClassRoomByClassTeacher = (token, classTeacherId, schoolYearId) => {
    return axios.get(
        API_BASE_URL +
            `/classRoom/pl/getClassRoomByClassTeacher?classTeacherId=${classTeacherId}&schoolYearId=${schoolYearId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );
};

export const getClassRoomNOWofStudent = (token, studentId, schoolYearId) => {
    return axios.get(
        API_BASE_URL + `/classRoom/pl/getClassRoomNOWofStudent?studentId=${studentId}&schoolYearId=${schoolYearId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );
};

export const getAllGrade = (token) => {
    return axios.get(API_BASE_URL + '/classRoom/pl/grade/getAll', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getAllClassesByYear = (token, yearId, currentPage, pagesize, keyWord) => {
    return axios.get(
        API_BASE_URL +
            `/classRoom/pl/getAllBySchoolYear?schoolYearId=${
                yearId ? yearId : -1
            }&page=${currentPage}&pageSize=${pagesize}&keyword=${keyWord}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );
};
export const getAllClassesBySchoolYearNotPagination = (token, yearId) => {
    return axios.get(API_BASE_URL + `/classRoom/pl/getAllBySchoolYearNotPagination?schoolYearId=${yearId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
export const getAllClassesByYearAndGrade = (token, yearId, gradeId, keyWord) => {
    return axios.get(
        API_BASE_URL +
            `/classRoom/pl/getAllBySchoolYearAndGrade?schoolYearId=${yearId}&gradeId=${gradeId}&keyword=${keyWord}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );
};

export const getAllClassRoomOfTeacher = (token, teacherId, schoolYearId, gradeId) => {
    return axios.get(
        API_BASE_URL +
            `/classRoom/pl/getAllClassRoomOfTeacher?teacherId=${teacherId}&schoolYearId=${
                schoolYearId ? schoolYearId : -1
            }&gradeId=${gradeId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );
};

export const createClass = (token, dataAdd) => {
    return axios.post(
        API_BASE_URL + `/classRoom/pl/createClass?schoolYearId=${dataAdd.schoolYearId}&gradeId=${dataAdd.gradeId}`,
        { name: dataAdd.name, teacherId: dataAdd.teacherId, combinationId: dataAdd.combinationId },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );
};

export const deleteClass = (token, dataDel) => {
    return axios.delete(API_BASE_URL + `/classRoom/pl/deleteClass`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: { arrId: dataDel },
    });
};

export const editClass = (token, dataEdit) => {
    return axios.put(
        API_BASE_URL +
            `/classRoom/pl/editClass/${dataEdit.id}?schoolYearId=${dataEdit.schoolYearId}&gradeId=${dataEdit.gradeId}`,
        { name: dataEdit.name, teacherId: dataEdit.teacherId, combinationId: dataEdit.combinationId },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );
};

export const cpyData = (token, schoolYearId) => {
    return axios.post(
        API_BASE_URL + `/classRoom/pl/cpyData?schoolYearId=${schoolYearId}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );
};

//SUBJECT-SERVICE
export const getAllCombination = (token) => {
    return axios.get(API_BASE_URL + '/subject/pl/combination/getAll', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
export const getAllSubject = (token, keyword) => {
    return axios.get(API_BASE_URL + `/subject/pl/subject/getAll?keyword=${keyword ? keyword : ''}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

//TEACHER-SERVICE
export const getTeacherById = (token, id) => {
    return axios.get(API_BASE_URL + `/teacher/pl/getTeacherById/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
export const getAllTeacher = (token) => {
    return axios.get(API_BASE_URL + `/teacher/pl/getAllTeacher`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getAllTeacherBySubjectId = (token, subjectId, currentPage, pageSize, keyword) => {
    return axios.get(
        API_BASE_URL +
            `/teacher/pl/getAllTeacherBySubjectId?subjectId=${
                subjectId ? subjectId : -1
            }&page=${currentPage}&pageSize=${pageSize}&keyword=${keyword}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );
};
export const getAllTeacherBySubjectIdNotPagination = (token, subjectId) => {
    return axios.get(API_BASE_URL + `/teacher/pl/getAllTeacherBySubjectIdNotPagination?subjectId=${subjectId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
export const getAllTeachersNotBySubjectId = (token, subjectId, keyword) => {
    return axios.get(
        API_BASE_URL +
            `/teacher/pl/getTeachersNotBySubjectId?subjectId=${subjectId ? subjectId : -1}&keyword=${keyword}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );
};
export const createTeacherInSubject = (token, subjectId, data) => {
    return axios.post(API_BASE_URL + `/teacher/pl/createTeacher?subjectId=${subjectId}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
export const createTeacherInSubjectFromExcel = (token, subjectId, data) => {
    return axios.post(API_BASE_URL + `/teacher/pl/createTeacherFromExcel?subjectId=${subjectId}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const addTeacherExisted = (token, subjectId, teacherId) => {
    return axios.post(
        API_BASE_URL + `/teacher/pl/addTeacherExisted?subjectId=${subjectId}&teacherId=${teacherId}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );
};

export const editTeacherInSubject = (token, teacherId, data) => {
    return axios.put(API_BASE_URL + `/teacher/pl/editTeacher/${teacherId}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const deleteTeacherInSubject = (token, subjectId, dataDel) => {
    return axios.delete(API_BASE_URL + `/teacher/pl/deleteTeacher?subjectId=${subjectId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: { arrId: dataDel },
    });
};
//STUDENT-SERVICE
export const getAllStatuses = (token) => {
    return axios.get(API_BASE_URL + `/student/pl/getAllStatuses`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
export const getAllStudentByClassRoomId = (token, classRoomId, currentPage, pageSize, keyword) => {
    return axios.get(
        API_BASE_URL +
            `/student/pl/getStudentByClassRoom?classRoomId=${classRoomId}&page=${currentPage}&pageSize=${pageSize}&keyword=${keyword}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );
};
export const getStudentNotClassRoom = (token) => {
    return axios.get(API_BASE_URL + `/student/pl/getStudentNotClassRoom`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const createStudentInClassRoom = (token, classRoomId, data) => {
    return axios.post(API_BASE_URL + `/student/pl/createStudent?classRoomId=${classRoomId}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
export const addStudentExistedInClassRoom = (token, studentId, classRoomId) => {
    return axios.post(
        API_BASE_URL + `/student/pl/addStudentExisted?classRoomId=${classRoomId}&studentId=${studentId}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );
};

export const createStudentFromExcel = (token, classRoomId, data) => {
    return axios.post(API_BASE_URL + `/student/pl/createStudentFromExcel?classRoomId=${classRoomId}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const editStudentInClassRoom = (token, studentId, data) => {
    return axios.put(API_BASE_URL + `/student/pl/editStudent/${studentId}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const deleteStudentInClassRoom = (token, classRoomId, dataDel) => {
    return axios.delete(API_BASE_URL + `/student/pl/deleteStudent?classRoomId=${classRoomId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: { arrId: dataDel },
    });
};

//SCHEDULE - SERVICE
export const generateSchedules = (token, schoolYearId) => {
    return axios.get(API_BASE_URL + `/schedule/pl/teach/generateSchedules?schoolYearId=${schoolYearId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
export const getSchedulesBySchoolYearId = (token, schoolYearId) => {
    return axios.get(API_BASE_URL + `/schedule/pl/teach/getSchedulesBySchoolYearId/${schoolYearId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
export const getSubjectByTeacherAndClassRoom = (token, teacherId, classRoomId) => {
    return axios.get(
        API_BASE_URL +
            `/schedule/pl/teach/getSubjectByTeacherAndClassRoom?teacherId=${teacherId}&classRoomId=${classRoomId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );
};
export const getSchedulesOfTeacherBySchoolYearId = (token, teacherId, schoolYearId) => {
    return axios.get(
        API_BASE_URL +
            `/schedule/pl/teach/getSchedulesOfTeacherBySchoolYearId?teacherId=${teacherId}&schoolYearId=${schoolYearId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );
};
export const deleteSchedulesBySchoolYearId = (token, schoolYearId) => {
    return axios.delete(API_BASE_URL + `/schedule/pl/teach/deleteSchedulesBySchoolYearId/${schoolYearId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: {},
    });
};
export const saveSchedules = (token, data) => {
    return axios.post(API_BASE_URL + `/schedule/pl/teach/saveSchedules`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
export const editSchedules = (token, data) => {
    return axios.put(API_BASE_URL + `/schedule/pl/teach/EditSchedules`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
export const getAllLessons = (token) => {
    return axios.get(API_BASE_URL + `/schedule/pl/lesson/getAll`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

//ACADEMICRESULT-SERVICE

export const getAllAcademicResults = (token, classRoomId, semesterId) => {
    return axios.get(
        API_BASE_URL + `/academicResult/pl/getAll?classRoomId=${classRoomId || ''}&semesterId=${semesterId || ''}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );
};

export const getAllAcademicOfStudentOfClassRoom = (
    token,
    classRoomId,
    semesterId,
    subjectId,
    currentPage,
    pageSize,
    keyword,
) => {
    return axios.get(
        API_BASE_URL +
            `/academicResult/pl/getAllAcademicOfStudentOfClassRoom?classRoomId=${classRoomId}&semesterId=${semesterId}&subjectId=${subjectId}&page=${currentPage}&pageSize=${pageSize}&keyword=${keyword}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );
};

export const getAcademicOfStudent = (token, studentId, classRoomId, semesterId) => {
    return axios.get(
        API_BASE_URL +
            `/academicResult/pl/getAcademicOfStudent?studentId=${studentId}&classRoomId=${classRoomId}&semesterId=${semesterId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );
};

export const getAllCategory = (token) => {
    return axios.get(API_BASE_URL + `/academicResult/pl/category/getAll`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getAllConduct = (token) => {
    return axios.get(API_BASE_URL + `/academicResult/pl/conduct/getAll`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getAllAcademicPerformance = (token) => {
    return axios.get(API_BASE_URL + `/academicResult/pl/academicPerformance/getAll`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const createScoresOfStudent = (token, teacherId, data) => {
    return axios.post(API_BASE_URL + `/academicResult/pl/createScoresOfStudent?teacherId=${teacherId}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
export const calculateMeanScoreSubject = (token, studentId, classRoomId, semesterId, subjectId) => {
    return axios.get(
        API_BASE_URL +
            `/academicResult/pl/calculateMeanScoreSubject?studentId=${studentId}&classRoomId=${classRoomId}&semesterId=${semesterId}&subjectId=${subjectId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );
};

export const calculateMeanScoreSemester = (token, studentId, classRoomId, semesterId) => {
    return axios.get(
        API_BASE_URL +
            `/academicResult/pl/calculateMeanScoreSemester?studentId=${studentId}&classRoomId=${classRoomId}&semesterId=${semesterId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );
};
export const assessmentAcademicResults = (token, data) => {
    return axios.post(API_BASE_URL + `/academicResult/pl/assessment`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

//Attendance-Service
export const getAllAttendanceStatus = (token) => {
    return axios.get(API_BASE_URL + `/attendance/pl/status/getAll`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getAllSession = (token) => {
    return axios.get(API_BASE_URL + `/attendance/pl/session/getAll`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const getAttendanceOfStudent = (token, studentId, classRoomId, semesterId) => {
    return axios.get(
        API_BASE_URL +
            `/attendance/pl/attendance/getAttendanceOfStudent?studentId=${studentId}&classRoomId=${classRoomId}&semesterId=${semesterId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );
};

export const createAttendance = (token, classRoomId, semesterId, data) => {
    return axios.post(
        API_BASE_URL + `/attendance/pl/attendance/createAttendance?classRoomId=${classRoomId}&semesterId=${semesterId}`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );
};
//PARENT-SERVICE
export const getAllParentOfStudent = (token, studentId) => {
    return axios.get(API_BASE_URL + `/parent/pl/getAllParentOfStudent?studentId=${studentId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

//RELATIONSHIP-SERVICE
export const getStudentIdByClassRoomId = (classRoomId) => {
    return axios.get(
        API_BASE_URL + `/relationship/pl/studentClassRoom/getStudentIdByClassRoomId?classRoomId=${classRoomId}`,
    );
};

//NEWS-SERVICE
export const getAllNews = (page, pageSize) => {
    return axios.get(API_BASE_URL + `/news/pl/news?page=${page}&pageSize=${pageSize}`);
};
export const getNewsById = (id) => {
    return axios.get(API_BASE_URL + `/news/pl/news/${id}`);
};

export const deleteNews = (token, newsIds) => {
    return axios.delete(API_BASE_URL + `/news/pl/news/delete`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: { newsIds: newsIds },
    });
};

export const deleteSection = (token, sectionId) => {
    return axios.delete(API_BASE_URL + `/news/pl/contentSection/deleteById/${sectionId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

//outside
export const getDiaGioiHanhChinhVN = () => {
    return axios.get('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json');
};
