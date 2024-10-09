import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './news.module.scss';
import Input from '../../../Component/Input/Index';
import Button from '../../../Component/button/Button';
import {
    showBeforeDelete,
    showErrorMessage,
    showSuccessMessage,
    showWarningMessage,
} from '../../../Component/Notification/Index';
import Loading from '../../../Component/Loading/Index';
import { useHandleDispatch } from '../../../services/useHandleDispatch';
import { News, NewsTotalElements, userToken } from '../../../redux/selectors';
import { useSelector } from 'react-redux';
import Table from '../../../Component/MuiTable/Index';
import AddIcon from '@mui/icons-material/Add';

const cx = classNames.bind(styles);

const Index = () => {
    const token = useSelector(userToken);
    const news = useSelector(News);
    const totalElements = useSelector(NewsTotalElements);
    const { getallnews, deletenews, deletesection } = useHandleDispatch();

    const [loading, setLoading] = useState(false);
    const [editting, setEditting] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [currentPage, setCrrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(7);
    const [latestNews, setLatestNews] = useState({
        title: '',
        content: '',
        mainImage: null,
    });
    useEffect(() => {
        getallnews(currentPage, pageSize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const headCells = [
        { id: 'title', label: 'Tiêu đề' },
        { id: 'imageMainUrl', label: 'Ảnh chính' },
        { id: 'createdAt', label: 'Ngày tạo' },
    ];
    const handleChangeLatestNews = (e) => {
        setLatestNews((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleMainImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLatestNews((prev) => ({ ...prev, mainImage: file }));
        }
    };

    const [sections, setSections] = useState([]);

    const [sectionInput, setSectionInput] = useState({
        titleSection: '',
        contentSection: '',
        images: [],
    });
    const handleChangeSectionInput = (e) => {
        const { name, value } = e.target;
        setSectionInput((prev) => ({ ...prev, [name]: value }));
    };
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setSectionInput((prev) => ({ ...prev, images: files }));
    };
    const handleAddSection = () => {
        if (editIndex !== null) {
            const updatedSections = [...sections];
            updatedSections[editIndex] = sectionInput;
            setSections(updatedSections);
            setEditIndex(null);
        } else {
            if (
                sectionInput.titleSection !== '' ||
                sectionInput.contentSection !== '' ||
                sectionInput.images.length > 0
            ) {
                setSections((prev) => [...prev, sectionInput]);
            } else {
                showErrorMessage('không có gì để thêm');
            }
        }
        setSectionInput({ titleSection: '', contentSection: '', images: [] });
    };
    const handleSubmit = async () => {
        if (latestNews.title !== '' && latestNews.content !== '' && latestNews.mainImage !== null) {
            setLoading(true);
            const formData = new FormData();
            if (latestNews.newsId) {
                formData.append('newsId', latestNews.newsId);
            }
            formData.append('title', latestNews.title);
            formData.append('content', latestNews.content);
            formData.append('mainImage', latestNews.mainImage);

            const response = await fetch('http://localhost:8888/api/v1/news/pl/news/create', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });
            const responseData = await response.json();
            if (responseData?.code === 1000) {
                for (const section of sections) {
                    const sectionFormData = new FormData();
                    if (section.sectionId) {
                        sectionFormData.append('sectionId', section.sectionId);
                    }
                    sectionFormData.append('newsId', responseData.result.id);
                    sectionFormData.append('titleSection', section.titleSection);
                    sectionFormData.append('contentSection', section.contentSection);

                    if (section.images) {
                        section.images.forEach((file) => {
                            sectionFormData.append('images', file);
                        });
                    }

                    await fetch('http://localhost:8888/api/v1/news/pl/contentSection/create', {
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        body: sectionFormData,
                    });
                }
                showSuccessMessage('Thành công');
                if (!editting) {
                    setLatestNews({ title: '', content: '', mainImage: null });
                    setSections([]);
                }
            } else {
                showErrorMessage('Không thể lưu news');
            }
            getallnews(currentPage, pageSize);
            setLoading(false);
        } else {
            showWarningMessage('Tiêu đề, nội dung, hình ảnh chính không được để trống');
        }
    };
    const handleDeleteSection = (e, indexToDelete) => {
        e.stopPropagation();
        if (editting && sections[indexToDelete]?.sectionId) {
            showBeforeDelete('Bạn chắc muốn xóa đoạn này chứ?').then(async (result) => {
                if (result.isConfirmed) {
                    const response = await deletesection(token, sections[indexToDelete]?.sectionId);
                    if (response.code === 1000) {
                        showSuccessMessage(response.result);
                        setSections((prevSections) => prevSections.filter((_, index) => index !== indexToDelete));
                        getallnews(currentPage, pageSize);
                    } else {
                        showErrorMessage(response.message);
                    }
                } else {
                    showErrorMessage('Bạn đừng phân vân nữa:)');
                }
            });
        } else {
            setSections((prevSections) => prevSections.filter((_, index) => index !== indexToDelete));
        }
    };

    const handleDelete = async (e, dataDel) => {
        e.preventDefault();
        e.stopPropagation();
        showBeforeDelete(`Bạn chắc muốn xóa tin tức này chứ ?`).then(async (result) => {
            if (result.isConfirmed) {
                const response = await deletenews(token, dataDel);
                if (response.code === 1000) {
                    showSuccessMessage(response.result);
                    getallnews(currentPage, pageSize);
                } else {
                    showErrorMessage(response.message);
                }
            } else {
                showErrorMessage('Bạn đừng phân vân nữa:)');
            }
        });
    };

    const handleShowEdit = async (e, row) => {
        e.preventDefault();
        e.stopPropagation();
        setEditting(true);
        setLatestNews({
            newsId: row.id,
            title: row.title || '',
            content: row.content || '',
            mainImage: row.imageMainUrl || null,
        });
        const newSections = row.contentSectionResponses.map((section) => ({
            sectionId: section.id,
            titleSection: section.sectionTitle,
            contentSection: section.sectionContent,
            images: section.imagesResponseList.map((i) => i.imageUrl),
        }));
        setSections(newSections);
    };
    const handleEditSection = (index) => {
        const sectionToEdit = sections[index];
        setSectionInput(sectionToEdit);
        setEditIndex(index);
    };

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('content')}>
                    <div className={cx('content-main')}>
                        <h2>NỘI DUNG CHÍNH</h2>
                        <Input
                            type="text"
                            name="title"
                            placeholder="Nhập tiêu đề chính"
                            errorMessage="Không được để trống"
                            handleChange={handleChangeLatestNews}
                            value={latestNews.title}
                            required
                        />
                        <textarea
                            name="content"
                            className={cx('content-area')}
                            placeholder="Nhập nội dung chính ở đây"
                            value={latestNews.content}
                            onChange={handleChangeLatestNews}
                            rows={6}
                        />
                        <input type="file" accept="image/*" onChange={handleMainImageChange} />
                    </div>

                    <div className={cx('content-section')}>
                        <div className={cx('content')}>
                            <h2>CÁC ĐOẠN TIN TỨC</h2>
                            <Input
                                type="text"
                                name="titleSection"
                                placeholder="Nhập tiêu đề"
                                handleChange={handleChangeSectionInput}
                                value={sectionInput.titleSection}
                            />
                            <textarea
                                name="contentSection"
                                className={cx('content-area')}
                                placeholder="Nhập nội dung ở đây"
                                value={sectionInput.contentSection}
                                onChange={handleChangeSectionInput}
                                rows={15}
                            />
                            <div className={cx('input-image')}>
                                <input type="file" multiple accept="image/*" onChange={handleImageChange} />
                                <div className={cx('images')}>
                                    {sectionInput?.images?.map((image, imgIndex) => (
                                        <img
                                            key={imgIndex}
                                            src={image instanceof File ? URL.createObjectURL(image) : image}
                                            alt={`anh`}
                                            className={cx('image-preview')}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <Button btn onClick={handleAddSection}>
                            <AddIcon />
                        </Button>
                    </div>
                    <Button btn onClick={handleSubmit}>
                        Lưu tin tức
                    </Button>
                    {editting && (
                        <Button
                            btn
                            onClick={() => {
                                setLatestNews({ title: '', content: '', mainImage: null });
                                setSections([]);
                                setSectionInput({ titleSection: '', contentSection: '', images: [] });
                                setEditting(false);
                            }}
                        >
                            Thoát chế độ chỉnh sửa
                        </Button>
                    )}
                </div>
                <div className={cx('demo')}>
                    <div className={cx('demo-title')}>{latestNews.title}</div>
                    <div className={cx('demo-content')}>{latestNews.content}</div>
                    {latestNews?.mainImage && (
                        <div className={cx('demo-img')}>
                            <img
                                src={
                                    latestNews.mainImage instanceof File
                                        ? URL.createObjectURL(latestNews?.mainImage)
                                        : latestNews.mainImage
                                }
                                alt="Uploaded"
                                className={cx('image-preview')}
                            />
                        </div>
                    )}
                    <div className={cx('sections-display')}>
                        {sections?.map((section, index) => (
                            <div key={index} className={cx('section-item')} onClick={() => handleEditSection(index)}>
                                <button className={cx('delete-btn')} onClick={(e) => handleDeleteSection(e, index)}>
                                    x
                                </button>
                                <div className={cx('demo-title-section')}>{section.titleSection}</div>
                                <div className={cx('demo-content')}>{section.contentSection}</div>
                                <div className={cx('demo-img')}>
                                    {section?.images?.map((image, imgIndex) => (
                                        <img
                                            key={imgIndex}
                                            src={image instanceof File ? URL.createObjectURL(image) : image}
                                            alt={`anh`}
                                            className={cx('image-preview')}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={cx('table')}>
                <Table
                    title="QUẢN LÝ NEWS"
                    headCells={headCells}
                    data={news}
                    handleShowEdit={handleShowEdit}
                    handleDelete={handleDelete}
                    action
                    checkBox
                    currentPage={currentPage}
                    setCrrentPage={setCrrentPage}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                    TotalElements={totalElements}
                />
            </div>
            {loading && <Loading />}
        </>
    );
};

export default Index;
