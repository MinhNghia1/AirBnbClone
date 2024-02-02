import React from 'react'
import { 
    Pagination,
    Paper,
    Stack,
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableFooter, 
    TableHead, 
    TableRow 
} from '@mui/material';

// function TablePaginationActions(props) {
//     const theme = useTheme();
//     const { count, page, rowsPerPage, onPageChange } = props;
    
//     const handleFirstPageButtonClick = (event) => {
//         onPageChange(event, 0);
//     };
    
//     const handleBackButtonClick = (event) => {
//         onPageChange(event, page - 1);
//     };
    
//     const handleNextButtonClick = (event) => {
//         onPageChange(event, page + 1);
//     };
    
//     const handleLastPageButtonClick = (event) => {
//         onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
//     };
    
//     return (
//         <Box sx={{ flexShrink: 0, ml: 2.5 }}>
//         <IconButton
//           onClick={handleFirstPageButtonClick}
//           disabled={page === 0}
//           aria-label="first page"
//         >
//           {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
//         </IconButton>
//         <IconButton
//           onClick={handleBackButtonClick}
//           disabled={page === 0}
//           aria-label="previous page"
//           >
//           {theme.direction === "rtl" ? (
//             <KeyboardArrowRight />
//             ) : (
//                 <KeyboardArrowLeft />
//                 )}
//         </IconButton>
//         <IconButton
//           onClick={handleNextButtonClick}
//           disabled={page >= Math.ceil(count / rowsPerPage) - 1}
//           aria-label="next page"
//           >
//           {theme.direction === "rtl" ? (
//             <KeyboardArrowLeft />
//             ) : (
//                 <KeyboardArrowRight />
//                 )}
//         </IconButton>
//         <IconButton
//           onClick={handleLastPageButtonClick}
//           disabled={page >= Math.ceil(count / rowsPerPage) - 1}
//           aria-label="last page"
//           >
//           {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
//         </IconButton>
//       </Box>
//     );
// }

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function AdminLocation() {

    return (
        <div style={{ width: "90%", marginTop: "100px" }}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Mã vị Trí</TableCell>
                            <TableCell align="right">Tên</TableCell>
                            <TableCell align="right">Hình Ảnh</TableCell>
                            <TableCell align="right">Quốc Gia</TableCell>
                            <TableCell align="right">Tỉnh Thành</TableCell>
                            <TableCell align="right">Thao Tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.calories}</TableCell>
                                <TableCell align="right">{row.fat}</TableCell>
                                <TableCell align="right">{row.carbs}</TableCell>
                                <TableCell align="right">{row.protein}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <Stack spacing={2}>
                                <Pagination count={10} color="primary" />
                            </Stack>
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </div>
    )
}
