import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { signin } from "../../../Slice/AuthSlice/authSlice";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

export default function () {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const handleSignin = (value) => {
    dispatch(signin(value));
  };
  const { currentUser, isLoading, error } = useSelector((state) => {
    return state.auth;
  });
  if (currentUser) {
    return <Navigate to="/" replace />;
  }
  return (
    <Box
      onSubmit={handleSubmit(handleSignin)}
      component="form"
      sx={{
        width: "100%",
        marginTop: "5%",
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        {...register("email")}
        sx={{ marginBottom: "20px" }}
        fullWidth
        label="Email"
        id="Email"
      />
      <TextField
        {...register("password")}
        type="password"
        sx={{ marginBottom: "20px" }}
        fullWidth
        label="Mật Khẩu"
        id="MatKhau"
      />
      <Button
        disabled={isLoading}
        type="submit"
        sx={{ width: "100%" }}
        variant="contained"
        color="primary"
      >
        Đăng Nhập
      </Button>
    </Box>
  );
}
