import * as React from "react";
import styled from "./ModalUpdateInfo.module.scss";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import { updateUser } from "../../../../../Apis/user";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "15px",
  display: "grid",
  gap: "15px",
  p: 4,
};

export default function ModalUpdateInfo({
  onUpdateInfo,
  currentUser,
  onOpenUpdate,
  onCloseUpdate,
}) {
  const [isLoading, setIsLoading] = React.useState(false);
  const validateField = object({
    name: string()
      .required("Yêu cầu không để trống")
      .max(12, "Có tối đa 8 => 12 ký tự")
      .min(8, "Có tối đa 8 => 12 ký tự"),
    email: string()
      .required("Yêu cầu không để trống")
      .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/, "Địa chỉ email không hợp lệ"),
    phone: string()
      .required("Yêu cầu không để trống")
      .matches(/^\d{9,15}$/, "Số điện thoại không hợp lệ"),
    birthday: string().required("Yêu cầu không để trống"),
    gender: string().required("Yêu cầu không để trống"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      name: `${currentUser.name}`,
      email: `${currentUser.email}`,
      phone: `${currentUser.phone}`,
      birthday: `${currentUser.birthday}`,
      gender: `${currentUser.gender}`,
    },
    resolver: yupResolver(validateField),
  });
  const handleUpdateInfo = async (value) => {
    try {
      setIsLoading(true);
      const reps = await updateUser(currentUser.id, value);
      console.log(reps);
      onUpdateInfo(reps);
      if (reps) {
        onCloseUpdate(false);
        Swal.fire({
          text: "Update Success",
          icon: "success",
        });
      } else {
        Swal.fire({
          text: "Update Error",
          icon: "error",
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Modal
        open={onOpenUpdate}
        onClose={() => onCloseUpdate(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" onSubmit={handleSubmit(handleUpdateInfo)}>
          <TextField
            helperText={errors?.name?.message}
            error={errors.name}
            {...register("name")}
            fullWidth
            label="fullWidth"
            id="fullWidth"
          />
          <TextField
            disabled={true}
            {...register("email")}
            fullWidth
            label="fullWidth"
            id="fullWidth"
          />
          <TextField {...register("phone")} fullWidth label="fullWidth" id="fullWidth" />
          <TextField
            {...register("birthday")}
            label="Ngày Sinh"
            type="date"
            InputProps={{
              startAdornment: <InputAdornment position="start">Ngày Sinh:</InputAdornment>,
            }}
          />
          <TextField
            helperText={errors?.gender?.message}
            error={errors.gender}
            {...register("gender")}
            select
            label="Giới Tính"
          >
            <MenuItem value={"true"}>Nam</MenuItem>
            <MenuItem value={"false"}>Nữ</MenuItem>
          </TextField>
          <div className={styled.formButton}>
            <button className={styled.btnUpdate} disabled={isLoading}>
              Update
            </button>
            <button type="button" onClick={() => onCloseUpdate(false)} className={styled.btnCancel}>
              Cancle
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}