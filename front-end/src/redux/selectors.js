//IDENTITY
export const authLoading = (state) => state.auth.loading;
export const authUser = (state) => state.auth.user;
export const userToken = (state) => state.auth.token;

//CLASS
export const Grades = (state) => state.grade.grades;
export const classLoading = (state) => state.class.classLoading;
export const Classes = (state) => state.class.classes;
export const totalElementsClass = (state) => state.class.totalElements;

//SCHOOLYEAR
export const schoolYears = (state) => state.schoolYear.SchoolYears;
export const semesters = (state) => state.schoolYear.Semesters;

//TEACHER
export const Teachers = (state) => state.teacher.teachers;
export const TeachersLoading = (state) => state.teacher.loading;
export const totalElementsTeacher = (state) => state.teacher.totalElements;

//STUDENT
export const Students = (state) => state.student.students;
export const StudentsLoading = (state) => state.student.loading;
export const Statuses = (state) => state.student.status;
export const totalElementsStudent = (state) => state.student.totalElements;
export const totalPagesStudent = (state) => state.student.totalPages;

//AcademicResult
export const AcademicResults = (state) => state.academicResult.academicResults;
export const Category = (state) => state.academicResult.category;
export const Conduct = (state) => state.academicResult.conduct;
export const AcademicPerformance = (state) => state.academicResult.academicPerformance;
export const AcademicResultsLoading = (state) => state.academicResult.Loading;
export const totalElementsAcademicResults = (state) => state.academicResult.totalElements;

//SUBJECT
export const Subjects = (state) => state.subject.subjects;
export const Combination = (state) => state.subject.combination;

//TEACH
export const Teachs = (state) => state.teach.teachs;
export const TeachLoading = (state) => state.teach.teachLoading;
export const Lessons = (state) => state.teach.lessons;

//ATTENDANCE
export const AttendanceStatus = (state) => state.attendance.attendanceStatus;
export const Session = (state) => state.attendance.session;

//news
export const News = (state) => state.news.news;
export const NewsTotalPages = (state) => state.news.totalPages;
export const NewsTotalElements = (state) => state.news.totalElements;
