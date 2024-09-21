import { useEffect } from 'react';
import { useHandleDispatch } from '../services/useHandleDispatch';
import { useSelector } from 'react-redux';
import { authUser, userToken } from '../redux/selectors';

const useTokenRefresh = () => {
    const token = useSelector(userToken);
    const user = useSelector(authUser);
    const { refreshtoken } = useHandleDispatch();

    useEffect(() => {
        if (token && user) {
            const checkTokenExpiry = async () => {
                const dateNow = localStorage.getItem('DateNow');
                if (dateNow && Date.now() - parseInt(dateNow) >= 50 * 60 * 1000) {
                    try {
                        await refreshtoken(token);
                    } catch (error) {
                        console.error(error);
                    }
                }
            };
            const interval = setInterval(checkTokenExpiry, 5 * 60 * 1000);
            return () => clearInterval(interval);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, user]);
};

export default useTokenRefresh;
