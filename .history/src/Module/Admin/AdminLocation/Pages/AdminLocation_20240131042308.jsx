import React, { useEffect, useState } from 'react'
import {
    Box,
    IconButton,
    Pagination,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TableRow,
    TextField,
    Tooltip
} from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import LoadingPage from '../../../../Components/LoadingPage/LoadingPage';
import { getLocation, removeLocation } from "../../../../Apis/viTri"
import { Button } from 'bootstrap';
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
// TablePaginationActions.propTypes = {
//     count: PropTypes.number.isRequired,
//     onPageChange: PropTypes.func.isRequired,
//     page: PropTypes.number.isRequired,
//     rowsPerPage: PropTypes.number.isRequired,
//   };

export default function AdminLocation() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [open, setOpen] = useState(false);
    const [openAddLocation, setOpenAddLocation] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openErro, setOpenErro] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredLocation, setFilteredLocation] = useState([]);
    const [openStack, setOpenStack] = useState(false);
    const queryClient = useQueryClient();

    const { data: location = [], isLoading } = useQuery({
        queryKey: ["location"],
        queryFn: getLocation,
    });

    const { mutate: handleDeleteLocation } = useMutation({
        mutationFn: (id) => removeLocation(id),
        onSuccess: () => {
            setOpenStack(true);
            queryClient.invalidateQueries({ queryKey: ["location"] });
        },
        onError: (err) => {
            setOpenErro(true);
        },
    });
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - location.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleDeleteAndReload = () => {
        handleDeleteLocation(selectedLocation);
        setOpenDelete(false);
    };

    const handleCloseStack = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenStack(false);
    };

    // Function to filter users based on search query
    const filterLocations = () => {
        const filteredData = location.filter((location) =>
            location.tenViTri.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredLocation(filteredData);
    };

    // Attach an event handler to update searchQuery when the input value changes
    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleEnterKeyDown = (event) => {
        if (event.key === "Enter") {
            filterLocations();
        }
    };

    useEffect(() => {
        if (location) {
            setFilteredLocation(location); // Ban đầu, filteredLocation bằng danh sách customers
        }
    }, [location]);

    if (isLoading) {
        return <LoadingPage />;
    }


    return (
        <div style={{ width: "90%", marginTop: "100px" }}>
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
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead >
                        <TableRow className="fw-bold">
                            <TableCell align='center'>Mã vị Trí</TableCell>
                            <TableCell align="center">Tên</TableCell>
                            <TableCell align="center">Hình Ảnh</TableCell>
                            <TableCell align="center">Quốc Gia</TableCell>
                            <TableCell align="center">Tỉnh Thành</TableCell>
                            <TableCell align="center">Thao Tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                    }}>
                        {(rowsPerPage > 0
                            ? filteredLocation.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            : filteredLocation
                        ).map((location) => (
                            <TableRow key={location.id}>
                                <TableCell align="center">{location.id}</TableCell>
                                <TableCell align="center">{location.tenViTri}</TableCell>
                                <TableCell align="center">
                                    <img src={location.hinhAnh} width={50} height={50} alt="" />
                                </TableCell>
                                <TableCell align="center">{location.quocGia}</TableCell>
                                <TableCell align="center">{location.tinhThanh}</TableCell>
                                <TableCell align="center">
                                    <Box>
                                        <Tooltip title="chỉnh sửa" placement="top">
                                            <IconButton
                                                aria-label="update"
                                                size="large"
                                                onClick={() => {
                                                    setOpen(true);
                                                    setSelectedLocation(location.id);
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
                                                    setSelectedLocation(location.id);
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
