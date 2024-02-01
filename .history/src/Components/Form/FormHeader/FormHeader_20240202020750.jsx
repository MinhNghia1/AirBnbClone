import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import { getLocation } from "../../../Apis/viTri";
import styled from "./FormHeader.module.scss";
import InputAdornment from "@mui/material/InputAdornment";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
export default function FormHeader() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      maViTri: "",
    },
    mode: "onSubmit",
  });
  const [locations, setLocation] = useState([]);
  const getListLocation = async () => {
    try {
      const reps = await getLocation();
      setLocation(reps);
    } catch (error) {}
  };
  useEffect(() => {
    getListLocation();
  }, []);

  const handleOptionClick = (event) => {
    event.stopPropagation();
  };
  const handleRoomByLocation = (value) => {
    const viTri = locations.find((item) => value.maViTri === item.tenViTri);
    if (viTri?.id) {
      navigate(`/RoomByCity/${viTri?.id}`);
    }
  };
  return (
    <Box
      onSubmit={handleSubmit(handleRoomByLocation)}
      component="form"
      sx={{
        borderRadius: 90,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: { xs: "90%", sm: "90%", md: "55%" },
        border: "1px solid gray",
        height: "46px",
      }}
      noValidate
      autoComplete="off"
    >
      <div className={styled.formHeaderControl}>
        <Autocomplete
          onChange={(event, value) => handleOptionClick(event, value)}
          disablePortal
          id="combo-box-demo"
          options={locations.map((item) => {
            return item.tenViTri;
          })}
          fullWidth
          renderInput={(params) => (
            <TextField
              {...register("maViTri")}
              autoFocus
              {...params}
              label="Địa Điểm"
              sx={{
                "& fieldset": { borderTopLeftRadius: "90px", borderBottomLeftRadius: "90px" },
              }}
            />
          )}
        />

        <TextField
          type="date"
          id="input-with-icon-textfield"
          sx={{
            display: { xs: "none", sm: "block", md: "block", lg: "block", xl: "block" },
          }}
          fullWidth
          InputProps={{
            startAdornment: <InputAdornment position="start">Nhận Phòng:</InputAdornment>,
          }}
        />
        <TextField
          type="date"
          sx={{
            display: { xs: "none", sm: "block", md: "block", lg: "block", xl: "block" },
          }}
          fullWidth
          id="input-with-icon-textfield"
          InputProps={{
            startAdornment: <InputAdornment position="start">Trả Phòng:</InputAdornment>,
          }}
        />
        <TextField
          fullWidth
          sx={{
            display: { xs: "none", sm: "block", md: "block", lg: "block", xl: "block" },
          }}
          id="input-with-icon-textfield"
          InputProps={{
            startAdornment: <InputAdornment position="start">Số Người:</InputAdornment>,
          }}
        />
      </div>
      <button type="submit" className={styled.btnFind}>
        Tìm Kiếm
      </button>
    </Box>
  );
}
