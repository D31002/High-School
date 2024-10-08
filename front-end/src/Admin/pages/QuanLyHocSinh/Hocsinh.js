import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames/bind';
import Styles from './Hocsinh.module.scss';
import Muitable from '../../../Component/MuiTable/Index';
import { useParams } from 'react-router-dom';
import { useHandleDispatch } from '../../../services/useHandleDispatch';
import { useSelector } from 'react-redux';
import {
    Classes,
    Students,
    userToken,
    Statuses,
    totalElementsStudent,
    StudentsLoading,
    authUser,
} from '../../../redux/selectors';
import AddIcon from '@mui/icons-material/Add';
import PublishIcon from '@mui/icons-material/Publish';
import GetAppIcon from '@mui/icons-material/GetApp';
import Modal from '../../../Component/Modal/Index';
import Input from '../../../Component/Input/Index';
import SelectOption from '../../../Component/SelectOption/Index';
import Loading from '../../../Component/Loading/Index';
import * as XLSX from 'xlsx';
import {
    showBeforeDelete,
    showErrorMessage,
    showSuccessMessage,
    showWarningMessage,
} from '../../../Component/Notification/Index';
import Button from '../../../Component/button/Button';
import DanhGia from './DanhGiaKQHT/Index';

const cx = classNames.bind(Styles);

