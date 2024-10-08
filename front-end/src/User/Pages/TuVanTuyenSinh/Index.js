import React, { useState } from 'react';
import classNames from 'classnames/bind';
import Styles from './Tuvan.module.scss';

const cx = classNames.bind(Styles);

function Index() {
    const [formData, setFormData] = useState({
        major: '',
        totalScore: '',
        method: '',
        block: '',
        location: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('heading')}>ĐỊNH HƯỚNG NGHỀ NGHIỆP</div>
            </div>
            <div className={cx('container')}>
                <h1>TƯ VẤN CHỌN TRƯỜNG ĐẠI HỌC NĂM 2024</h1>
                <p>
                    Tư vấn chọn trường đại học 2024 bằng cách chọn ngành/nhóm ngành, nhập tổng điểm dự kiến và chọn
                    phương thức xét tuyển, tổ hợp xét tuyển trong đợt xét tuyển ĐH 2024.
                </p>
                <form onSubmit={handleSubmit}>
                    <div className={cx('form-group')}>
                        <label>Chọn ngành, nhóm ngành</label>
                        <select name="major" value={formData.major} onChange={handleChange} className={cx('select')}>
                            <option value="">Tất cả các ngành</option>
                            <option value="Kinh tế">Kinh tế</option>
                            <option value="Công nghệ thông tin">Công nghệ thông tin</option>
                            <option value="Y dược">Y dược</option>
                        </select>
                    </div>

                    <div className={cx('form-group')}>
                        <label>Nhập tổng điểm của bạn</label>
                        <input
                            type="text"
                            name="totalScore"
                            value={formData.totalScore}
                            onChange={handleChange}
                            placeholder="Tổng điểm 3 môn dự kiến"
                            className={cx('input')}
                        />
                    </div>

                    <div className={cx('form-group')}>
                        <label>Phương thức xét tuyển</label>
                        <select name="method" value={formData.method} onChange={handleChange} className={cx('select')}>
                            <option value="">--Phương thức xét tuyển--</option>
                            <option value="Thi THPT">Thi THPT</option>
                            <option value="Xét học bạ">Xét học bạ</option>
                            <option value="Kết hợp">Kết hợp</option>
                        </select>
                    </div>

                    <div className={cx('form-group')}>
                        <label>Khối xét tuyển</label>
                        <select name="block" value={formData.block} onChange={handleChange} className={cx('select')}>
                            <option value="">--Khối xét tuyển--</option>
                            <option value="A">A</option>
                            <option value="A1">A1</option>
                            <option value="B">B</option>
                        </select>
                    </div>

                    <div className={cx('form-group')}>
                        <label>Tỉnh thành</label>
                        <select
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className={cx('select')}
                        >
                            <option value="">--Tất cả các tỉnh/thành phố--</option>
                            <option value="Hà Nội">Hà Nội</option>
                            <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                            <option value="Đà Nẵng">Đà Nẵng</option>
                        </select>
                    </div>

                    <button type="submit" className={cx('submit-btn')}>
                        TÌM TRƯỜNG
                    </button>
                </form>
            </div>
            {/* <div className={cx('preview')}>
                <h2>Học sinh nên làm gì để tự định hướng nghề nghiệp cho bản thân?</h2>
                <div className={cx('time')}>
                    <span className={cx('date-submit')}>Ngày đăng: 21/12/2021</span>
                    <span className={cx('date-update')}>Ngày cập nhật: 21/12/2021</span>
                    <span className={cx('author')}>Tác giả: Nguyễn Đại</span>
                </div>
            </div> */}
            {/* <div className={cx('content')}>
                <div className={cx('container')}>
                    <div className={cx('left')}>
                        <Button className={cx('question')} to="/">
                            <FontAwesomeIcon icon={faCheckCircle} />
                            <span>Tại sao phụ huynh học sinh lựa chọn </span>
                        </Button>
                        <Button className={cx('question')} to="/">
                            <FontAwesomeIcon icon={faInfoCircle} />
                            <span>câu hỏi thường gặp</span>
                        </Button>
                    </div>
                    <div className={cx('right')}>
                        <div className={cx('form')}>
                            <h2 className={cx('heading')}>Đăng ký nhận thông tin tuyển sinh</h2>
                            <div className={cx('form-input')}>
                                <input type="text" placeholder="Họ và tên học sinh" />
                            </div>
                            <div className={cx('form-input-2')}>
                                <input type="text" placeholder="năm sinh" />
                                <input type="text" placeholder="Tỉnh/TP" />
                            </div>
                            <div className={cx('form-input-2')}>
                                <input type="text" placeholder="SĐT phụ huynh" />
                                <input type="text" placeholder="Email" />
                            </div>
                            <div className={cx('form-input')}>
                                <input type="text" placeholder="Link facebook" />
                            </div>
                            <div className={cx('check-box')}>
                                <span>Đăng ký (có thể chọn nhiều nhu cầu)</span>
                                <div className={cx('list-checkbox')}>
                                    <div className={cx('item-checkbox')}>
                                        <input type="checkbox" />
                                        <span>xét tuyển</span>
                                    </div>
                                    <div className={cx('item-checkbox')}>
                                        <input type="checkbox" />
                                        <span>Tham quan</span>
                                    </div>
                                    <div className={cx('item-checkbox')}>
                                        <input type="checkbox" />
                                        <span>Học bổng</span>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('text')}>
                                <span>Thông tin Phụ huynh/Học sinh muốn được tư vấn?</span>
                                <textarea typeof="text" />
                            </div>
                            <div className={cx('btn-submit')}>
                                <Button className={cx('submit')} to="/">
                                    Gửi Đăng Ký
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    );
}

export default Index;
