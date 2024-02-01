import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import { useForm } from "react-hook-form";
import styled from "./FormSignUp.module.scss";
import { object, string, date } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { signUpUser } from "../../../Apis/user";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
export default function FormSignUp() {
  const validateField = object({
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
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      birthday: "",
      gender: "",
      role: "USER",
    },
    resolver: yupResolver(validateField),
  });
  const handleSignUp = async (user) => {
    try {
      setLoading(true);
      const resp = await signUpUser(user);
      if (resp) {
        swal.fire("Đăng Ký Thành Công", "", "success");
        navigate("/SiginUser");
      } else {
        swal.fire("Đăng Ký Thất Bại", "", "error");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      onSubmit={handleSubmit(handleSignUp)}
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "100%" },
      }}
      noValidate
      autoComplete="off"
    >
      <div className={styled.formControl}>
        <TextField
          helperText={errors?.name?.message}
          error={errors.name}
          {...register("name")}
          label="Tên Người Dùng"
          placeholder="Võ Minh A"
        />
        <TextField
          helperText={errors?.email?.message}
          error={errors.email}
          {...register("email")}
          label="Email"
          placeholder="Example@gmail.com"
        />
        <TextField
          helperText={errors?.phone?.message}
          error={errors.phone}
          type="number"
          {...register("phone")}
          label="Số Điện Thoại"
          placeholder="0938123456"
        />
        <TextField
          {...register("password")}
          helperText={errors?.password?.message}
          error={errors.password}
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
          helperText={errors?.birthday?.message}
          error={errors.birthday}
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
      </div>
      <Button
        disabled={loading}
        type="submit"
        sx={{ width: "100%", marginTop: "20px" }}
        variant="contained"
        color="primary"
      >
        Đăng ký
      </Button>
    </Box>
  );
}
