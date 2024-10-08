import React, { useEffect, useState } from 'react';
import PageNews from '../Component/Index';
import { useHandleDispatch } from '../../../../services/useHandleDispatch';
import { useSelector } from 'react-redux';
import { News, NewsTotalPages } from '../../../../redux/selectors';

function Index() {
    const news = useSelector(News);
    const totalPages = useSelector(NewsTotalPages);
    const { getallnews } = useHandleDispatch();
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        getallnews(currentPage, 6);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    return (
        <div>
            <PageNews data={news} currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
        </div>
    );
}

export default Index;
