import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styled from "./ModalImage.module.scss";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useState } from "react";
import { editImg } from "../../../../Apis/viTri";
import { toast } from "react-toastify";

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

export default function ModalEditImage({ isOpen, onclose, locationId }) {
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

  const handleUploadImg = async (hinhAnh, Id) => {
    try {
      setIsLoading(true);
      const resp = await editImg(hinhAnh, Id);

      if (resp && resp.content) {
        console.log(resp, "resp");
        console.log(object);
        onclose(false);
        Swal.fire({
          icon: "success",
          title: "Upload Successful", // Add success message
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Upload Failed", // Add error message
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred."); // Add a toast message for unexpected errors
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = async (value) => {
    const formFile = value?.formFile?.[0];
    if (locationId !== undefined) {
      await handleUploadImg({ formFile }, locationId);
    } else {
      console.error("locationId is undefined.");
    }
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
            <p>Cập nhật ảnh vị trí</p>
          </div>
          <div className={styled.modalBody}>
            <input {...register("formFile", { required: "Không được để trống" })} type="file" />
          </div>
          {errors.formFile && (
            <span style={{ fontSize: "12px", color: "red" }}>{errors.formFile.message}</span>
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