function Hocsinh() {
    const {
        getclassroombyid,
        getallstudentbyclassroomid,
        createstudentinclassroom,
        getallstatus,
        editstudentinclassroom,
        deletestudent,
        getstudentnotclassroom,
        addstudentexistedinclassroom,
        createstudentfromexcel,
    } = useHandleDispatch();
    const user = useSelector(authUser);
    const token = useSelector(userToken);
    const classRoom = useSelector(Classes);
    const students = useSelector(Students);
    const statuses = useSelector(Statuses);
    const [keyWord, setKeyWord] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalAssessment, setModalAssessment] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const { classRoomId } = useParams();
    const refstudentCode = useRef();
    const reffullName = useRef();
    const refbirthday = useRef();
    const refphoneNumber = useRef();
    const refemail = useRef();
    const refpassword = useRef();
    const [studentId, setStudentId] = useState();
    const [studentNotClassRoom, setStudentNotClassRoom] = useState([]);
    const [valueStudent, setValueStudent] = useState({
        studentCode: '',
        fullName: '',
        birthday: '',
        phoneNumber: '',
        gender: 0,
        email: '',
        username: '',
        password: '',
    });
    const [currentPage, setCrrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(7);
    const TotalElements = useSelector(totalElementsStudent);
    const StudentLoading = useSelector(StudentsLoading);
    const headCells = [
        { id: 'studentCode', label: 'MSHS' },
        { id: 'userProfileResponse.fullName', label: 'Họ tên' },
        { id: 'userProfileResponse.birthday', label: 'ngày sinh' },
        { id: 'userProfileResponse.gender', label: 'Giới tính' },
        { id: 'userProfileResponse.email', label: 'Email' },
        { id: 'status', label: 'Trạng thái' },
    ];
    const details = [
        { id: 'userProfileResponse.imageUrl', label: 'ảnh đại diện' },
        { id: 'userProfileResponse.phoneNumber', label: 'điện thoại' },
        { id: 'userProfileResponse.ethnicity', label: 'Dân tộc' },
        { id: 'userProfileResponse.nationality', label: 'Quốc tịch' },
        { id: 'userProfileResponse.address', label: 'Địa chỉ' },
    ];

    const dataformatOptionOfStatus = statuses?.map((status) => ({
        id: status,
        nameOption: `${status}`,
    }));
    const dataformatOptionOfStudent = studentNotClassRoom.map((student) => ({
        id: student.id,
        nameOption: `${student.studentCode} - ${student.userProfileResponse.fullName}`,
    }));

    useEffect(() => {
        getclassroombyid(token, classRoomId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (classRoomId) {
            getallstudentbyclassroomid(token, classRoomId, currentPage, pageSize, keyWord);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, keyWord, classRoomId, currentPage, pageSize, keyWord]);

    const handleSearch = (dataSearch) => {
        setKeyWord(dataSearch);
    };

    const handleFileChange = (e) => {
        const fileTypes = [
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'text/csv',
        ];
        let selectedFile = e.target.files[0];
        if (selectedFile) {
            if (fileTypes.includes(selectedFile.type)) {
                const reader = new FileReader();
                reader.readAsArrayBuffer(selectedFile);
                reader.onload = async (e) => {
                    const workbook = XLSX.read(e.target.result, { type: 'buffer' });
                    const workSheetName = workbook.SheetNames[0];
                    const workSheet = workbook.Sheets[workSheetName];
                    const data = XLSX.utils.sheet_to_json(workSheet, { raw: false });
                    const formatData = data.map((item) => {
                        const date = new Date(item['Ngày Sinh']);
                        const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
                            2,
                            '0',
                        )}-${String(date.getDate()).padStart(2, '0')}`;
                        const gender = item['Giới Tính'].toLowerCase() === 'nam' ? 0 : 1;
                        const addressParts = item['Địa chỉ'].split('-');
                        return {
                            studentCode: item['Mã số học sinh'],
                            fullName: item['Họ Tên'],
                            birthday: formattedDate,
                            phoneNumber: item['Số điện thoại'],
                            gender: gender,
                            email: item['Email'],
                            ethnicity: item['Dân tộc'],
                            nationality: item['Quốc tịch'],
                            houseNumber: addressParts[0],
                            street: addressParts[1],
                            ward: addressParts[2] || '',
                            district: addressParts[3] || '',
                            city: addressParts[4] || '',
                            username: item['Mã số học sinh'],
                            password: item['password'],
                        };
                    });
                    setLoading(true);
                    const response = await createstudentfromexcel(token, classRoomId, formatData);
                    if (response.code === 1000) {
                        showSuccessMessage(response.result);
                        getallstudentbyclassroomid(token, classRoomId, currentPage, pageSize, keyWord);
                    } else {
                        showErrorMessage(response.message);
                    }
                    setLoading(false);
                };
            } else {
                showErrorMessage('vui lòng chọn file excel');
            }
        } else {
            showWarningMessage('Chưa chọn file');
        }
    };

    const handleExport = () => {
        // const formattedTeachers = teachers.map((teacher, index) => ({
        //     STT: index + 1,
        //     'Mã số học sinh': teacher.teacherCode,
        //     'Họ Tên': teacher.userProfileResponse.fullName,
        //     'Ngày sinh': formatDate(teacher.userProfileResponse.birthday),
        //     'Giới Tính': teacher.userProfileResponse.gender === 0 ? 'Nam' : 'Nữ',
        //     'Địa chỉ': `${teacher.userProfileResponse.address.houseNumber}-${teacher.userProfileResponse.address.hamlet}-${teacher.userProfileResponse.address.street}-${teacher.userProfileResponse.address.ward}-${teacher.userProfileResponse.address.district}-${teacher.userProfileResponse.address.city}`,
        //     'Số điện thoại': teacher.userProfileResponse.phoneNumber,
        //     Email: teacher.userProfileResponse.email,
        //     'Dân tộc': teacher.userProfileResponse.ethnicity,
        //     'Quốc tịch': teacher.userProfileResponse.nationality,
        // }));
        // const ws = XLSX.utils.json_to_sheet(formattedTeachers);
        // const wb = XLSX.utils.book_new();
        // XLSX.utils.book_append_sheet(wb, ws, 'Teachers');
        // XLSX.writeFile(wb, `teachers-${subjectId}.xlsx`);
    };

    const showmodal = async () => {
        setShowModal(true);
        setIsEditMode(false);
    };
    const oncloseModal = () => {
        setShowModal();
        setIsEditMode(false);
        setValueStudent({
            studentCode: '',
            fullName: '',
            birthday: '',
            phoneNumber: '',
            gender: 0,
            email: '',
            username: '',
            password: '',
        });
    };

    const handleChange = (e) => {
        setValueStudent({
            ...valueStudent,
            [e.target.name]: e.target.name === 'gender' ? (e.target.value === '0' ? 0 : 1) : e.target.value,
            username: e.target.name === 'studentCode' ? e.target.value : valueStudent.username,
        });
    };

    const isValid = () => {
        return (
            refstudentCode.current?.validity?.valid &&
            reffullName.current?.validity?.valid &&
            refbirthday.current?.validity?.valid &&
            refphoneNumber.current?.validity?.valid &&
            refemail.current?.validity?.valid &&
            refpassword.current?.validity?.valid
        );
    };
    const handleSubmitAdd = async () => {
        if (isValid()) {
            setLoading(true);
            const response = await createstudentinclassroom(token, classRoomId, valueStudent);
            if (response?.code === 1000) {
                showSuccessMessage('Thành công');
                oncloseModal();
                getallstudentbyclassroomid(token, classRoomId, currentPage, pageSize, keyWord);
            } else {
                showErrorMessage(response?.message);
            }
            setLoading(false);
        } else {
            showWarningMessage('Lỗi dữ liệu');
        }
    };
    const handleShowEdit = async (e, row) => {
        e.preventDefault();
        e.stopPropagation();
        showmodal();
        setIsEditMode(true);

        setValueStudent({
            id: row.id,
            studentCode: row.studentCode,
            fullName: row.userProfileResponse.fullName,
            birthday: row.userProfileResponse.birthday,
            phoneNumber: row.userProfileResponse.phoneNumber,
            gender: row.userProfileResponse.gender,
            email: row.userProfileResponse.email,
            username: row.userProfileResponse.userResponse.username,
            password: '',
            status: row.status,
        });
        await getallstatus(token);
    };
    const handleSubmitEdit = async () => {
        if (
            refstudentCode.current?.validity?.valid &&
            reffullName.current?.validity?.valid &&
            refbirthday.current?.validity?.valid &&
            refphoneNumber.current?.validity?.valid &&
            refemail.current?.validity?.valid
        ) {
            const { id, ...teacherDataWithoutId } = valueStudent;
            setLoading(true);
            const response = await editstudentinclassroom(token, id, teacherDataWithoutId);
            if (response.code === 1000) {
                showSuccessMessage('Chỉnh sửa thành công');
                oncloseModal();
                getallstudentbyclassroomid(token, classRoomId, currentPage, pageSize, keyWord);
            } else {
                showErrorMessage(response?.message);
            }
            setLoading(false);
        } else {
            showWarningMessage('Lỗi dữ liệu');
        }
    };

    const handleDelete = async (dataDel) => {
        showBeforeDelete(`Bạn muốn xóa :)`).then(async (result) => {
            if (result.isConfirmed) {
                setLoading(true);
                const response = await deletestudent(token, classRoomId, dataDel);
                if (response.code === 1000) {
                    getallstudentbyclassroomid(token, classRoomId, currentPage, pageSize, keyWord);
                    showSuccessMessage(response.result);
                } else {
                    showErrorMessage(response.message);
                }
                setLoading(false);
            } else {
                showErrorMessage('Bạn đừng phân vân nữa:)');
            }
        });
    };

    const handleChangeOptionStatus = (id) => {
        setValueStudent({ ...valueStudent, status: id });
    };

    const handleAddStudentNotClassRoom = async () => {
        const response = await getstudentnotclassroom(token);
        if (response.code === 1000) {
            if (response.result.length <= 0) {
                showWarningMessage('Hiện tại không có học sinh');
            } else {
                setStudentNotClassRoom(response.result);
            }
        } else {
            showErrorMessage(response.message);
        }
    };
    const oncloseModalAddTeacherNotBySubject = () => {
        setStudentNotClassRoom([]);
        setStudentId();
    };
    const handleSubmitAddTeacherExisted = async () => {
        if (studentId) {
            setLoading(true);
            const response = await addstudentexistedinclassroom(token, studentId, classRoomId);
            if (response.code === 1000) {
                getallstudentbyclassroomid(token, classRoomId, currentPage, pageSize, keyWord);
                showSuccessMessage('Thành công');
                setStudentNotClassRoom([]);
                setStudentId();
            } else {
                showErrorMessage(response.message);
            }
            setLoading(false);
        } else {
            showWarningMessage('Hãy chọn học sinh');
        }
    };
    const handleChangeOptionStudentNotClassRoom = (id) => {
        setStudentId(id);
    };
    const showModalAssessment = () => {
        if (user?.id === classRoom?.classTeacher?.id) {
            setModalAssessment(true);
        } else {
            showErrorMessage('Bạn không có quyền truy cập');
        }
    };

    const oncloseModalAssessment = () => {
        setModalAssessment(false);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                {classRoomId && (
                    <div className={cx('action')}>
                        <div className={cx('import')}>
                            <label htmlFor="id-upload">
                                <PublishIcon />
                                <span>Import</span>
                            </label>
                            <input id="id-upload" className={cx('upload')} type="file" onChange={handleFileChange} />
                        </div>
                        <Button className={cx('export')} onClick={handleExport}>
                            <GetAppIcon />
                            export
                        </Button>
                        <Button className={cx('add')} onClick={handleAddStudentNotClassRoom}>
                            <AddIcon /> Add student đã tồn tại
                        </Button>
                        <Button className={cx('add')} onClick={showmodal}>
                            <AddIcon /> Add new
                        </Button>
                        <Button className={cx('add')} onClick={showModalAssessment}>
                            Đánh giá kết quả học tập
                        </Button>
                    </div>
                )}
            </div>
            <div className={cx('table')}>
                <Muitable
                    title={`DANH SÁCH HỌC SINH : LỚP ${classRoom?.name}  - GVCN : ${classRoom?.classTeacher?.teacherCode}-${classRoom?.classTeacher?.userProfileResponse?.fullName}`}
                    headCells={headCells}
                    data={students}
                    handleSearch={handleSearch}
                    handleShowEdit={handleShowEdit}
                    handleDelete={handleDelete}
                    action
                    checkBox
                    details={details}
                    currentPage={currentPage}
                    setCrrentPage={setCrrentPage}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                    TotalElements={TotalElements}
                />
            </div>
            {showModal && (
                <Modal
                    edit={isEditMode}
                    title="Thông Tin Giáo viên"
                    onClose={oncloseModal}
                    save={!isEditMode}
                    handleSubmitAdd={handleSubmitAdd}
                    handleSubmitEdit={handleSubmitEdit}
                >
                    <Input
                        refer={refstudentCode}
                        type="text"
                        placeholder="Nhập mã số"
                        name="studentCode"
                        pattern="HS[0-9]{6}"
                        value={valueStudent.studentCode}
                        errorMessage="Mã số phải có HS kèm theo 6 số"
                        required
                        handleChange={handleChange}
                        disabled={isEditMode}
                    />
                    <Input
                        refer={reffullName}
                        type="text"
                        placeholder="Nhập họ tên"
                        errorMessage="Không được để trống"
                        name="fullName"
                        value={valueStudent.fullName}
                        required
                        handleChange={handleChange}
                    />
                    <Input
                        refer={refbirthday}
                        type="date"
                        name="birthday"
                        min="2004-01-01"
                        max="2008-12-31"
                        errorMessage="Ngày sinh phải >2004 <2008"
                        value={valueStudent.birthday}
                        required
                        handleChange={handleChange}
                    />
                    <Input
                        refer={refphoneNumber}
                        type="text"
                        placeholder="Nhập số điện thoại"
                        value={valueStudent.phoneNumber}
                        name="phoneNumber"
                        pattern="[0-9]{10}"
                        required
                        errorMessage="phải đúng 10 số"
                        handleChange={handleChange}
                    />
                    <div className={cx('gender')}>
                        <div className={cx('gender-nam')}>
                            <input
                                type="radio"
                                name="gender"
                                value="0"
                                checked={valueStudent.gender === 0}
                                onChange={handleChange}
                            />
                            <span>Nam</span>
                        </div>
                        <div className={cx('gender-nu')}>
                            <input
                                type="radio"
                                name="gender"
                                value="1"
                                checked={valueStudent.gender === 1}
                                onChange={handleChange}
                            />
                            <span>Nữ</span>
                        </div>
                    </div>
                    <Input
                        refer={refemail}
                        type="email"
                        placeholder="nhập email"
                        name="email"
                        value={valueStudent.email}
                        required
                        pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                        errorMessage="Email phải có dạng example@gmail.com"
                        handleChange={handleChange}
                    />
                    <Input
                        type="text"
                        placeholder="username"
                        name="studentCode"
                        pattern="CB[0-9]{6}"
                        value={valueStudent.studentCode}
                        disabled
                    />
                    <Input
                        refer={refpassword}
                        type="password"
                        value={valueStudent.password}
                        placeholder="nhập password"
                        name="password"
                        required
                        errorMessage="Không được để trống"
                        handleChange={handleChange}
                    />
                    {isEditMode && (
                        <SelectOption
                            title="Chọn trạng thái"
                            dataOptions={dataformatOptionOfStatus}
                            onclick={(id) => handleChangeOptionStatus(id)}
                            selectedOption={valueStudent.status && valueStudent.status}
                        />
                    )}
                </Modal>
            )}
            {studentNotClassRoom.length > 0 && (
                <Modal
                    save
                    onClose={oncloseModalAddTeacherNotBySubject}
                    handleSubmitAdd={handleSubmitAddTeacherExisted}
                >
                    <SelectOption
                        title="Chọn học sinh"
                        dataOptions={dataformatOptionOfStudent}
                        // handleSearchChange={handleSearchChangeTeacherNotBySubjectId}
                        onclick={(id) => handleChangeOptionStudentNotClassRoom(id)}
                        selectedOption={studentId}
                    />
                </Modal>
            )}
            {modalAssessment && <DanhGia data={students} onclose={oncloseModalAssessment} classRoom={classRoom} />}
            {(loading || StudentLoading) && <Loading />}
        </div>
    );
}

export default Hocsinh;
