import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import { getLocation } from "../../../Apis/viTri";
import styled from "./FormHeader.module.scss";
import InputAdornment from "@mui/material/InputAdornment";

import { useForm, SubmitHandler } from "react-hook-form";

export default function FormHeader() {
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

  return (
    <Box
      component="form"
      sx={{
        borderRadius: 90,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: { xs: "90%", sm: "90%", md: "70%" },
        border: "1px solid gray",
        height: "46px",
      }}
      noValidate
      autoComplete="off"
    >
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={locations.map((item) => {
          return item.tenViTri;
        })}
        sx={{ width: { xs: "80%", sm: "25%", md: "35%" } }}
        renderInput={(params) => (
          <TextField
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
        InputProps={{
          startAdornment: <InputAdornment position="start">Nhận Phòng:</InputAdornment>,
        }}
      />
      <TextField
        type="date"
        sx={{
          display: { xs: "none", sm: "block", md: "block", lg: "block", xl: "block" },
        }}
        id="input-with-icon-textfield"
        InputProps={{
          startAdornment: <InputAdornment position="start">Trả Phòng:</InputAdornment>,
        }}
      />
      <TextField
        sx={{
          width: { sm: "14%", md: "14%" },
          display: { xs: "none", sm: "block", md: "block", lg: "block", xl: "block" },
        }}
        id="input-with-icon-textfield"
        InputProps={{
          startAdornment: <InputAdornment position="start">Số Người:</InputAdornment>,
        }}
      />
      <button type="submit" className={styled.btnFind}>
        Tìm Kiếm
      </button>
    </Box>
  );
}
