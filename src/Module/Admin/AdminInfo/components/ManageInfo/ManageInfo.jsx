import React, { useEffect, useState, useRef } from "react";
import styled from "./ManageInfo.module.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { CiSearch } from "react-icons/ci";
import { IoReload } from "react-icons/io5";
import Button from "@mui/material/Button";
import swal from "sweetalert2";
import { getListRooms, getListRoomPage, getRoomDetail, deleteRoom } from "../../../../../Apis/room";
import { getLocation } from "../../../../../Apis/viTri";
import ModalShowInfo from "../ModalAdminInfo/ModalShowInfo/ModalShowInfo";
import ModalAdd from "../ModalAdminInfo/ModalAdd";
import { toast } from "react-toastify";
export default function ManageInfo() {
  // state show Info rooms
  const [showinFoRoomSelected, setShowinFoRoomSelected] = useState(null);
  const [isOpenShow, setIsOpenShow] = useState(false);
  // state get and pagination room
  const [numberPage, setNumberPage] = useState(1);
  const [totalPages, setTotalPages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState(null);
  const [infoRooms, setInfoRooms] = useState([]);
  // state search room
  const [searchTerm, setSearchTerm] = useState("");
  const [debounceSearchTerm, setDebounceSearchTerm] = useState(searchTerm);
  //state show modal add
  const [showModalAdd, setShowModalAdd] = useState(false);
  //state save room edit
  const [editRoom, setEditRoom] = useState(null);

  //get info and pagination room
  useEffect(() => {
    getNumberPage();
    getListRoomByPage(numberPage);
    getListLocation();
  }, [numberPage]);
  const getNumberPage = async () => {
    try {
      const resp = await getListRooms();
      const numberPage = Math.ceil(resp.length / 8);
      setTotalPages(numberPage);
    } catch (error) {
      console.error(error);
    }
  };
  const handlePage = (evt, value) => {
    setNumberPage(value);
  };
  const getListRoomByPage = async (page) => {
    try {
      const resp = await getListRoomPage(page);
      setInfoRooms(resp.data);
    } catch (error) {
      console.error(error);
    }
  };
  const getListLocation = async () => {
    try {
      const resp = await getLocation();
      setLocations(resp);
    } catch (error) {
      console.error(error);
    }
  };

  //search
  useEffect(() => {
    if (debounceSearchTerm) {
      handleFindRoom(debounceSearchTerm);
    } else if (debounceSearchTerm === "") {
      getNumberPage();
      getListRoomByPage(numberPage);
      getListLocation();
    }
  }, [debounceSearchTerm]);
  const timer = useRef();
  const handleSearch = (evt) => {
    setSearchTerm(evt.target.value);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setDebounceSearchTerm(evt.target.value);
    }, [500]);
  };
  const handleFindRoom = async (id) => {
    try {
      const resp = await getRoomDetail(id);

      if (resp) {
        setInfoRooms([resp]);
      } else {
        toast.error("Không tìm thấy thông tin id");
      }
    } catch (error) {
      console.error(error);
    }
  };
  //show info room
  const handleCloseShow = (value) => {
    setIsOpenShow(value);
  };
  const handleShowInfo = (infoUser) => {
    setIsOpenShow(true);
    setShowinFoRoomSelected(infoUser);
  };
  // refresh room
  const handleRefreshRooms = () => {
    getNumberPage();
    getListRoomByPage(numberPage);
    getListLocation();
  };
  // open modal Add
  const handleOpenModalAdd = () => {
    setShowModalAdd(true);
  };
  const handleCloseModalAdd = (value) => {
    setShowModalAdd(value);
  };
  const handleEditRoom = async (room) => {
    setShowModalAdd(room);
    setEditRoom(room);
  };
  const handleDelteRoom = async (item) => {
    try {
      const resp = await deleteRoom(item.id);

      if (resp === null) {
        handleRefreshRooms();
        swal.fire("Xóa Room Thành Công", "", "success");
      } else {
        swal.fire("Xóa Thất Bại", "", "error");
      }
    } catch (error) {}
  };
  return (
    <div className={styled.manageInfo}>
      <ModalShowInfo
        onOpen={isOpenShow}
        onClose={handleCloseShow}
        infoUser={showinFoRoomSelected}
      />
      <ModalAdd
        onOpen={showModalAdd}
        onClose={handleCloseModalAdd}
        resetRoom={handleRefreshRooms}
        editRoom={editRoom}
        setNullEditRoom={setEditRoom}
      />
      <div className={styled.btnAdminInfo}>
        <button onClick={handleOpenModalAdd}>Thêm</button>
      </div>
      <div className={styled.groupFindInfo}>
        <div className={styled.manageUserFindInfo}>
          <input
            type="number"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Tìm Kiếm ID Phòng"
          />
          <div className={styled.manageUserIconFindInfo}>
            <CiSearch width={50} />
          </div>
        </div>
        <Button
          onClick={handleRefreshRooms}
          sx={{ marginLeft: "10px", height: "30px" }}
          variant="contained"
        >
          <IoReload fontSize={20} />
        </Button>
      </div>
      <Table sx={{ minWidth: 650, backgroundColor: "gray" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontSize: "14px" }} align="center">
              ID
            </TableCell>
            <TableCell style={{ fontSize: "14px" }} align="center">
              Tên Phòng
            </TableCell>
            <TableCell style={{ fontSize: "14px" }} align="center">
              Hình Ảnh
            </TableCell>
            <TableCell style={{ fontSize: "14px" }} align="center">
              Vị Trí
            </TableCell>
            <TableCell style={{ fontSize: "14px" }} align="center">
              Số Lượng Khách
            </TableCell>
            <TableCell style={{ fontSize: "14px" }} align="center">
              Chức Năng
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {infoRooms.map((item, index) => {
            const locationByItem = locations?.find((location) => location.id === item.maViTri);

            return (
              <TableRow
                key={index}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell style={{ fontSize: "14px" }} align="center">
                  {item.id}
                </TableCell>
                <TableCell style={{ fontSize: "14px" }} align="center">
                  {item.tenPhong}
                </TableCell>
                <TableCell style={{ fontSize: "14px" }} align="center">
                  <img
                    style={{ objectFit: "cover" }}
                    width={60}
                    height={60}
                    src={item.hinhAnh}
                    alt=""
                  />
                </TableCell>
                <TableCell style={{ fontSize: "14px" }} align="center">
                  {locationByItem?.tenViTri}
                </TableCell>
                <TableCell style={{ fontSize: "14px" }} align="center">
                  {item.khach}
                </TableCell>

                <TableCell style={{ fontSize: "14px" }} align="center">
                  <button onClick={() => handleShowInfo(item)} className={styled.btnInfo}>
                    Xem Thông Tin
                  </button>
                  <button onClick={() => handleEditRoom(item)} className={styled.btnEdit}>
                    Sửa
                  </button>
                  <button onClick={() => handleDelteRoom(item)} className={styled.btnDelete}>
                    Xóa
                  </button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <Stack style={{ width: "100%", padding: "10px 0px" }} spacing={2}>
        <Pagination
          style={{ display: "flex", justifyContent: "center" }}
          count={totalPages || ""}
          onChange={handlePage}
        />
      </Stack>
    </div>
  );
}
