import React, { useEffect, useState } from 'react'
import {
    Box,
    IconButton,
    Pagination,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip
} from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import LoadingPage from '../../../../Components/LoadingPage/LoadingPage';
import { getLocation, getLocationByPageSize, removeLocation } from "../../../../Apis/viTri"

export default function AdminLocation() {
    const [numberPage, setNumberPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);
    const [infoLocation, setInfoLocation] = useState([]);


    useEffect(() => {
        if (location) {
            setFilteredLocation(location); // Ban đầu, filteredLocation bằng danh sách customers
        }
        handleGetListLocationPage(numberPage);
        console.log(numberPage);
    }, [location, numberPage]);

    if (isLoading) {
        return <LoadingPage />;
    }
    const getList = async () => {
        try {
            const resp = await getLocation();
            const numberLocation = Math.ceil(resp.length / 8);
            setTotalPages(numberLocation);
        } catch (error) {
            console.error(error);
        }
    };
    const handleGetListLocationPage = async (numberPage) => {
        try {
            const resp = await getLocationByPageSize(numberPage);
            setInfoLocation(resp.data);
        } catch (error) {
            console.error(error);
        }
    };
    const handleChangePage = (event, value) => {
        setNumberPage(value);
    };
    return (
        <div style={{ width: "100%", marginTop: "100px" }}>
            {/* <Box height={100} />
            <Box display={"flex"} justifyContent={"right"} mb={2}>
                <Box
                    sx={{
                        width: 500,
                        maxWidth: "100%",
                        marginRight: "16px",
                        display: "flex",
                    }}
                >
                    <TextField
                        fullWidth
                        label="Tìm kiếm theo vị trí"
                        id="fullWidth"
                        color="secondary"
                        value={searchQuery}
                        onChange={handleSearchInputChange} // Handle input change
                        onKeyDown={handleEnterKeyDown}
                    />
                    <Button
                        variant="contained"
                        color="info"
                        onClick={() => {
                            filterLocations();
                        }}
                    >
                        <SearchIcon />
                    </Button>
                </Box>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                        setOpenAddLocation(true);
                    }}
                >
                    Thêm vị trí
                </Button>
            </Box> */}
            <TableContainer >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead >
                        <TableRow className="fw-bold">
                            <TableCell style={{ fontSize: "14px", fontWeight: "bold" }} align='left'>Mã vị Trí</TableCell>
                            <TableCell style={{ fontSize: "14px", fontWeight: "bold" }} align="left">Tên</TableCell>
                            <TableCell style={{ fontSize: "14px", fontWeight: "bold" }} align="left">Hình Ảnh</TableCell>
                            <TableCell style={{ fontSize: "14px", fontWeight: "bold" }} align="left">Quốc Gia</TableCell>
                            <TableCell style={{ fontSize: "14px", fontWeight: "bold" }} align="left">Tỉnh Thành</TableCell>
                            <TableCell style={{ fontSize: "14px", fontWeight: "bold" }} align="left">Thao Tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {infoLocation.map((item, index) => (
                            <TableRow key={index} sx={{
                                "&:last-child td, &:last-child th": { border: 0 },
                            }}>
                                <TableCell align="left">{item.id}</TableCell>
                                <TableCell align="left">{item.tenViTri}</TableCell>
                                <TableCell align="left">
                                    <img src={item.hinhAnh} width={50} height={50} alt="" />
                                </TableCell>
                                <TableCell align="left">{item.quocGia}</TableCell>
                                <TableCell align="left">{item.tinhThanh}</TableCell>
                                <TableCell align="left">
                                    <Box>
                                        <Tooltip title="chỉnh sửa" placement="top">
                                            <IconButton
                                                aria-label="update"
                                                size="large"
                                                onClick={() => {
                                                    setOpen(true);
                                                    setSelectedLocation(index);
                                                }}
                                            >
                                                <EditIcon fontSize="inherit" color="primary" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Xóa vị trí" placement="bottom">
                                            <IconButton
                                                aria-label="delete"
                                                size="large"
                                                onClick={() => {
                                                    setOpenDelete(true);
                                                    setSelectedLocation(index);
                                                }}
                                            >
                                                <DeleteIcon fontSize="inherit" color="error" />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <Stack style={{ width: "100%", padding: "10px 0px" }} spacing={2}>
                <Pagination style={{ display: "flex", justifyContent: "center" }}
                    count={totalPages || ""}
                    onChange={handleChangePage}
                    color="primary" />
            </Stack>
        </div>
    )
}
