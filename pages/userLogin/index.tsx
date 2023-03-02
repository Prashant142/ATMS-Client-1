import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import TablePagination from '@mui/material/TablePagination';

interface Column {
    id: 'code' | 'date' | 'desc' | 'dur' | 'emails' | 'files' | 'notify' | 'time';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
  }

  const columns: readonly Column[] = [
    { id: 'code', label: 'Code', minWidth: 170 },
    { id: 'date', label: 'Date', minWidth: 100 },
    {
      id: 'desc',
      label: 'Description',
      minWidth: 170,
    },
    {
      id: 'dur',
      label: 'Duration',
      minWidth: 100,
    },
    {
      id: 'emails',
      label: 'Emails',
      minWidth: 70,
    },
    {
        id: 'files',
        label: 'Files',
        minWidth: 70,
    },
    {
        id: 'notify',
        label: 'Notify',
        minWidth: 70,
    },
    {
        id: 'time',
        label: 'Time',
        minWidth: 70,
    },
  ];

  interface Data {
    code: string;
    date: string;
    desc: string;
    dur: string;
    emails: string;
    files: number;
    notify: boolean;
    time: string;
  }

  function createData(
    code: string,
    date: string,
    desc: string,
    dur: string,
    emails: number,
    files: number,
    notify: string,
    time: string,
  ) {
    return { code, date, desc, dur, emails, files, notify, time };
  }

  const rows = [
    createData("S0F55O4342", "3 Mar 2021", "fdfferfberfberjh", "0.1", 1, 2, "False", "00-28" ),
    createData("S0F55O4342", "3 Mar 2021", "fdfferfberfberjh", "0.1", 1, 2, "False", "00-28" )
  ]

const Audit = () => {

    const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

    return(
        <div style={{ width: "70%" }}>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </div>
    )
}

export default Audit;