import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Styles from './profile.module.scss';
import Input from '../Input/Index';
import { useSelector } from 'react-redux';
import { authUser, userToken } from '../../redux/selectors';
import SelectOption from '../SelectOption/Index';
import { ethnicGroups, nationalities } from './ListData';
import { useHandleDispatch } from '../../services/useHandleDispatch';
import { showErrorMessage, showSuccessMessage } from '../Notification/Index';
import Button from '../button/Button';
import Loading from '../Loading/Index';

const cx = classNames.bind(Styles);

function Index() {
    const { getdiaGioiHanhChinhVN, editprofile, updateuser, getallParentOfStudent } = useHandleDispatch();
    const token = useSelector(userToken);
    const user = useSelector(authUser);
    const [data, setData] = useState({
        fullName: user?.userProfileResponse?.fullName || '',
        birthday: user?.userProfileResponse?.birthday || '',
        phoneNumber: user?.userProfileResponse?.phoneNumber || '',
        email: user?.userProfileResponse?.email || '',
        gender: user?.userProfileResponse?.gender || '',
        ethnicity: user?.userProfileResponse?.ethnicity || '',
        nationality: user?.userProfileResponse?.nationality || '',
        houseNumber: user?.userProfileResponse?.address?.houseNumber || '',
        street: user?.userProfileResponse?.address?.street || '',
        ward: user?.userProfileResponse?.address?.ward || '',
        district: user?.userProfileResponse?.address?.district || '',
        city: user?.userProfileResponse?.address?.city || '',
        parent: {
            fatherName: '',
            fatherBirthday: '',
            fatherPhoneNumber: '',
            fatherJob: '',
            motherName: '',
            motherBirthday: '',
            motherPhoneNumber: '',
            motherJob: '',
        },
    });
    const [dataDiaHinhVN, setDataDiaHinhVN] = useState([]);
    const [dataDistricts, setDataDistricts] = useState([]);
    const [dataWards, setDataWards] = useState([]);
    const [parentsOfStudent, setParentsOfStudent] = useState([]);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getdata = async () => {
            const response = await getdiaGioiHanhChinhVN();
            setDataDiaHinhVN(response?.data);
            const selectedCity = response.data.find((city) => city.Name === data.city);
            if (selectedCity) {
                setDataDistricts(selectedCity.Districts);
                const selectedDistrict = selectedCity.Districts.find((district) => district.Name === data.district);
                if (selectedDistrict) {
                    setDataWards(selectedDistrict.Wards);
                }
            }
        };
        const getallParent = async () => {
            const response = await getallParentOfStudent(token, user?.id);
            if (response.code === 1000) {
                setParentsOfStudent(response.result);
            }
        };
        getdata();
        getallParent();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);
    useEffect(() => {
        if (parentsOfStudent?.length) {
            const parentFather = parentsOfStudent.find((parent) => parent?.userProfileResponse?.gender === 0);
            const parentMother = parentsOfStudent.find((parent) => parent?.userProfileResponse?.gender === 1);
            setData((prevData) => ({
                ...prevData,
                parent: {
                    fatherId: parentFather?.id || 0,
                    fatherName: parentFather?.userProfileResponse?.fullName || '',
                    fatherBirthday: parentFather?.userProfileResponse?.birthday || '',
                    fatherPhoneNumber: parentFather?.userProfileResponse?.phoneNumber || '',
                    fatherJob: parentFather?.job || '',

                    motherId: parentMother?.id || 0,
                    motherName: parentMother?.userProfileResponse?.fullName || '',
                    motherBirthday: parentMother?.userProfileResponse?.birthday || '',
                    motherPhoneNumber: parentMother?.userProfileResponse?.phoneNumber || '',
                    motherJob: parentMother?.job || '',
                },
            }));
        }
    }, [parentsOfStudent, user]);

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.name === 'gender' ? (e.target.value === '0' ? 0 : 1) : e.target.value,
        });
    };
    const handleChangeParent = (e) => {
        setData((prevData) => ({
            ...prevData,
            parent: {
                ...prevData.parent,
                [e.target.name]: e.target.value,
            },
        }));
    };

    const inputs = [
        {
            type: 'text',
            placeholder: 'Mã số',
            pattern: 'CB[0-9]{6}',
            value: user?.studentCode || user?.teacherCode,
            errorMessage: 'Mã số phải có CB kèm theo 6 số',
            required: true,
            disabled: true,
        },
        {
            type: 'text',
            placeholder: 'Họ Tên',
            name: 'fullName',
            value: data.fullName,
            errorMessage: 'Không được để trống',
            required: true,
            handleChange: handleChange,
        },
        {
            type: 'date',
            placeholder: 'ngày sinh',
            // pattern: 'abc',
            min: '1980-01-01',
            max: '2004-12-31',
            name: 'birthday',
            value: data.birthday,
            errorMessage: 'Ngày sinh phải >1980 <2004',
            required: true,
            handleChange: handleChange,
        },
        {
            type: 'number',
            placeholder: 'Số điện thoại',
            pattern: '[0-9]{10}',
            name: 'phoneNumber',
            value: data.phoneNumber,
            errorMessage: 'phải đúng 10 số',
            required: true,
            handleChange: handleChange,
        },
        {
            type: 'text',
            placeholder: 'email',
            pattern: '^[^s@]+@[^s@]+.[^s@]+$',
            name: 'email',
            value: data.email,
            errorMessage: 'Vui lòng nhập đầy đủ thông tin',
            required: true,
            handleChange: handleChange,
        },
    ];

    const inputsAddress = [
        {
            type: 'number',
            placeholder: 'Số nhà',
            name: 'houseNumber',
            value: data.houseNumber,
            errorMessage: 'Vui lòng nhập đầy đủ thông tin',
            required: true,
            handleChange: handleChange,
        },
        {
            type: 'text',
            placeholder: 'tên đường',
            name: 'street',
            value: data.street,
            errorMessage: 'Vui lòng nhập đầy đủ thông tin',
            required: true,
            handleChange: handleChange,
        },
    ];

    const inputsFather = [
        {
            type: 'text',
            placeholder: 'Họ Tên Cha',
            name: 'fatherName',
            value: data.parent.fatherName,
            errorMessage: 'Không được để trống',
            required: true,
            handleChange: handleChangeParent,
        },
        {
            type: 'date',
            placeholder: 'Ngày Sinh Cha',
            min: '1970-01-01',
            max: '1990-12-31',
            name: 'fatherBirthday',
            value: data.parent.fatherBirthday,
            errorMessage: 'Ngày sinh phải >1970 <1990',
            required: true,
            handleChange: handleChangeParent,
        },
        {
            type: 'number',
            placeholder: 'Số Điện Thoại Cha',
            pattern: '[0-9]{10}',
            name: 'fatherPhoneNumber',
            value: data.parent.fatherPhoneNumber,
            errorMessage: 'Phải đúng 10 số',
            required: true,
            handleChange: handleChangeParent,
        },
        {
            type: 'text',
            placeholder: 'Nghề Nghiệp Cha',
            name: 'fatherJob',
            value: data.parent.fatherJob,
            errorMessage: 'Không được để trống',
            required: true,
            handleChange: handleChangeParent,
        },
    ];

    const inputsMother = [
        {
            type: 'text',
            placeholder: 'Họ Tên Mẹ',
            name: 'motherName',
            value: data.parent.motherName,
            errorMessage: 'Không được để trống',
            required: true,
            handleChange: handleChangeParent,
        },
        {
            type: 'date',
            placeholder: 'Ngày Sinh Mẹ',
            min: '1970-01-01',
            max: '1990-12-31',
            name: 'motherBirthday',
            value: data.parent.motherBirthday,
            errorMessage: 'Ngày sinh phải >1970 <1990',
            required: true,
            handleChange: handleChangeParent,
        },
        {
            type: 'number',
            placeholder: 'Số Điện Thoại Mẹ',
            pattern: '[0-9]{10}',
            name: 'motherPhoneNumber',
            value: data.parent.motherPhoneNumber,
            errorMessage: 'Phải đúng 10 số',
            required: true,
            handleChange: handleChangeParent,
        },
        {
            type: 'text',
            placeholder: 'Nghề Nghiệp Mẹ',
            name: 'motherJob',
            value: data.parent.motherJob,
            errorMessage: 'Không được để trống',
            required: true,
            handleChange: handleChangeParent,
        },
    ];

    const dataformatOptionOfEthnicGroups = ethnicGroups?.map((ethnic) => ({
        id: ethnic.id,
        nameOption: `${ethnic.name}`,
    }));

    const dataformatOptionOfnationalities = nationalities?.map((nationalitie) => ({
        id: nationalitie.id,
        nameOption: `${nationalitie.name}`,
    }));

    const dataformatOptionOfCity = dataDiaHinhVN?.map((item) => ({
        id: item.Id,
        nameOption: `${item.Name}`,
    }));

    const dataformatOptionOfDistricts = dataDistricts?.map((item) => ({
        id: item.Id,
        nameOption: `${item.Name}`,
    }));

    const dataformatOptionOfWards = dataWards?.map((item) => ({
        id: item.Id,
        nameOption: `${item.Name}`,
    }));

    const handleChangeOptionEthnicGroups = (id) => {
        setData({
            ...data,
            ethnicity: ethnicGroups?.find((ethnic) => ethnic?.id === id)?.name,
        });
    };
    const handleChangeOptionnationalities = (id) => {
        setData({
            ...data,
            nationality: nationalities?.find((nationality) => nationality?.id === id)?.name,
        });
    };

    const handleChangeOptionCity = (id) => {
        const selectedCity = dataDiaHinhVN.find((city) => city.Id === id);
        setData({
            ...data,
            city: selectedCity?.Name,
        });
        setDataDistricts(selectedCity?.Districts);
        setDataWards([]);
    };
    const handleChangeOptionDistrict = (id) => {
        const selectedDistrict = dataDistricts.find((district) => district.Id === id);
        setData({
            ...data,
            district: selectedDistrict?.Name,
        });
        setDataWards(selectedDistrict?.Wards || []);
    };
    const handleChangeOptionWard = (id) => {
        const selectedWard = dataWards.find((ward) => ward.Id === id);
        setData({
            ...data,
            ward: selectedWard?.Name,
        });
    };

    const handleChangeFile = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setImagePreview(file);
        } else {
            showErrorMessage('Vui lòng chọn một file ảnh.');
        }
    };

    const handleSubmitEditprofile = async () => {
        const json = JSON.stringify(data);
        const blob = new Blob([json], {
            type: 'application/json',
        });
        const formData = new FormData();
        formData.append('file', imagePreview);
        formData.append('request', blob);
        setLoading(true);
        const response = await editprofile(token, formData);
        if (response?.code === 1000) {
            showSuccessMessage('Thành công');
            await updateuser(token);
        } else {
            showErrorMessage(response?.message);
        }
        setLoading(false);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('image')}>
                <img
                    src={
                        imagePreview
                            ? URL.createObjectURL(imagePreview)
                            : user?.userProfileResponse?.imageUrl ||
                              'https://res.cloudinary.com/danrswhe6/image/upload/v1725669304/anhdaidien_w5zpy2.webp'
                    }
                    alt="Ảnh đại diện"
                />
                <div className={cx('import')}>
                    <label htmlFor="id-upload">
                        <div className={cx('image-choose')}>Chọn ảnh</div>
                    </label>
                    <input
                        id="id-upload"
                        className={cx('upload')}
                        type="file"
                        accept="image/*"
                        onChange={handleChangeFile}
                    />
                </div>
            </div>

            <div>
                <div>
                    <h2>THÔNG TIN LÝ LỊCH</h2>
                    <div className={cx('inputs')}>
                        {inputs.map((input, index) => (
                            <div className={cx('input')} key={index}>
                                <Input {...input} />
                            </div>
                        ))}
                        <div className={cx('input')}>
                            <SelectOption
                                title="Dân tộc"
                                dataOptions={dataformatOptionOfEthnicGroups}
                                onclick={(id) => handleChangeOptionEthnicGroups(id)}
                                selectedOption={ethnicGroups?.find((ethnic) => data.ethnicity === ethnic.name)?.id}
                            />
                        </div>
                        <div className={cx('input')}>
                            <SelectOption
                                title="Quốc tịch"
                                dataOptions={dataformatOptionOfnationalities}
                                onclick={(id) => handleChangeOptionnationalities(id)}
                                selectedOption={
                                    nationalities?.find((nationality) => data.nationality === nationality.name)?.id
                                }
                            />
                        </div>
                        <div className={cx('input')}>
                            <div className={cx('gender')}>
                                <div className={cx('gender-male')}>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="0"
                                        checked={data.gender !== 1}
                                        onChange={handleChange}
                                    />
                                    <span>Nam</span>
                                </div>
                                <div className={cx('gender-female')}>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="1"
                                        checked={data.gender === 1}
                                        onChange={handleChange}
                                    />
                                    <span>Nữ</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('address')}>
                    <h2>ĐỊA CHỈ</h2>
                    <div className={cx('inputs')}>
                        {inputsAddress.map((input, index) => (
                            <div className={cx('input')} key={index}>
                                <Input {...input} />
                            </div>
                        ))}
                    </div>
                    <div className={cx('address-detail')}>
                        <SelectOption
                            title="Tỉnh/Thành phố"
                            dataOptions={dataformatOptionOfCity}
                            onclick={(id) => handleChangeOptionCity(id)}
                            selectedOption={dataDiaHinhVN?.find((city) => data?.city === city.Name)?.Id}
                        />

                        <SelectOption
                            title="Quận/Huyện"
                            dataOptions={dataformatOptionOfDistricts}
                            onclick={(id) => handleChangeOptionDistrict(id)}
                            selectedOption={dataDistricts.find((district) => data.district === district.Name)?.Id}
                        />

                        <SelectOption
                            title="Phường/Xã"
                            dataOptions={dataformatOptionOfWards}
                            onclick={(id) => handleChangeOptionWard(id)}
                            selectedOption={dataWards.find((ward) => data.ward === ward.Name)?.Id}
                        />
                    </div>
                </div>
                {user?.userProfileResponse?.userType.includes('student') && (
                    <div className={cx('parent')}>
                        <h2>THÔNG TIN PHỤ HUYNH</h2>
                        <div className={cx('inputs')}>
                            <h3>Họ tên cha/người giám hộ</h3>
                            <div className={cx('inputs')}>
                                {inputsFather.map((input, index) => (
                                    <div className={cx('input')} key={`father-${index}`}>
                                        <Input {...input} />
                                    </div>
                                ))}
                            </div>
                            <h3>Họ tên mẹ/người giám hộ</h3>
                            <div className={cx('inputs')}>
                                {inputsMother.map((input, index) => (
                                    <div className={cx('input')} key={`mother-${index}`}>
                                        <Input {...input} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <div className={cx('submit')}>
                    <Button btn onClick={handleSubmitEditprofile}>
                        Cập nhật
                    </Button>
                </div>
            </div>

            {loading && <Loading />}
        </div>
    );
}

export default Index;
