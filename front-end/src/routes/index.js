import Login from '../Component/Login/Index';
import Profile from '../Component/Profile/Index';

//ADMIN
import Headeronly from '../Admin/component/layout/headeronly/Headeronly';
import DefaultLayout from '../Admin/component/layout/defaultlayout/DefaultLayout';

import Home from '../Admin/pages/TrangChu/Index';
import QuanLyDiem from '../Admin/pages/QuanLyDiem/Diem';
import XepGiangDay from '../Admin/pages/XepGiangDay/Index';
import XemGiangDay from '../Admin/pages/XemLichGiangDay/Index';
import QuanLyHocSinh from '../Admin/pages/QuanLyHocSinh/Hocsinh';
import QuanLyGiaoVien from '../Admin/pages/QuanLyGiaoVien/Index';
import DanhSachLopHocTheoKhoi from '../Admin/pages/QuanLyLopHoc/DanhSachLopTheoKhoi/Index';
import DanhSachLopHocTheoNam from '../Admin/pages/QuanLyLopHoc/DanhSachLopHocMoiNam/Index';
import ThongKe from '../Admin/pages/ThongKe/Index';
import News from '../Admin/pages/QuanLyNews/Index';

//USER
import HearderAndFooter from '../User/Layout/HeaderAndFooter/Index';

import HomeUser from '../User/Pages/TrangChu/Home';
import Introduce from '../User/Pages/Introduce/Index';
import TuyenDung from '../User/Pages/TuyenDung/Index';
import Tintuc from '../User/Pages/NewsAndEvents/News/Index';
import DetailNewsAndEvents from '../User/Pages/NewsAndEvents/Detail/Index';
import Sukien from '../User/Pages/NewsAndEvents/Events/Index';
import Lienhe from '../User/Pages/Contact/Index';
import GioiThieuTS from '../User/Pages/GioiThieuTuyenSinh/Index';
import TuVanTuyenSinh from '../User/Pages/TuVanTuyenSinh/Index';
import Diemdanh from '../Admin/pages/QuanLyDiemDanh/diemdanh';
import thongtinlophoc from '../User/Pages/Thongtinlophoc/thongtinlophoc';
import thongtinLop from '../User/Pages/Thongtinlophoc/Lop/Index';
import AcademicResult from '../User/Pages/AcademicResult/Index';

const pageRoutes = [
    { path: '/login', Component: Login, layout: null },
    { path: '/profile', Component: Profile, layout: null },

    //USER
    { path: '/', Component: HomeUser, layout: HearderAndFooter },
    { path: '/gioithieu', Component: Introduce, layout: HearderAndFooter },
    { path: '/tuyendung', Component: TuyenDung, layout: HearderAndFooter },
    { path: '/tin-tuc', Component: Tintuc, layout: HearderAndFooter },
    { path: '/tin-tuc/:newsId', Component: DetailNewsAndEvents, layout: HearderAndFooter },
    { path: '/sukien', Component: Sukien, layout: HearderAndFooter },
    { path: '/lienhe', Component: Lienhe, layout: HearderAndFooter },
    { path: '/tuyensinh/gioithieutuyensinh', Component: GioiThieuTS, layout: HearderAndFooter },
    { path: '/tuvan/nghenghiep', Component: TuVanTuyenSinh, layout: HearderAndFooter },
    { path: '/thongtinlophoc', Component: thongtinlophoc, layout: HearderAndFooter },
    { path: '/thongtinlophoc/:id', Component: thongtinLop, layout: HearderAndFooter },
    {
        path: '/ket-qua-hoc-tap',
        Component: AcademicResult,
        layout: HearderAndFooter,
        requireAuth: true,
        allowedRoles: ['STUDENT'],
    },

    //ADMIN
    { path: '/admin', Component: Home, layout: Headeronly, requireAuth: true },
    {
        path: '/admin/classRoom',
        Component: DanhSachLopHocTheoKhoi,
        layout: Headeronly,
        requireAuth: true,
    },
    {
        path: '/admin/classRoom/:classRoomId/student',
        Component: QuanLyHocSinh,
        layout: DefaultLayout,
        requireAuth: true,
    },
    {
        path: '/admin/classRoom/:classRoomId/score',
        Component: QuanLyDiem,
        layout: DefaultLayout,
        requireAuth: true,
    },
    {
        path: '/admin/Danh-Sach-Lop-Hoc-Theo-Nam',
        Component: DanhSachLopHocTheoNam,
        layout: Headeronly,
        requireAuth: true,
    },
    { path: '/admin/quan-ly-giao-vien', Component: QuanLyGiaoVien, layout: Headeronly, requireAuth: true },
    { path: '/admin/xep-lich-Giang-Day', Component: XepGiangDay, layout: Headeronly, requireAuth: true },
    { path: '/admin/xem-lich-Giang-Day', Component: XemGiangDay, layout: Headeronly, requireAuth: true },
    { path: '/admin/diem-danh', Component: Diemdanh, layout: Headeronly, requireAuth: true },
    { path: '/admin/thong-ke', Component: ThongKe, layout: Headeronly, requireAuth: true },
    { path: '/admin/quan-ly-news', Component: News, layout: Headeronly, requireAuth: true },
];

export { pageRoutes };
