import React, { useState } from 'react';
import classNames from 'classnames/bind';
import Styles from './body.module.scss';

import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import Nodata from '../../NoData/Index';
import ToolTip from '../../Tooltip/Index';

const cx = classNames.bind(Styles);

function Index({
    data,
    loading = false,
    headCells,
    details,
    handleShowEdit,
    selected,
    handleClick,
    action = false,
    checkBox = false,
}) {
    const [openRow, setOpenRow] = useState(null);
    const getNestedValue = (obj, path) => {
        const value = path.split('.').reduce((acc, key) => (acc && acc[key] ? acc[key] : null), obj);

        if (path.includes('gender')) {
            return value === 1 ? 'Nữ' : 'Nam';
        }

        if (typeof value === 'string' && value.match(/\.(jpeg|jpg|gif|png|webp)$/)) {
            return (
                <img
                    src={value instanceof File ? URL.createObjectURL(value) : value}
                    alt="Chưa cập nhật"
                    style={{ maxWidth: '100px', height: 'auto' }}
                />
            );
        }
        if (Array.isArray(value)) {
            return value
                .map((item) => {
                    return item.name ? item.name : item;
                })
                .join(' - ');
        }
        if (typeof value === 'object' && value !== null) {
            let result = '';
            const keys = Object.keys(value);
            for (let i = 0; i < keys?.length; i++) {
                const key = keys[i];
                if (key !== 'id') {
                    result += `${value[key]}${i < keys?.length - 1 ? ' - ' : ''}`;
                }
            }
            return result.trim();
        }

        return value;
    };
    const handleExpandClick = (rowId) => {
        setOpenRow(openRow === rowId ? null : rowId);
    };
    return (
        <TableBody className={cx('TableBody')}>
            {data.length === 0
                ? loading === false && (
                      <TableRow>
                          <TableCell
                              align="center"
                              colSpan={(headCells?.length || 0) + (checkBox ? 1 : 0) + (action ? 1 : 0)}
                          >
                              <Nodata />
                          </TableCell>
                      </TableRow>
                  )
                : data?.map((row, index) => {
                      const isItemSelected = selected.indexOf(row.id) !== -1;
                      const labelId = `enhanced-table-checkbox-${index}`;
                      const isOpen = openRow === row.id;

                      return (
                          <React.Fragment key={index}>
                              <TableRow
                                  hover
                                  onClick={checkBox ? (event) => handleClick(event, row.id) : undefined}
                                  role="checkbox"
                                  aria-checked={isItemSelected}
                                  tabIndex={-1}
                                  selected={isItemSelected}
                                  sx={{ cursor: 'pointer' }}
                              >
                                  {checkBox && (
                                      <TableCell padding="checkbox">
                                          <Checkbox
                                              color="primary"
                                              checked={isItemSelected}
                                              inputProps={{
                                                  'aria-labelledby': labelId,
                                              }}
                                          />
                                      </TableCell>
                                  )}

                                  {headCells.map((cell) =>
                                      cell.hover ? (
                                          <ToolTip content={getNestedValue(row, cell.datahover)} key={cell.id}>
                                              <TableCell className={cx('datarow')}>
                                                  {getNestedValue(row, cell.id) || 'không có dữ liệu'}
                                              </TableCell>
                                          </ToolTip>
                                      ) : (
                                          <TableCell key={cell.id} className={cx('datarow')}>
                                              {getNestedValue(row, cell.id) || 'không có dữ liệu'}
                                          </TableCell>
                                      ),
                                  )}
                                  {action && (
                                      <TableCell className={cx('datarow')}>
                                          <div className={cx('actions')}>
                                              <div className={cx('edit')} onClick={(e) => handleShowEdit(e, row)}>
                                                  <EditIcon />
                                              </div>
                                              {details && (
                                                  <IconButton
                                                      aria-label="expand row"
                                                      size="small"
                                                      onClick={(e) => {
                                                          e.preventDefault();
                                                          e.stopPropagation();
                                                          handleExpandClick(row.id);
                                                      }}
                                                  >
                                                      {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                                  </IconButton>
                                              )}
                                          </div>
                                      </TableCell>
                                  )}
                              </TableRow>
                              {details && (
                                  <TableRow key={`details-${row.id}`}>
                                      <TableCell
                                          style={{ paddingBottom: 0, paddingTop: 0 }}
                                          colSpan={(headCells?.length || 0) + (checkBox ? 1 : 0) + (action ? 1 : 0)}
                                      >
                                          <Collapse in={isOpen} timeout="auto" unmountOnExit>
                                              <Box sx={{ margin: 1 }}>
                                                  <Typography variant="h6" gutterBottom component="div">
                                                      THÔNG TIN CHI TIẾT
                                                  </Typography>
                                                  <Table size="small" aria-label="details" sx={{ minWidth: 300 }}>
                                                      <TableHead>
                                                          <TableRow>
                                                              {details.map((detail) => (
                                                                  <TableCell
                                                                      key={`header-${detail.id}`}
                                                                      sx={{ fontSize: '1.3rem' }}
                                                                  >
                                                                      {detail.label}
                                                                  </TableCell>
                                                              ))}
                                                          </TableRow>
                                                      </TableHead>
                                                      <TableBody>
                                                          <TableRow>
                                                              {details.map((detail) => (
                                                                  <TableCell
                                                                      key={`data-${detail.id}`}
                                                                      sx={{ fontSize: '1.3rem' }}
                                                                  >
                                                                      {getNestedValue(row, detail.id) ||
                                                                          'không có dữ liệu'}
                                                                  </TableCell>
                                                              ))}
                                                          </TableRow>
                                                      </TableBody>
                                                  </Table>
                                              </Box>
                                          </Collapse>
                                      </TableCell>
                                  </TableRow>
                              )}
                          </React.Fragment>
                      );
                  })}
        </TableBody>
    );
}

export default Index;
