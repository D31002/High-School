import React, { useEffect } from 'react';
import { useHandleDispatch } from '../../../services/useHandleDispatch';
import { useSelector } from 'react-redux';
import { userToken, authUser, Teachs, TeachLoading, schoolYears } from '../../../redux/selectors';
import MuiTable from '../../../Component/MuiTable/Index';
import Loading from '../../../Component/Loading/Index';

function Index() {
    const { getschedulesofteacherbySchoolYearId } = useHandleDispatch();
    const token = useSelector(userToken);
    const user = useSelector(authUser);
    const teachs = useSelector(Teachs);
    const teachLoading = useSelector(TeachLoading);
    const SchoolYears = useSelector(schoolYears);

    useEffect(() => {
        getschedulesofteacherbySchoolYearId(token, user.id, SchoolYears[0]?.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const headCells = [
        { id: 'dayOfWeek', label: 'Thứ' },
        { id: 'lesson.lesson', label: 'Tiết' },
        { id: 'classEntityResponse.name', label: 'Lớp' },
        { id: 'subjectResponse.name', label: 'Môn' },
    ];

    const dayMap = {
        SUNDAY: 'Chủ Nhật',
        MONDAY: 'Thứ Hai',
        TUESDAY: 'Thứ Ba',
        WEDNESDAY: 'Thứ Tư',
        THURSDAY: 'Thứ Năm',
        FRIDAY: 'Thứ Sáu',
        SATURDAY: 'Thứ Bảy',
    };

    const convertedTeachs = Array.isArray(teachs)
        ? teachs.map((teach) => ({
              ...teach,
              dayOfWeek: dayMap[teach.dayOfWeek],
          }))
        : [];

    const today = dayMap[Object.keys(dayMap)[new Date().getDay()]];
    const todayTeachs = convertedTeachs.filter((teach) => teach.dayOfWeek === today);

    return (
        <div>
            <MuiTable title="LỊCH GIẢNG DẠY HÔM NAY" headCells={headCells} data={todayTeachs} />

            <div style={{ marginTop: '20px' }}>
                <MuiTable title="LỊCH GIẢNG DẠY TUẦN" headCells={headCells} data={convertedTeachs} />
            </div>

            {teachLoading && <Loading />}
        </div>
    );
}

export default Index;
