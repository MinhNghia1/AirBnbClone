import * as React from "react";
import Box from "@mui/material/Box";
import "./ModalShow.scss";
import Modal from "@mui/material/Modal";
import { IoIosClose } from "react-icons/io";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "10px",
  fontSize: "14px",
  boxShadow: 24,

  p: 4,
};

export default function ModalShowInfo({ onOpen, onClose, infoUser }) {
  if (!infoUser) {
    return;
  }
  return (
    <div>
      <Modal
        open={onOpen}
        onClose={() => {
          onClose(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="formControl">
            <h2>Info Room</h2>
            <p>id: {infoUser.id}</p>
            <p>Tên phòng: {infoUser.tenPhong}</p>
            <p>Giá tiền: {infoUser.giaTien}$</p>
            <p>Giường: {infoUser.giuong}</p>
            <p>Phòng ngủ: {infoUser.phongNgu}</p>
            <p>Phòng tắm: {infoUser.phongTam}</p>
            <p>Mã vị trí: {infoUser.maViTri}</p>
            <p>Mô tả: {infoUser.moTa}</p>
            <p>Bàn la : {infoUser.banLa ? "Có" : "Không"}</p>
            <p>Bếp: {infoUser.bep ? "Có" : "Không"}</p>
            <p>Điều hòa: {infoUser.dieuHoa ? "Có" : "Không"}</p>
            <p>Đỗ xe: {infoUser.doXe ? "Có" : "Không"}</p>
            <p>Hồ bơi: {infoUser.hoBoi ? "Có" : "Không"}</p>
            <p>Máy giặt: {infoUser.mayGiat ? "Có" : "Không"}</p>
            <p>Tivi: {infoUser.tivi ? "Có" : "Không"}</p>
            <p>Wifi: {infoUser.wifi ? "Có" : "Không"}</p>
            <div onClick={() => onClose(false)} className="btnClose">
              <IoIosClose fontSize={20} />
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
