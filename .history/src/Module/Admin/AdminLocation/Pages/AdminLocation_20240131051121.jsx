import React, { useEffect, useState } from 'react'
import {
    Box,
    Button,
    IconButton,
    Pagination,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Tooltip
} from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import { getLocation, getLocationByPageSize, removeLocation } from "../../../../Apis/viTri"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export default function AdminLocation() {
    const [numberPage, setNumberPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);
    const [infoLocation, setInfoLocation] = useState([]);

    const [open, setOpen] = useState(false);
    const [openAddLocation, setOpenAddLocation] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openErro, setOpenErro] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredLocation, setFilteredLocation] = useState([]);
    const [openStack, setOpenStack] = useState(false);
    const handleDeleteAndReload = () => {
        handleDeleteLocation(selectedLocation);
        setOpenDelete(false);
    };
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
        getList();
        handleGetListLocationPage(numberPage);
        console.log(numberPage);
    }, [numberPage]);
    const getList = async () => {
        try {
            const resp = await getLocation();
            const numberLocation = Math.ceil(resp.length / 5);
            console.log(resp);
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
            <Box display={"flex"} justifyContent={"right"} mb={2}
                sx={{
                    marginRight: "16px",
                }}>
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
                        sx={{
                            marginRight: "16px",
                        }}>
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
            </Box>
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
