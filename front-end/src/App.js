import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { pageRoutes } from './routes';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { authUser } from './redux/selectors';
import Headeronly from './Admin/component/layout/headeronly/Headeronly';
import DefaultLayout from './Admin/component/layout/defaultlayout/DefaultLayout';
import HearderAndFooter from './User/Layout/HeaderAndFooter/Index';
import Gototop from './Component/GoToTop/Index';
import useTokenRefresh from './Scheduler/useTokenRefresh';
import { showErrorMessage } from './Component/Notification/Index';
import { useHandleDispatch } from './services/useHandleDispatch';
import { motion } from 'framer-motion';

function App() {
    const user = useSelector(authUser);
    const { logoutUser } = useHandleDispatch();
    useTokenRefresh();

    const RequireAuth = ({ children, requireAuth, allowedRoles }) => {
        const location = useLocation();
        if (requireAuth && !user) {
            return <Navigate to="/login" state={{ from: location.pathname }} />;
        }

        if (
            allowedRoles &&
            !user?.userProfileResponse?.userResponse?.roles.some((role) => allowedRoles.includes(role.name))
        ) {
            logoutUser();
            showErrorMessage('bạn không có quyền truy cập');
            return <Navigate to="/login" state={{ from: location.pathname }} />;
        }
        return children;
    };

    return (
        <motion.div initial="hidden" animate="show" className="App">
            <Routes>
                {pageRoutes.map((item, index) => {
                    let Layout;

                    if (item.path === '/profile') {
                        if (user?.userProfileResponse?.userType === 'student') {
                            Layout = HearderAndFooter;
                        } else {
                            Layout = Headeronly;
                        }
                    } else {
                        if (item.layout === DefaultLayout) {
                            Layout = item.layout;
                        } else if (item.layout === Headeronly) {
                            Layout = item.layout;
                        } else if (item.layout === null) {
                            Layout = Fragment;
                        } else if (item.layout === HearderAndFooter) {
                            Layout = item.layout;
                        }
                    }

                    return (
                        <Route
                            key={index}
                            path={item.path}
                            element={
                                <Layout>
                                    <RequireAuth requireAuth={item.requireAuth} allowedRoles={item.allowedRoles}>
                                        <item.Component />
                                    </RequireAuth>
                                </Layout>
                            }
                        />
                    );
                })}
            </Routes>
            <Gototop />
        </motion.div>
    );
}

export default App;
