import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useForm, Controller } from "react-hook-form";
import { object, string, date } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import styled from "./ModalAdmin.module.scss";
import { AddUser, updateUser } from "../../../../../Apis/user";
import swal from "sweetalert2";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  display: "grid",
  gap: "10px",
  p: 4,
};
const validateField = object({
  id: string().required("Yêu cầu không để trống"),
  name: string()
    .required("Yêu cầu không để trống")
    .max(12, "Có tối đa 8 => 12 ký tự")
    .min(8, "Có tối đa 8 => 12 ký tự"),
  email: string()
    .required("Yêu cầu không để trống")
    .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/, "Địa chỉ email không hợp lệ"),
  password: string()
    .required("Yêu cầu không để trống")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "Mật khẩu có ít nhất 1 ký tự thường, 1 ký tự hoa, 1 ký tự số"
    ),

  phone: string()
    .required("Yêu cầu không để trống")
    .matches(/^\d{9,15}$/, "Số điện thoại không hợp lệ"),
  birthday: string().required("Yêu cầu không để trống"),
  gender: string().required("Yêu cầu không để trống"),
  role: string().required("Yêu cầu không để trống"),
});
const currencies = [
  {
    value: "true",
    label: "Nam",
  },
  {
    value: "false",
    label: "Nữ",
  },
];
const role = [
  {
    value: "USER",
    label: "USER",
  },
  {
    value: "ADMIN",
    label: "ADMIN",
  },
];
export default function ModalAdmin({ onOpen, onClose, editUser, isEditing, setNulleditUset }) {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const [disableButton, setDisableButton] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {
      id: 0,
      name: "",
      email: "",
      password: "",
      phone: "",
      birthday: "",
      gender: "",
      role: "",
    },
    resolver: yupResolver(validateField),
  });
  const handleCancel = () => {
    onClose(false);
    setNulleditUset(null);
    reset({
      id: 0,
      name: "",
      email: "",
      password: "",
      phone: "",
      birthday: "",
      gender: "",
      role: "",
    });
  };
  const handleAddUser = async (user) => {
    try {
      setDisableButton(true);
      const resp = await AddUser(user);

      if (resp) {
        reset();
        swal.fire("Thêm User Thành Công", "", "success");
      } else {
        swal.fire("Thêm User Thất Bại", "", "error");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setDisableButton(false);
    }
  };
  useEffect(() => {
    if (editUser) {
      reset({
        id: editUser.id,
        name: editUser.name,
        email: editUser.email,
        password: editUser.password,
        phone: editUser.phone,
        birthday: editUser.birthday,
        gender: editUser.gender,
        role: editUser.role,
      });
    }
  }, [editUser]);
  const handleUpdateUser = async (user) => {
    try {
      const resp = await updateUser(user.id, user);
      if (resp) {
        reset();
        swal.fire("Update User Thành Công", "", "success");
      } else {
        swal.fire("Update User Thất Bại", "", "error");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleAdd = (value) => {
    if (value.id === "0") {
      handleAddUser(value);
      onClose(false);
    } else {
      handleUpdateUser(value);
      onClose(false);
    }
  };

  return (
    <div>
      <Modal
        open={onOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box onSubmit={handleSubmit(handleAdd)} component={"form"} sx={style}>
          <TextField
            disabled={true}
            type="number"
            helperText={errors?.id?.message}
            error={errors?.id}
            {...register("id")}
            fullWidth
            label="id"
            placeholder="id"
          />
          <TextField
            helperText={errors?.name?.message}
            error={errors?.name}
            {...register("name")}
            fullWidth
            label="Tên Người Dùng"
            placeholder="Võ Minh A"
          />
          <TextField
            fullWidth
            helperText={errors?.email?.message}
            error={errors?.email}
            {...register("email")}
            label="Email"
            placeholder="Example@gmail.com"
          />
          <TextField
            fullWidth
            helperText={errors?.phone?.message}
            error={errors?.phone}
            type="number"
            {...register("phone")}
            label="Số Điện Thoại"
            placeholder="0938123456"
          />
          <TextField
            fullWidth
            {...register("password")}
            helperText={errors?.password?.message}
            error={errors?.password}
            label="PassWord"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            helperText={errors?.birthday?.message}
            error={errors?.birthday}
            {...register("birthday")}
            label="Ngày Sinh"
            type="date"
            InputProps={{
              startAdornment: <InputAdornment position="start">Ngày Sinh:</InputAdornment>,
            }}
          />
          <Controller
            control={control}
            name="gender"
            rules={{ required: "Vui lòng không để trống" }}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.gender}
                select
                label="Giới Tính"
                helperText={errors?.gender?.message}
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          <Controller
            control={control}
            name="role"
            rules={{ required: "Vui lòng chọn loại người dùng" }}
            render={({ field }) => (
              <TextField
                {...field}
                error={!!errors.role}
                select
                label="Loại Người Dùng"
                helperText={errors?.role?.message}
              >
                {role.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <div className={styled.formButtonAdmin}>
            <button disabled={disableButton} className={styled.btnAddAdmin} type="submit">
              {isEditing ? "Thêm" : "Cập Nhật"}
            </button>
            <button onClick={handleCancel} type="button" className={styled.btnReset}>
              Cancle
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
