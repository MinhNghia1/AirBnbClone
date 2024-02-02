import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { ButtonCustom, ButtonMain } from "../../../../Components/Button/";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { object, string } from "yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getBooked,
  updateBooking,
  getRooms,
} from "../../../../Apis/room";
import { ModalSuccess, ModalContent } from "../../../../Components/Modal/index";
import dayjs from "dayjs";

const updateBookingSchema = object({
  maPhong: string().required("Mã phòng không được để trống"),
  maNguoiDung: string().required("Mã người dùng không được để trống"),
  ngayDen: string().required("Vui lòng chọn ngày đến"),
  ngayDi: string().required("Vui lòng chọn ngày đi"),
  soLuongKhach: string()
    .required("Số lượng khách không được để trống")
    .test(
      "is-positive",
      "Số lượng khách phải lớn hơn 0",
      (value) => parseInt(value) > 0
    ),
});

export default function UpdateBooking({ userId, onClose }) {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState("");
  const queryClient = useQueryClient();

  const { data: rooms = [] } = useQuery({
    queryKey: ["location"],
    queryFn: getRooms,
  });

  const handleChangeRoom = (evt) => {
    setSelectedRoom(evt.target.value);
  };

  const { data: booked = [], isLoading } = useQuery({
    queryKey: ["booked", userId],
    queryFn: () => getBooked(userId),
    enabled: !!userId,
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      maPhong: "",
      maNguoiDung: "",
      ngayDen: "",
      ngayDi: "",
      soLuongKhach: "",
    },
    resolver: yupResolver(updateBookingSchema),
    mode: "onTouched",
  });

  const { mutate: handleUpdatebooked } = useMutation({
    mutationFn: (payload) => updateBooking(userId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["booked", userId]);
      setShowSuccessModal(true);
    },
  });

  const onSubmit = (values) => {
    const formValues = {
      maPhong: values.maPhong,
      maNguoiDung: values.maNguoiDung,
      ngayDen: values.ngayDen,
      ngayDi: values.ngayDi,
      soLuongKhach: values.soLuongKhach,
      id: userId,
    };
    //call API sign up
    handleUpdatebooked(formValues);
  };

  useEffect(() => {
    if (!!booked) {
      setValue("id", booked.id);
      setValue("maPhong", booked.maPhong);
      setValue("maNguoiDung", booked.maNguoiDung);
      setValue("ngayDen", booked.ngayDen);
      setValue("ngayDi", booked.ngayDi);
      setValue("soLuongKhach", booked.soLuongKhach);
    }
  }, [booked, setValue]);

  const handleCloseSuccess = () => {
    onClose();
    setShowSuccessModal(false);
  };

  if (isLoading) return <Loading />;

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        ✍️✍️ Cập nhật Booking
      </Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: "100%", marginTop: "20px" }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl sx={{ minWidth: "100%" }} color="success">
              <InputLabel>Chọn Phòng</InputLabel>
              <Controller
                control={control}
                defaultValue=""
                name="maPhong"
                render={({ field }) => (
                  <Select
                    value={selectedRoom}
                    onChange={(e) => {
                      field.onChange(e);
                      handleChangeRoom(e);
                    }}
                    label="Chọn Phòng"
                    {...field}
                  >
                    <MenuItem value=" ">
                      <em>------</em>
                    </MenuItem>
                    {rooms.map((loca) => (
                      <MenuItem key={loca.id} value={loca.id}>
                        {loca.tenPhong}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Mã Người Dùng"
              fullWidth
              error={!!errors.maNguoiDung}
              helperText={errors.maNguoiDung?.message}
              {...register("maNguoiDung")}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Số Lượng Khách"
              fullWidth
              error={!!errors.soLuongKhach}
              helperText={errors.soLuongKhach?.message}
              {...register("soLuongKhach")}
            />
          </Grid>
          <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ marginRight: "20px" }}>Ngày Đến</Typography>
            <FormControl color="success">
              <TextField
                color="success"
                type="datetime-local"
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("ngayDen", {
                  setValueAs: (values) => {
                    return dayjs(values).format("YYYY-MM-DD");
                  },
                })}
                error={!!errors.ngayDen}
                helperText={errors.ngayDen && errors?.ngayDen.message}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ marginRight: "20px" }}>Ngày Đi</Typography>
            <FormControl color="success">
              <TextField
                color="success"
                type="datetime-local"
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("ngayDi", {
                  setValueAs: (values) => {
                    return dayjs(values).format("YYYY-MM-DD");
                  },
                })}
                error={!!errors.ngayDi}
                helperText={errors.ngayDi && errors?.ngayDi.message}
              />
            </FormControl>
          </Grid>
        </Grid>
        <ButtonCustom
          type="submit"
          fullWidth
          variant="contained"
          disabled={isLoading}
        >
          Cập Nhật
        </ButtonCustom>
        <ButtonMain onClick={onClose}>Đóng</ButtonMain>
      </form>

      {showSuccessModal && (
        <ModalSuccess>
          <ModalContent>
            <img
              style={{ width: "120px", marginTop: "10px" }}
              src="/img/animation_lnfs5c14_small.gif"
              alt="confirm"
            />
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", marginBottom: "40px" }}
            >
              Cập Nhật Booking Thành Công
            </Typography>

            <ButtonMain
              variant="contained"
              color="primary"
              onClick={handleCloseSuccess}
            >
              Đồng ý
            </ButtonMain>
          </ModalContent>
        </ModalSuccess>
      )}
    </Box>
  );
}
