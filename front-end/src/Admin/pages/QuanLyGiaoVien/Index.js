import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './giaovien.module.scss';
import MuiTable from '../../../Component/MuiTable/Index';
import SelectOption from '../../../Component/SelectOption/Index';
import { useHandleDispatch } from '../../../services/useHandleDispatch';
import { useSelector } from 'react-redux';
import { Subjects, Teachers, userToken, totalElementsTeacher, TeachersLoading } from '../../../redux/selectors';
import AddIcon from '@mui/icons-material/Add';
import PublishIcon from '@mui/icons-material/Publish';
import GetAppIcon from '@mui/icons-material/GetApp';
import Modal from '../../../Component/Modal/Index';
import Input from '../../../Component/Input/Index';
import Loading from '../../../Component/Loading/Index';
import {
    showBeforeDelete,
    showErrorMessage,
    showSuccessMessage,
    showWarningMessage,
} from '../../../Component/Notification/Index';
import * as XLSX from 'xlsx';

const cx = classNames.bind(styles);

function Index() {
    const token = useSelector(userToken);
    const teachers = useSelector(Teachers);
    const subjects = useSelector(Subjects);
    const {
        getallsubject,
        getallteacherbysubjectid,
        getallteachernotbysubjectid,
        createteacherinsubject,
        addteacherexisted,
        editteacherinsubject,
        deleteteacherinsubject,
        createteacherinsubjectfromexcel,
    } = useHandleDispatch();
    const [valueTeacher, setValueTeacher] = useState({
        teacherCode: '',
        fullName: '',
        birthday: '',
        phoneNumber: '',
        gender: 0,
        email: '',
        username: '',
        password: '',
    });
    const [teacherNotBySubjectId, setTeacherNotBySubjectId] = useState([]);
    const [keyWordTeacherNotBySubjectId, setKeyWordTeacherNotBySubjectId] = useState('');
    const [teacherId, setTeacherId] = useState();
    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [subjectId, setSubjectId] = useState();
    const [keyWordSubject, setKeyWordSubject] = useState();
    const [keyWord, setKeyWord] = useState('');
    const refteacherCode = useRef();
    const reffullName = useRef();
    const refbirthday = useRef();
    const refphoneNumber = useRef();
    const refemail = useRef();
    const refpassword = useRef();
    const [currentPage, setCrrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(7);
    const TotalElements = useSelector(totalElementsTeacher);
    const TeacherLoading = useSelector(TeachersLoading);
    const headCells = [
        { id: 'teacherCode', label: 'MSCB' },
        { id: 'userProfileResponse.fullName', label: 'Họ tên' },
        { id: 'userProfileResponse.birthday', label: 'ngày sinh' },
        { id: 'userProfileResponse.gender', label: 'Giới tính' },
        { id: 'userProfileResponse.email', label: 'Email' },
    ];
    const details = [
        { id: 'userProfileResponse.imageUrl', label: 'ảnh đại diện' },
        { id: 'userProfileResponse.phoneNumber', label: 'điện thoại' },
        { id: 'userProfileResponse.ethnicity', label: 'Dân tộc' },
        { id: 'userProfileResponse.nationality', label: 'Quốc tịch' },
        { id: 'userProfileResponse.address', label: 'Địa chỉ' },
    ];

    const dataformatOptionOfSubject = subjects.map((subject) => ({
        id: subject.id,
        nameOption: `${subject.name}`,
    }));
    const dataformatOptionOfTeacher = teacherNotBySubjectId.map((teacher) => ({
        id: teacher.id,
        nameOption: `${teacher.teacherCode} - ${teacher.userProfileResponse.fullName}`,
    }));

    useEffect(() => {
        getallsubject(token, keyWordSubject);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keyWordSubject]);

    useEffect(() => {
        setSubjectId(subjects[0]?.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [subjects]);

    useEffect(() => {
        if (subjectId) {
            getallteacherbysubjectid(token, subjectId, currentPage, pageSize, keyWord);
        } else {
            getallteacherbysubjectid(token, -1, currentPage, pageSize, keyWord);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keyWord, currentPage, pageSize, subjectId]);

    useEffect(() => {
        if (subjectId) {
            const fetchData = async () => {
                try {
                    const res = await getallteachernotbysubjectid(token, subjectId, keyWordTeacherNotBySubjectId);
                    if (res?.result?.length > 0) {
                        setTeacherNotBySubjectId(res?.result);
                    }
                } catch (error) {}
            };

            fetchData();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keyWordTeacherNotBySubjectId]);

    const handleChangeOptionSubject = async (id) => {
        setCrrentPage(1);
        setSubjectId(id);
    };
    const handleSearchChangeSubject = (event) => {
        setKeyWordSubject(event.target.value);
    };

    const oncloseModal = () => {
        setShowModal();
        setIsEditMode(false);
        setValueTeacher({
            teacherCode: '',
            fullName: '',
            birthday: '',
            phoneNumber: '',
            gender: 0,
            email: '',
            username: '',
            password: '',
        });
    };

    const oncloseModalAddTeacherNotBySubject = () => {
        setTeacherNotBySubjectId([]);
    };

    const showmodal = async () => {
        setShowModal(true);
        setIsEditMode(false);
    };

    const showmodalTeacherNotBySubjectId = async () => {
        setTeacherId();
        const response = await getallteachernotbysubjectid(token, subjectId, keyWordTeacherNotBySubjectId);
        if (response.code === 1000) {
            if (response.result.length > 0) {
                setTeacherNotBySubjectId(response.result);
            } else {
                showErrorMessage('Không có giáo viên khác ngoài giáo viên hiện tại trong danh sách ');
            }
        } else {
            showErrorMessage(response.message);
        }
    };

    const handleSearch = (dataSearch) => {
        setKeyWord(dataSearch);
    };

    const handleSearchChangeTeacherNotBySubjectId = (event) => {
        setKeyWordTeacherNotBySubjectId(event.target.value);
    };
    const handleChange = (e) => {
        setValueTeacher({
            ...valueTeacher,
            [e.target.name]: e.target.name === 'gender' ? (e.target.value === '0' ? 0 : 1) : e.target.value,
            username: e.target.name === 'teacherCode' ? e.target.value : valueTeacher.username,
        });
    };

    const handleChangeOptionTeacherNotBySubject = (id) => {
        setTeacherId(id);
    };

    const handleDelete = async (dataDel) => {
        showBeforeDelete(`Bạn muốn xóa :)`).then(async (result) => {
            if (result.isConfirmed) {
                setLoading(true);
                const response = await deleteteacherinsubject(token, subjectId, dataDel);
                if (response.code === 1000) {
                    getallteacherbysubjectid(token, subjectId, currentPage, pageSize, keyWord);
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

    const isValid = () => {
        return (
            refteacherCode.current?.validity?.valid &&
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
            const response = await createteacherinsubject(token, subjectId, valueTeacher);
            if (response?.code === 1000) {
                showSuccessMessage('Thành công');
                oncloseModal();
                getallteacherbysubjectid(token, subjectId, currentPage, pageSize, keyWord);
            } else {
                showErrorMessage(response?.message);
            }
            setLoading(false);
        } else {
            showWarningMessage('Lỗi dữ liệu');
        }
    };
    const handleSubmitAddTeacherExisted = async () => {
        if (teacherId) {
            setLoading(true);
            const response = await addteacherexisted(token, subjectId, teacherId);
            if (response.code === 1000) {
                getallteacherbysubjectid(token, subjectId, currentPage, pageSize, keyWord);
                showSuccessMessage('Thành công');
                setTeacherNotBySubjectId([]);
                setTeacherId();
            } else {
                showErrorMessage(response.message);
            }
            setLoading(false);
        } else {
            showWarningMessage('Hãy chọn giáo viên');
        }
    };
    const handleShowEdit = (e, row) => {
        e.preventDefault();
        e.stopPropagation();
        showmodal();
        setIsEditMode(true);
        setValueTeacher({
            id: row.id,
            teacherCode: row.teacherCode,
            fullName: row.userProfileResponse.fullName,
            birthday: row.userProfileResponse.birthday,
            phoneNumber: row.userProfileResponse.phoneNumber,
            gender: row.userProfileResponse.gender,
            email: row.userProfileResponse.email,
            username: row.userProfileResponse.userResponse.username,
            password: '',
        });
    };
    const handleSubmitEdit = async () => {
        if (
            refteacherCode.current?.validity?.valid &&
            reffullName.current?.validity?.valid &&
            refbirthday.current?.validity?.valid &&
            refphoneNumber.current?.validity?.valid &&
            refemail.current?.validity?.valid
        ) {
            const { id, ...teacherDataWithoutId } = valueTeacher;
            setLoading(true);
            const response = await editteacherinsubject(token, id, teacherDataWithoutId);
            if (response.code === 1000) {
                showSuccessMessage('Chỉnh sửa thành công');
                oncloseModal();
                getallteacherbysubjectid(token, subjectId, currentPage, pageSize, keyWord);
            } else {
                showErrorMessage(response?.message);
            }
            setLoading(false);
        } else {
            showWarningMessage('Lỗi dữ liệu');
        }
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
                            teacherCode: item['Mã Cán Bộ'],
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
                            username: item['Mã Cán Bộ'],
                            password: item['password'],
                        };
                    });
                    setLoading(true);
                    const response = await createteacherinsubjectfromexcel(token, subjectId, formatData);
                    if (response.code === 1000) {
                        getallteacherbysubjectid(token, subjectId, currentPage, pageSize, keyWord);
                        showSuccessMessage(response.result);
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
    const formatDate = (dateStr) => {
        if (!dateStr) return '';

        const date = new Date(dateStr);
        if (!isNaN(date.getTime())) {
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear().toString().slice(-2);
            return `${day}/${month}/${year}`;
        }
        return '';
    };

    const handleExport = () => {
        const formattedTeachers = teachers.map((teacher, index) => ({
            STT: index + 1,
            'Mã Cán Bộ': teacher.teacherCode,
            'Họ Tên': teacher.userProfileResponse.fullName,
            'Ngày sinh': formatDate(teacher.userProfileResponse.birthday),
            'Giới Tính': teacher.userProfileResponse.gender === 0 ? 'Nam' : 'Nữ',
            'Địa chỉ': `${teacher.userProfileResponse.address.houseNumber}-${teacher.userProfileResponse.address.hamlet}-${teacher.userProfileResponse.address.street}-${teacher.userProfileResponse.address.ward}-${teacher.userProfileResponse.address.district}-${teacher.userProfileResponse.address.city}`,
            'Số điện thoại': teacher.userProfileResponse.phoneNumber,
            Email: teacher.userProfileResponse.email,
            'Dân tộc': teacher.userProfileResponse.ethnicity,
            'Quốc tịch': teacher.userProfileResponse.nationality,
        }));
        const ws = XLSX.utils.json_to_sheet(formattedTeachers);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Teachers');
        XLSX.writeFile(wb, `teachers-${subjectId}.xlsx`);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('select-option')}>
                    <SelectOption
                        title="Chọn môn học"
                        handleSearchChange={handleSearchChangeSubject}
                        dataOptions={dataformatOptionOfSubject}
                        onclick={(id) => handleChangeOptionSubject(id)}
                        selectedOption={subjectId}
                    />
                </div>
                {subjectId && (
                    <div className={cx('action')}>
                        <div className={cx('import')}>
                            <label htmlFor="id-upload">
                                <PublishIcon />
                                <span>Import</span>
                            </label>
                            <input id="id-upload" className={cx('upload')} type="file" onChange={handleFileChange} />
                        </div>
                        <div className={cx('export')} onClick={handleExport}>
                            <GetAppIcon />
                            export
                        </div>
                        <div className={cx('add')} onClick={showmodalTeacherNotBySubjectId}>
                            <AddIcon /> Add teacher đã tồn tại
                        </div>
                        <div className={cx('add')} onClick={showmodal}>
                            <AddIcon /> Add new
                        </div>
                    </div>
                )}
            </div>
            <div className={cx('table')}>
                <MuiTable
                    title="DANH SÁCH GIÁO VIÊN"
                    headCells={headCells}
                    details={details}
                    data={teachers}
                    loading={TeacherLoading}
                    handleShowEdit={handleShowEdit}
                    handleDelete={handleDelete}
                    handleSearch={handleSearch}
                    action
                    checkBox
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
                        refer={refteacherCode}
                        type="text"
                        placeholder="Nhập mã số"
                        name="teacherCode"
                        pattern="CB[0-9]{6}"
                        value={valueTeacher.teacherCode}
                        errorMessage="Mã số phải có CB kèm theo 6 số"
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
                        value={valueTeacher.fullName}
                        required
                        handleChange={handleChange}
                    />
                    <Input
                        refer={refbirthday}
                        type="date"
                        name="birthday"
                        min="1980-01-01"
                        max="2004-12-31"
                        errorMessage="Ngày sinh phải >1980 <2004"
                        value={valueTeacher.birthday}
                        required
                        handleChange={handleChange}
                    />
                    <Input
                        refer={refphoneNumber}
                        type="text"
                        placeholder="Nhập số điện thoại"
                        value={valueTeacher.phoneNumber}
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
                                checked={valueTeacher.gender === 0}
                                onChange={handleChange}
                            />
                            <span>Nam</span>
                        </div>
                        <div className={cx('gender-nu')}>
                            <input
                                type="radio"
                                name="gender"
                                value="1"
                                checked={valueTeacher.gender === 1}
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
                        value={valueTeacher.email}
                        required
                        pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                        errorMessage="Email phải có dạng example@gmail.com"
                        handleChange={handleChange}
                    />
                    <Input
                        type="text"
                        placeholder="username"
                        name="teacherCode"
                        pattern="CB[0-9]{6}"
                        value={valueTeacher.teacherCode}
                        disabled
                    />
                    <Input
                        refer={refpassword}
                        type="password"
                        value={valueTeacher.password}
                        placeholder="nhập password"
                        name="password"
                        required
                        errorMessage="Không được để trống"
                        handleChange={handleChange}
                    />
                </Modal>
            )}
            {teacherNotBySubjectId.length > 0 && (
                <Modal
                    save
                    onClose={oncloseModalAddTeacherNotBySubject}
                    handleSubmitAdd={handleSubmitAddTeacherExisted}
                >
                    <SelectOption
                        title="Chọn giáo viên"
                        dataOptions={dataformatOptionOfTeacher}
                        handleSearchChange={handleSearchChangeTeacherNotBySubjectId}
                        onclick={(id) => handleChangeOptionTeacherNotBySubject(id)}
                        selectedOption={teacherId}
                        w400
                    />
                </Modal>
            )}
            {(loading || TeacherLoading) && <Loading />}
        </div>
    );
}

export default Index;