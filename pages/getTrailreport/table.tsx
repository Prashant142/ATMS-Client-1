import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Loader from '@/components/Loader';


interface Column {
  id: 'code' | 'date' | 'description' | 'duration' | 'emails' | 'files' | 'notify'| 'time';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
 
  { id: 'code', label: 'Code', minWidth: 100 },

  {
    id: 'date',
    label: 'Date',
    minWidth: 170,
    // align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },

  {
    id: 'description',
    label: 'Description',
    minWidth: 170,
    align: 'right',
   
  },
  {
    id: 'duration',
    label: 'Duration',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toFixed(4),
  },
  {
    id: 'emails',
    label: 'Emails',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toFixed(4),
  },
  {
    id: 'files',
    label: 'Files',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toFixed(0),
  },
  {
    id: 'notify',
    label: 'Notify',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'time',
    label: 'Time',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
];

interface Data {
  code:string,
  date:string,
  description:string,
  duration:number,
  emails:string,
  files:number,
  notify:string,
  time:string,

}

function createData(
    code:string,
    date:string,
    description:string,
    duration:number,
    emails:string,
    files:number,
    notify:string,
    time:string,
): Data {
 
  return { code,date,description,duration,emails,files,notify,time};
}



export default function StickyHeadTable(props: any) {


    const rows = props.trailData.map((val: any) => {
        console.log(val.description)

        return createData(val.code,val.date,val.desc,val.dur,val.emails,val.files,val.notify,val.time);
    })

  


      console.log(props);



  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden'}}>
      <TableContainer sx={{ maxHeight: 440 ,  }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead >
            <TableRow  >
              {columns.map((column) => (
                <TableCell 
                sx={{background:'black' , color:'white', fontWeight:'bold'}}
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
              .map((row: { [x: string]: any; code: React.Key | null | undefined; }) => {
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
    
  );
}