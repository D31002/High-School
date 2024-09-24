import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Styles from './thongke.module.scss';
import SelectOption from '../../../Component/SelectOption/Index';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { useHandleDispatch } from '../../../services/useHandleDispatch';
import { AcademicPerformance, schoolYears, userToken, Classes, Grades, semesters } from '../../../redux/selectors';
import { useSelector } from 'react-redux';

const cx = classNames.bind(Styles);
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

function Index() {
    const [yearId, setYearId] = useState();
    const [gradeId, setGradeId] = useState();
    const [semesterNow, setSemesterNow] = useState();

    const [keyWordSchoolYear, setKeyWordSchoolYear] = useState();
    const [keyWordGrade, setKeyWordGrade] = useState();
    const academicPerformances = useSelector(AcademicPerformance);
    const SchoolYears = useSelector(schoolYears);
    const Semesters = useSelector(semesters);
    const token = useSelector(userToken);
    const classes = useSelector(Classes);
    const grades = useSelector(Grades);
    const {
        getallschoolyear,
        getallAcademicResults,
        getallAcademicPerformance,
        getallclassesbyyearandgrade,
        getallgrade,
        getallsemester,
    } = useHandleDispatch();
    const [academicOfstudents, setAcademicOfstudents] = useState([]);

    useEffect(() => {
        getallAcademicPerformance(token);
        getallsemester(token);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        getallschoolyear(keyWordSchoolYear, token);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keyWordSchoolYear]);
    useEffect(() => {
        getallgrade(token);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keyWordGrade]);

    useEffect(() => {
        if (yearId) {
            getallclassesbyyearandgrade(token, yearId, gradeId || '', '');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [yearId, gradeId, semesterNow]);

    useEffect(() => {
        setYearId(SchoolYears[0]?.id);
    }, [SchoolYears]);

    useEffect(() => {
        if (classes.length > 0) {
            const fetchdata = async () => {
                const promises = classes?.map((classRoom) =>
                    getallAcademicResults(token, classRoom?.id, semesterNow?.id),
                );
                const responses = await Promise.all(promises);
                const validResponses = responses.filter((response) => response.code === 1000);
                const academicOfstudentsFilter = validResponses.flatMap((response) => response.result);
                setAcademicOfstudents(academicOfstudentsFilter);
            };
            fetchdata();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [classes]);

    const dataformatOptionOfSchoolYear = SchoolYears.map((year) => ({
        id: year.id,
        nameOption: `${year.schoolYear} - ${year.schoolYear + 1}`,
    }));
    const dataformatOptionOfGrade = grades.map((grade) => ({
        id: grade.id,
        nameOption: `${grade.grade}`,
    }));
    const dataformatOptionOfSemester = Semesters.map((s) => ({
        id: s.id,
        nameOption: `${s.name}`,
    }));

    const handleSearchChangeSchoolYear = (event) => {
        setKeyWordSchoolYear(event.target.value);
    };
    const handleSearchChangeGrade = (event) => {
        setKeyWordGrade(event.target.value);
    };
    const handleChangeOptionSemester = async (id) => {
        setSemesterNow(Semesters?.find((semester) => semester?.id === id));
    };

    const handleChangeOptionSchoolYear = (id) => {
        setYearId(id);
    };
    const handleChangeOptionGrade = (id) => {
        setGradeId(id);
    };

    const performanceStats = academicPerformances.map((performance) => {
        const studentsWithPerformance = academicOfstudents.filter(
            (student) => student.academicPerformance?.name === performance.name,
        );
        return {
            name: performance.name,
            count: studentsWithPerformance.length,
        };
    });
    const meanScoreRanges = academicOfstudents.reduce(
        (acc, academic) => {
            const meanScore = academic?.meanScore;
            if (meanScore < 2) {
                acc['0-2'] += 1;
            } else if (meanScore < 4) {
                acc['2-4'] += 1;
            } else if (meanScore < 6) {
                acc['4-6'] += 1;
            } else if (meanScore < 8) {
                acc['6-8'] += 1;
            } else if (meanScore <= 10) {
                acc['8-10'] += 1;
            }
            return acc;
        },
        {
            '0-2': 0,
            '2-4': 0,
            '4-6': 0,
            '6-8': 0,
            '8-10': 0,
        },
    );

    const pieChartData = {
        labels: performanceStats.map((performance) => performance.name),
        datasets: [
            {
                label: 'Số lượng',
                data: performanceStats.map((performance) => performance.count),
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)', // Xanh ngọc
                    'rgba(255, 99, 132, 0.6)', // Hồng
                    'rgba(255, 206, 86, 0.6)', // Vàng
                    'rgba(54, 162, 235, 0.6)', // Xanh dương
                    'rgba(153, 102, 255, 0.6)', // Tím
                ],
                hoverBackgroundColor: [
                    'rgba(75, 192, 192, 1)', // Xanh ngọc đậm
                    'rgba(255, 99, 132, 1)', // Hồng đậm
                    'rgba(255, 206, 86, 1)', // Vàng đậm
                    'rgba(54, 162, 235, 1)', // Xanh dương đậm
                    'rgba(153, 102, 255, 1)', // Tím đậm
                ],
            },
        ],
    };
    const barChartData = {
        labels: Object.keys(meanScoreRanges),
        datasets: [
            {
                label: 'Số lượng học sinh',
                data: Object.values(meanScoreRanges),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                barPercentage: 0.5,
                categoryPercentage: 0.5,
            },
        ],
    };
    const barChartOptions = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 5,
                },
            },
        },
    };
    const aboveAverageRate =
        academicOfstudents.length > 0
            ? (academicOfstudents.filter((student) => student.meanScore >= 5).length / academicOfstudents.length) * 100
            : 0;
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
                    <SelectOption
                        title="Chọn khối"
                        handleSearchChange={handleSearchChangeGrade}
                        dataOptions={dataformatOptionOfGrade}
                        onclick={(id) => handleChangeOptionGrade(id)}
                        selectedOption={gradeId}
                    />
                    <SelectOption
                        title="Chọn học kỳ"
                        // handleSearchChange={handleSearchChangeSubject}
                        dataOptions={dataformatOptionOfSemester}
                        onclick={(id) => handleChangeOptionSemester(id)}
                        selectedOption={semesterNow?.id}
                    />
                </div>
            </div>
            <p>*Lưu ý: đây là dữ liệu đến thời điểm hiện tại</p>
            <div className={cx('information')}>
                <h2>Một số thông tin</h2>
                <div className={cx('rate')}>{`Tỉ lệ học sinh trên trung bình : ${aboveAverageRate}%`}</div>
                <div className={cx('rate')}>{`Tỉ lệ học sinh dưới trung bình : ${
                    aboveAverageRate && 100 - aboveAverageRate
                }%`}</div>
            </div>
            <div className={cx('chart')}>
                <div className={cx('pie-chart')}>
                    <h2>BIỂU ĐỒ THỐNG KÊ THEO HỌC LỰC</h2>
                    <Pie data={pieChartData} />
                </div>
                <div className={cx('bar-chart')}>
                    <h2>BIỂU ĐỒ THỐNG KÊ THEO ĐIỂM TRUNG BÌNH</h2>
                    <Bar data={barChartData} options={barChartOptions} />
                </div>
            </div>
        </div>
    );
}

export default Index;
