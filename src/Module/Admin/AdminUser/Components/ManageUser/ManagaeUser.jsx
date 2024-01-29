import React, { useEffect, useState } from "react";
import styled from "./ManageUser.module.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import dayjs from "dayjs";
import { getListUser, getListUserPhanTrang } from "../../../../../Apis/user";
export default function ManagaeUser() {
  const [numberPage, setNumberPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [infoUSer, setInfoUser] = useState([]);
  useEffect(() => {
    getList();
    handleGetListUserPage(numberPage);
    console.log(numberPage);
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
  return (
    <div className={styled.manageUser}>
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
