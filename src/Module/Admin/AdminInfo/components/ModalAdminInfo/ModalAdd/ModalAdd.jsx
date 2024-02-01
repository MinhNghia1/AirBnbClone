import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useForm, Controller } from "react-hook-form";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { object, string, number } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextareaAutosize } from "@mui/base";
import MenuItem from "@mui/material/MenuItem";
import styled from "./ModalAdd.module.scss";
import { addRoom, updateRoom } from "../../../../../../Apis/room";
import swal from "sweetalert2";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const validate = object({
  tenPhong: string().required("Không được để trống"),
  moTa: string().required("Không được để trống"),
  khach: number()
    .required("Không được để trống")
    .max(10, "Không vượt quá 10 khách")
    .min(1, "Ít nhất 1 khách"),
  phongNgu: number()
    .required("Không được để trống")
    .max(10, "Không vượt quá 10 phòng")
    .min(1, "Ít nhất 1 phòng"),
  giuong: number()
    .required("Không được để trống")
    .max(10, "Không vượt quá 10 giường")
    .min(1, "Ít nhất 1 giường"),
  phongTam: number()
    .required("Không được để trống")
    .max(10, "Không vượt quá 10 phòng")
    .min(1, "Ít nhất 1 phòng"),
  giaTien: number().required("Không được để trống"),
  maViTri: number().required("Không được để trống"),
  hinhAnh: string().required("Không được để trống"),
  mayGiat: string().required("Không được để trống"),
  banLa: string().required("Không được để trống"),
  tivi: string().required("Không được để trống"),
  dieuHoa: string().required("Không được để trống"),
  wifi: string().required("Không được để trống"),
  bep: string().required("Không được để trống"),
  doXe: string().required("Không được để trống"),
  hoBoi: string().required("Không được để trống"),
  banUi: string().required("Không được để trống"),
});
export default function ModalAdd({ onOpen, onClose, resetRoom, editRoom, setNullEditRoom }) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    formState: { errors },
    register,
    handleSubmit,
    control,
    reset,
  } = useForm({
    defaultValues: {
      id: "0",
      tenPhong: "",
      khach: "",
      phongNgu: "",
      giuong: "",
      phongTam: "",
      moTa: "",
      giaTien: "",
      mayGiat: "",
      banLa: "",
      tivi: "",
      dieuHoa: "",
      wifi: "",
      bep: "",
      doXe: "",
      hoBoi: "",
      banUi: "",
      maViTri: "",
      hinhAnh: "",
    },
    resolver: yupResolver(validate),
  });
  const currencies = [
    {
      value: "true",
      label: "Có",
    },
    {
      value: "false",
      label: "Không",
    },
  ];
  const handleResetInput = () => {
    reset({
      id: "0",
      tenPhong: "",
      khach: "",
      phongNgu: "",
      giuong: "",
      phongTam: "",
      moTa: "",
      giaTien: "",
      mayGiat: "",
      banLa: "",
      tivi: "",
      dieuHoa: "",
      wifi: "",
      bep: "",
      doXe: "",
      hoBoi: "",
      banUi: "",
      maViTri: "",
      hinhAnh: "",
    });
  };
  useEffect(() => {
    if (editRoom) {
      reset({
        id: `${editRoom.id}`,
        tenPhong: `${editRoom.tenPhong}`,
        khach: `${editRoom.khach}`,
        phongNgu: `${editRoom.phongNgu}`,
        giuong: `${editRoom.giuong}`,
        phongTam: `${editRoom.phongTam}`,
        moTa: `${editRoom.moTa}`,
        giaTien: `${editRoom.giaTien}`,
        mayGiat: `${editRoom.mayGiat}`,
        banLa: `${editRoom.banLa}`,
        tivi: `${editRoom.tivi}`,
        dieuHoa: `${editRoom.dieuHoa}`,
        wifi: `${editRoom.wifi}`,
        bep: `${editRoom.bep}`,
        doXe: `${editRoom.doXe}`,
        hoBoi: `${editRoom.hoBoi}`,
        banUi: `${editRoom.banUi}`,
        maViTri: `${editRoom.maViTri}`,
        hinhAnh: `${editRoom.hinhAnh}`,
      });
    }
  }, [editRoom]);
  const handleCancel = () => {
    onClose(false);
    handleResetInput();
    setNullEditRoom(null);
  };
  const handleAdd = (value) => {
    setIsLoading(true);
    if (value.id === "0") {
      handleAddRoom(value);
    } else {
      handleUpdate(value.id, value);
    }
  };
  const handleAddRoom = async (room) => {
    try {
      const resp = await addRoom(room);
      onClose(false);
      if (resp) {
        resetRoom();
        reset();
        swal.fire("Thêm Room Thành Công", "", "success");
      } else {
        swal.fire("Thêm Room Thất Bại", "", "error");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleUpdate = async (idRoom, value) => {
    try {
      const resp = await updateRoom(idRoom, value);
      onClose(false);
      if (resp) {
        resetRoom();
        reset();
        swal.fire("Cập Nhật Room Thành Công", "", "success");
      } else {
        swal.fire("Cập Nhật Thất Bại", "", "error");
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
        open={onOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box onSubmit={handleSubmit(handleAdd)} component={"form"} sx={style}>
          <h2>{editRoom ? "Update" : "Add"}</h2>
          <div className={styled.formControl}>
            <TextField
              disabled={true}
              type="number"
              helperText={errors?.id?.message}
              error={errors?.id}
              {...register("id")}
              label="id"
              placeholder="id"
            />
            <TextField
              helperText={errors?.tenPhong?.message}
              error={errors?.tenPhong}
              {...register("tenPhong")}
              label=" Tên phòng"
              placeholder="Khách sạn ..."
            />
            <TextField
              helperText={errors?.moTa?.message}
              error={errors?.moTa}
              {...register("moTa")}
              label="Mô tả"
              placeholder="mô tả"
            />
            <TextField
              type="text"
              helperText={errors?.hinhAnh?.message}
              error={errors?.hinhAnh}
              {...register("hinhAnh")}
              label="Hình ảnh"
              focused
            />
            <TextField
              type="number"
              helperText={errors?.khach?.message}
              error={errors?.khach}
              {...register("khach")}
              label="Khách"
            />
            <TextField
              type="number"
              helperText={errors?.phongNgu?.message}
              error={errors?.phongNgu}
              {...register("phongNgu")}
              label="Phòng ngủ"
            />
            <TextField
              type="number"
              helperText={errors?.giuong?.message}
              error={errors?.giuong}
              {...register("giuong")}
              label="Giường"
            />
            <TextField
              type="number"
              helperText={errors?.phongTam?.message}
              error={errors?.phongTam}
              {...register("phongTam")}
              label="Phòng tắm"
            />
            <TextField
              type="number"
              helperText={errors?.giaTien?.message}
              error={errors?.giaTien}
              {...register("giaTien")}
              label="Giá tiền"
            />
            <TextField
              type="number"
              helperText={errors?.maViTri?.message}
              error={errors?.maViTri}
              {...register("maViTri")}
              defaultValue={"0"}
              label="Mã vị trí"
            />
          </div>
          <div className={styled.formSmall}>
            <Controller
              control={control}
              name="mayGiat"
              rules={{ required: "Vui lòng không để trống" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors.mayGiat}
                  select
                  label="Máy giặt"
                  helperText={errors?.mayGiat?.message}
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
              name="banLa"
              rules={{ required: "Vui lòng không để trống" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors.banLa}
                  select
                  label="Bàn là"
                  helperText={errors?.banLa?.message}
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
              name="tivi"
              rules={{ required: "Vui lòng không để trống" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors.tivi}
                  select
                  label="Ti vi"
                  helperText={errors?.tivi?.message}
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
              name="dieuHoa"
              rules={{ required: "Vui lòng không để trống" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors.dieuHoa}
                  select
                  label="Điều hòa"
                  helperText={errors?.dieuHoa?.message}
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
              name="wifi"
              rules={{ required: "Vui lòng không để trống" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors.wifi}
                  select
                  label="Wifi"
                  helperText={errors?.wifi?.message}
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
              name="bep"
              rules={{ required: "Vui lòng không để trống" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors.bep}
                  select
                  label="Bếp"
                  helperText={errors?.bep?.message}
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
              name="doXe"
              rules={{ required: "Vui lòng không để trống" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors.doXe}
                  select
                  label="Đỗ xe"
                  helperText={errors?.doXe?.message}
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
              name="hoBoi"
              rules={{ required: "Vui lòng không để trống" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors.hoBoi}
                  select
                  label="Hồ bơi"
                  helperText={errors?.hoBoi?.message}
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
              name="banUi"
              rules={{ required: "Vui lòng không để trống" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors.banUi}
                  select
                  label="Bàn ủi"
                  helperText={errors?.banUi?.message}
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </div>
          <div className={styled.groupBtn}>
            <button disabled={isLoading} className={styled.btnSubmitRoom} type="submit">
              {editRoom ? "Update" : "Add"}
            </button>
            <button className={styled.btnCancelRoom} onClick={handleCancel}>
              Close
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
