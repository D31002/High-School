import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import Styles from './MuiTable.module.scss';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import Head from './Head/Index';
import Body from './body/Index';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';

const cx = classNames.bind(Styles);

function Index({
    title,
    headCells,
    details,
    data = [],
    loading,
    handleShowEdit,
    handleDelete,
    handleSearch = () => {},
    action = false,
    checkBox = false,
    noPagination = false,
    currentPage,
    setCrrentPage,
    pageSize,
    setPageSize,
    TotalElements,
}) {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState();
    const [selected, setSelected] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        handleSearch(searchQuery);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery]);

    const handleChangePage = (event, newPage) => {
        setCrrentPage(newPage + 1);
    };

    const handleChangepageSize = (event) => {
        setPageSize(+event.target.value);
        setCrrentPage(1);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = data.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };

    const isAllSelected = data && data.length > 0 && selected.length === data.length;

    const stableSort = (array, comparator) => {
        if (!Array.isArray(array)) {
            return [];
        }

        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) {
                return order;
            }
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    };

    const getComparator = (order, orderBy) => {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    };

    const getNestedValue = (obj, path) => {
        if (!path || typeof path !== 'string') return '';
        return path.split('.').reduce((acc, key) => (acc && acc[key] ? acc[key] : ''), obj);
    };

    const descendingComparator = (a, b, orderBy) => {
        const aValue = getNestedValue(a, orderBy);
        const bValue = getNestedValue(b, orderBy);
        if (bValue < aValue) {
            return -1;
        }
        if (bValue > aValue) {
            return 1;
        }
        return 0;
    };
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const sortedData = useMemo(() => {
        return stableSort(data || [], getComparator(order, orderBy));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, order, orderBy]);

    return (
        <div className={cx('table')}>
            <Paper sx={{ width: '100%' }}>
                <TextField
                    label="Search"
                    variant="outlined"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    sx={{ width: '200px' }}
                    size="small"
                    InputProps={{
                        style: { fontSize: '1.4rem' },
                    }}
                    InputLabelProps={{
                        style: { fontSize: '1.4rem' },
                    }}
                />
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <Head
                            title={title}
                            headCells={headCells}
                            handleRequestSort={handleRequestSort}
                            order={order}
                            orderBy={orderBy}
                            numSelected={selected.length}
                            onSelectAllClick={handleSelectAllClick}
                            isAllSelected={isAllSelected}
                            rowCount={TotalElements}
                            handleDelete={handleDelete}
                            selected={selected}
                            setSelected={setSelected}
                            action={action}
                            checkBox={checkBox}
                        />
                        <Body
                            data={sortedData}
                            loading={loading}
                            headCells={headCells}
                            details={details}
                            handleShowEdit={handleShowEdit}
                            selected={selected}
                            setSelected={setSelected}
                            handleClick={handleClick}
                            action={action}
                            checkBox={checkBox}
                        />
                    </Table>
                </TableContainer>
                {!noPagination && (
                    <TablePagination
                        rowsPerPageOptions={[5, 7, 10]}
                        component="div"
                        count={TotalElements || 0}
                        rowsPerPage={pageSize || 5}
                        page={currentPage - 1 || 0}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangepageSize}
                        sx={{
                            '& .MuiTablePagination-toolbar': {
                                minHeight: '70px',
                            },
                            '& .MuiTablePagination-input': {
                                fontSize: '1.2rem',
                            },
                            '& .MuiTablePagination-selectLabel': {
                                fontSize: '1.2rem',
                            },
                            '& .MuiTablePagination-displayedRows': {
                                fontSize: '1.2rem',
                            },
                            '& .MuiTablePagination-actions': {
                                fontSize: '1.2rem',
                            },
                        }}
                    />
                )}
            </Paper>
        </div>
    );
}

export default Index;
