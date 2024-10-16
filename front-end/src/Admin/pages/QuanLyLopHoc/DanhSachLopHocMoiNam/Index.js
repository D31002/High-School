import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import Styles from './DanhSachTheoNam.module.scss';
import { useHandleDispatch } from '../../../../services/useHandleDispatch';
import { useSelector } from 'react-redux';
import {
    Classes,
    Combination,
    Grades,
    schoolYears,
    Teachers,
    userToken,
    totalElementsClass,
    classLoading,
} from '../../../../redux/selectors';
import {
    showBeforeDelete,
    showErrorMessage,
    showSuccessMessage,
    showWarningMessage,
} from '../../../../Component/Notification/Index';
import Modal from '../../../../Component/Modal/Index';
import Input from '../../../../Component/Input/Index';
import MuiTable from '../../../../Component/MuiTable/Index';
import AddIcon from '@mui/icons-material/Add';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SelectOption from '../../../../Component/SelectOption/Index';
import Loading from '../../../../Component/Loading/Index';

const cx = classNames.bind(Styles);

function Index() {
    const headCells = [
        { id: 'name', label: 'Tên lớp học' },
        { id: 'grade.grade', label: 'Khối' },
        { id: 'classTeacher.userProfileResponse.fullName', label: 'Giáo viên chủ nhiệm' },
        { id: 'combination.name', label: 'Tổ hợp', hover: true, datahover: 'combination.subjects' },
    ];
    const token = useSelector(userToken);
    const [dataAdd, setDataAdd] = useState({
        name: '',
        schoolYearId: null,
        gradeId: null,
        teacherId: null,
        combinationId: null,
    });
    const SchoolYears = useSelector(schoolYears);
    const classes = useSelector(Classes);
    const ClassLoading = useSelector(classLoading);
    const grades = useSelector(Grades);
    const teachers = useSelector(Teachers);
    const combinations = useSelector(Combination);
    const TotalElements = useSelector(totalElementsClass);
    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [keyWord, setKeyWord] = useState('');
    const [keyWordSchoolYear, setKeyWordSchoolYear] = useState();
    const [yearId, setYearId] = useState();
    const {
        getallschoolyear,
        getallclassesbyyear,
        getallgrade,
        createclass,
        deleteclass,
        editclass,
        cpydata,
        getallteacher,
        getallcombination,
    } = useHandleDispatch();

    const nameref = useRef();
    const [currentPage, setCrrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(7);

    useEffect(() => {
        if (yearId) {
            getallclassesbyyear(token, yearId, currentPage, pageSize, keyWord);
        } else {
            getallclassesbyyear(token, -1, '', '', keyWord);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keyWord, currentPage, pageSize, yearId]);
    console.log(classes);

    useEffect(() => {
        getallschoolyear(keyWordSchoolYear);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keyWordSchoolYear]);

    useEffect(() => {
        setYearId(SchoolYears[0]?.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [SchoolYears]);

    const dataformatOptionOfTeacher = teachers?.map((teacher) => ({
        id: teacher.id,
        nameOption: `${teacher.teacherCode} - ${teacher.userProfileResponse.fullName}`,
    }));

    const dataformatOptionOfSchoolYear = SchoolYears.map((year) => ({
        id: year.id,
        nameOption: `${year.schoolYear} - ${year.schoolYear + 1}`,
    }));
    const dataformatOptionOfGrade = grades.map((grade) => ({
        id: grade.id,
        nameOption: `${grade.grade}`,
    }));
    const dataformatOptionOfCombination = combinations?.map((combination) => ({
        id: combination.id,
        nameOption: `${combination.name}`,
    }));

    const handleChangeOptionSchoolYear = (id) => {
        setYearId(id);
        setCrrentPage(1);
    };
    const handleChangeOptionGrade = (id) => {
        setDataAdd((pre) => ({
            ...pre,
            gradeId: id,
        }));
    };
    const handleChangeOptionTeacher = (id) => {
        setDataAdd((pre) => ({
            ...pre,
            teacherId: id,
        }));
    };
    const handleChangeOptionCombination = (id) => {
        setDataAdd((pre) => ({
            ...pre,
            combinationId: id,
        }));
    };
    const handleChangeName = (e) => {
        setDataAdd({ ...dataAdd, [e.target.name]: e.target.value });
    };
    const showmodal = async () => {
        setShowModal(true);
        setIsEditMode(false);
        setDataAdd({ ...dataAdd, schoolYearId: yearId });
        getallgrade(token);
        getallteacher(token);
        getallcombination(token);
    };

    const handleShowEdit = (e, row) => {
        e.preventDefault();
        e.stopPropagation();
        showmodal();
        setIsEditMode(true);
        setDataAdd({
            id: row.id,
            name: row.name,
            schoolYearId: yearId,
            gradeId: row.grade.id,
            combinationId: row.combination.id,
            teacherId: row.classTeacher?.id,
        });
    };

    const handleSubmitEdit = async () => {
        const response = await editclass(token, dataAdd);
        if (response.code === 1000) {
            oncloseModal();
            getallclassesbyyear(token, yearId, currentPage, pageSize, keyWord);
            showSuccessMessage('Chỉnh sửa thành công');
        } else {
            showErrorMessage(response.message);
        }
    };

    const handleDelete = (dataDel) => {
        showBeforeDelete(`Bạn muốn xóa :)`).then(async (result) => {
            if (result.isConfirmed) {
                const response = await deleteclass(token, dataDel);
                if (response.code === 1000) {
                    getallclassesbyyear(token, yearId, currentPage, pageSize, keyWord);
                    showSuccessMessage(response.result);
                } else {
                    showErrorMessage(response.message);
                }
            } else {
                showErrorMessage('Bạn đừng phân vân nữa:)');
            }
        });
    };

    const oncloseModal = () => {
        setShowModal();
        setIsEditMode(false);
        setDataAdd({ name: '', schoolYearId: null, gradeId: null, teacherId: null, combinationId: null });
    };
    const handleSubmitAdd = async () => {
        if (nameref.current?.validity?.valid && dataAdd.gradeId != null && dataAdd.teacherId != null) {
            const response = await createclass(token, dataAdd);
            if (response?.code === 1000) {
                showSuccessMessage('Thêm thành công');
                oncloseModal();
                getallclassesbyyear(token, yearId, currentPage, pageSize, keyWord);
            } else {
                showErrorMessage(response?.message || 'Lỗi không xác định');
            }
        } else {
            showWarningMessage('Lỗi dữ liệu');
        }
    };
    const handleSearch = (dataSearch) => {
        setCrrentPage(1);
        setKeyWord(dataSearch);
    };
    const handleSearchChangeSchoolYear = (event) => {
        setKeyWordSchoolYear(event.target.value);
    };

    const handleCoppy = async () => {
        const response = await cpydata(token, yearId);
        if (response.code === 1000) {
            showSuccessMessage(response.result);
            getallclassesbyyear(token, yearId, currentPage, pageSize, keyWord);
        } else {
            showErrorMessage(response.message);
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
                </div>
                {yearId && (
                    <div className={cx('action')}>
                        <div className={cx('coppy')} onClick={handleCoppy}>
                            <ContentCopyIcon />
                            Coppy data
                        </div>
                        <div className={cx('add')} onClick={showmodal}>
                            <AddIcon /> Add
                        </div>
                    </div>
                )}
            </div>
            <MuiTable
                title="DANH SÁCH LỚP HỌC"
                headCells={headCells}
                data={classes}
                loading={ClassLoading}
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
            {showModal && (
                <div className={cx('modal')}>
                    <Modal
                        edit={isEditMode}
                        title="Thông Tin Lớp Học"
                        save={!isEditMode}
                        onClose={oncloseModal}
                        handleSubmitAdd={handleSubmitAdd}
                        handleSubmitEdit={handleSubmitEdit}
                    >
                        <Input
                            refer={nameref}
                            spellCheck="false"
                            type="text"
                            placeholder="Tên"
                            name="name"
                            value={dataAdd.name || ''}
                            pattern="^(10|11|12)[A-Z][1-9]$"
                            errorMessage="Ví dụ: 10A1,11B1,12C1,..."
                            required
                            handleChange={handleChangeName}
                        />
                        <SelectOption
                            title="Chọn khối"
                            dataOptions={dataformatOptionOfGrade}
                            onclick={(id) => handleChangeOptionGrade(id)}
                            selectedOption={dataAdd.gradeId}
                        />
                        <SelectOption
                            title="Chọn giáo viên chủ nhiệm"
                            dataOptions={dataformatOptionOfTeacher}
                            onclick={(id) => handleChangeOptionTeacher(id)}
                            selectedOption={dataAdd.teacherId}
                        />
                        <SelectOption
                            title="Chọn tổ hợp"
                            dataOptions={dataformatOptionOfCombination}
                            onclick={(id) => handleChangeOptionCombination(id)}
                            selectedOption={dataAdd.combinationId}
                        />
                    </Modal>
                </div>
            )}

            {ClassLoading && <Loading />}
        </div>
    );
}

export default Index;
