import React, { useEffect, useState, useRef } from "react";
import styled from "./ManageUser.module.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import dayjs from "dayjs";
import { CiSearch } from "react-icons/ci";
import { getListUser, getListUserPhanTrang, findUser, deleteUser } from "../../../../../Apis/user";
import ModalAdmin from "../ModalAdmin/ModalAdmin";
import { IoReload } from "react-icons/io5";
import Button from "@mui/material/Button";
import swal from "sweetalert2";
import { toast } from "react-toastify";
export default function ManagaeUser() {
  const [numberPage, setNumberPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [infoUSer, setInfoUser] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debounceSearchTerm, setDebounceSearchTerm] = useState(searchTerm);
  const [isOpenModal, setIsopenModal] = useState(false);
  const [userEdit, setUserEdit] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const timer = useRef();
  const handleSearch = (evt) => {
    setSearchTerm(evt.target.value);

    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setDebounceSearchTerm(evt.target.value);
    }, [500]);
  };
  useEffect(() => {
    if (debounceSearchTerm) {
      handFindUser?.(debounceSearchTerm);
    } else if (debounceSearchTerm === "") {
      getList();
      handleGetListUserPage(numberPage);
    }
  }, [debounceSearchTerm]);
  const handFindUser = async (keyWord) => {
    try {
      const resp = await findUser(keyWord);
      console.log(resp);
      if (resp) {
        setInfoUser(resp);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getList();
    handleGetListUserPage(numberPage);
  }, [numberPage]);
  const getList = async () => {
    try {
      const resp = await getListUser();
      const numberUser = Math.ceil(resp.length / 8);
      setTotalPages(numberUser);
    } catch (error) {
      console.error(error);
    }
  };
  const handleGetListUserPage = async (numberPage) => {
    try {
      const resp = await getListUserPhanTrang(numberPage);
      setInfoUser(resp.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleChangePage = (event, value) => {
    setNumberPage(value);
  };
  const handleOpenModal = () => {
    setIsopenModal(true);
    setIsEditing(true);
  };
  const handleCloseModal = (value) => {
    setIsopenModal(value);
  };
  const handleEdit = (value) => {
    setIsopenModal(true);
    setUserEdit(value);
    setIsEditing(false);
  };
  const handleReFresh = () => {
    getList();
    handleGetListUserPage(numberPage);
  };
  const handleDelte = async (item) => {
    try {
      const resp = await deleteUser(item.id);
      console.log(resp);
      getList();
      handleGetListUserPage(numberPage);
      if (!resp) {
        swal.fire("Xóa User Thành Công", "", "success");
      } else {
        swal.fire("Xóa User Thất Bại", "", "error");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={styled.manageUser}>
      <ModalAdmin
        onOpen={isOpenModal}
        onClose={handleCloseModal}
        editUser={userEdit}
        isEditing={isEditing}
        setNulleditUset={() => setUserEdit()}
        refresh={handleReFresh}
      />
      <div className={styled.btnAdmin}>
        <button onClick={handleOpenModal}>Thêm</button>
      </div>
      <div className={styled.groupFind}>
        <div className={styled.manageUserFind}>
          <input onChange={handleSearch} placeholder="Tìm Kiếm Người Dùng" value={searchTerm} />
          <div className={styled.manageUserIconFind}>
            <CiSearch width={50} />
          </div>
        </div>
        <Button
          onClick={handleReFresh}
          sx={{ marginLeft: "10px", height: "30px" }}
          variant="contained"
        >
          <IoReload fontSize={20} />
        </Button>
      </div>
      <Table sx={{ minWidth: 650, backgroundColor: "gray" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontSize: "14px" }} align="left">
              ID
            </TableCell>
            <TableCell style={{ fontSize: "14px" }} align="left">
              Tên Người Dùng
            </TableCell>
            <TableCell style={{ fontSize: "14px" }} align="left">
              Email
            </TableCell>
            <TableCell style={{ fontSize: "14px" }} align="left">
              Phone
            </TableCell>
            <TableCell style={{ fontSize: "14px" }} align="left">
              Hình Ảnh
            </TableCell>
            <TableCell style={{ fontSize: "14px" }} align="left">
              Ngày Sinh
            </TableCell>
            <TableCell style={{ fontSize: "14px" }} align="left">
              Giới Tính
            </TableCell>
            <TableCell style={{ fontSize: "14px" }} align="left">
              Vai Trò
            </TableCell>
            <TableCell style={{ fontSize: "14px" }} align="left">
              Chức Năng
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {infoUSer.map((item, index) => (
            <TableRow
              key={index}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell style={{ fontSize: "14px" }} align="left">
                {item.id}
              </TableCell>
              <TableCell style={{ fontSize: "14px" }} align="left">
                {item.name}
              </TableCell>
              <TableCell style={{ fontSize: "14px" }} align="left">
                {item.email}
              </TableCell>
              <TableCell style={{ fontSize: "14px" }} align="left">
                {item.phone}
              </TableCell>
              <TableCell width={40} height={40} style={{ fontSize: "14px" }} align="left">
                <img width={40} height={40} src={item.avatar} />
              </TableCell>
              <TableCell style={{ fontSize: "14px" }} align="left">
                {dayjs(item.birthday).format("DD/MM/YYYY") === "Invalid Date"
                  ? item.birthday
                  : dayjs(item.birthday).format("DD/MM/YYYY")}
              </TableCell>
              <TableCell style={{ fontSize: "14px" }} align="left">
                {item.gender ? "Nam" : "Nữ"}
              </TableCell>
              <TableCell style={{ fontSize: "14px" }} align="left">
                {item.role}
              </TableCell>
              <TableCell style={{ fontSize: "14px" }} align="left">
                <button onClick={() => handleEdit(item)} className={styled.btnEdit}>
                  Sửa
                </button>
                <button onClick={() => handleDelte(item)} className={styled.btnDelete}>
                  Xóa
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Stack style={{ width: "100%", padding: "10px 0px" }} spacing={2}>
        <Pagination
          style={{ display: "flex", justifyContent: "center" }}
          count={totalPages || ""}
          onChange={handleChangePage}
        />
      </Stack>
    </div>
  );
}
