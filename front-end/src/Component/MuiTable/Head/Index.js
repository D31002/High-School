import React from 'react';
import classNames from 'classnames/bind';
import Styles from './Head.module.scss';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import { visuallyHidden } from '@mui/utils';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';

const cx = classNames.bind(Styles);

function Index({
    title,
    headCells,
    handleRequestSort,
    order,
    orderBy,
    numSelected,
    onSelectAllClick,
    isAllSelected,
    rowCount,
    handleDelete,
    selected,
    setSelected,
    action,
    checkBox,
}) {
    return (
        <TableHead className={cx('TableHead')}>
            <TableRow>
                <TableCell colSpan={headCells?.length + 2 || 0} className={cx('titleCell')}>
                    <div className={cx('titleContainer')}>
                        {selected.length <= 0 ? <span>{title}</span> : `${selected.length} được chọn `}
                        {selected.length > 0 && (
                            <span
                                onClick={async () => {
                                    try {
                                        await handleDelete(selected);
                                        setSelected([]);
                                    } catch (error) {
                                        console.error(error);
                                    }
                                }}
                            >
                                <DeleteIcon className={cx('icon')} />
                            </span>
                        )}
                    </div>
                </TableCell>
            </TableRow>
            <TableRow>
                {checkBox && (
                    <TableCell padding="checkbox">
                        <Checkbox
                            color="primary"
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={isAllSelected}
                            onChange={onSelectAllClick}
                            inputProps={{
                                'aria-label': 'select all desserts',
                            }}
                        />
                    </TableCell>
                )}
                {headCells?.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        className={cx('label')}
                        align={headCell.numeric ? 'right' : 'left'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={(event) => handleRequestSort(event, headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
                {action && <TableCell className={cx('label')}>Actions</TableCell>}
            </TableRow>
        </TableHead>
    );
}

export default Index;
