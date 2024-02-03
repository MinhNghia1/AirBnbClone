import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styled from "./ModalImage.module.scss";
import { editAvatar } from "";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useState } from "react";
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
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      formFile: "",
    },
  });
  const handleUploadAvatar = async (hinhAnh) => {
    try {
      setIsLoading(true);
      const resp = await editAvatar(hinhAnh);
      onclose(false);
      onUpdate(resp);
      if (resp) {
        Swal.fire({
          icon: "success",
        });
      } else {
        Swal.fire({
          icon: "error",
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
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
            <input {...register("formFile", { required: "Không được để trống" })} type="file" />
          </div>
          {errors ? (
            <span style={{ fontSize: "12px", color: "red" }}>{errors?.formFile?.message}</span>
          ) : (
            ""
          )}
          <div className={styled.modalFooter}>
            <button disabled={isLoading} type="submit" className={styled.btnEdit}>
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
