import React from 'react'
import { 
    Pagination,
    Paper, Stack, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';

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
