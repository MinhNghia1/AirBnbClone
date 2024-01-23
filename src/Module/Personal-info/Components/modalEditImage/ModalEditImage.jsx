import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styled from "./ModalImage.module.scss";
import { editAvatar } from "../../../../Apis/user";
import { useForm } from "react-hook-form";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "20%",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 3,
};

export default function ModalEditImage({ isOpen, onclose, onUpdate }) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      formFile: "",
    },
  });
  const handleUploadAvatar = async (hinhAnh) => {
    try {
      const resp = await editAvatar(hinhAnh);
      onclose(false);
      onUpdate(resp);
    } catch (error) {
      console.error(error);
    }
  };
  const handleUpload = (value) => {
    const hinhAnh = { ...value, formFile: value?.formFile?.[0] };
    handleUploadAvatar(hinhAnh);
  };
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={() => onclose(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box onSubmit={handleSubmit(handleUpload)} component="form" sx={style}>
          <div className={styled.headerModal}>
            <p>Cập nhật ảnh đại diện</p>
          </div>
          <div className={styled.modalBody}>
            <input {...register("formFile")} type="file" />
          </div>
          <div className={styled.modalFooter}>
            <button type="submit" className={styled.btnEdit}>
              Sửa Ảnh
            </button>
            <button onClick={() => onclose(false)} className={styled.btnCancel}>
              Hủy
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
