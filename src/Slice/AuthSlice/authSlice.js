import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signInUser } from "../../Apis/user";
import swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
export const signin = createAsyncThunk("auth/sigin", async (value) => {
  try {
    const data = await signInUser(value);
    localStorage.setItem("currenuser", JSON.stringify(data));
    if (data) {
      swal.fire("Đăng Nhập Thành Công");
    } else {
      swal.fire("Đăng Nhập Thất Bại");
    }
    return data;
  } catch (error) {
    console.error(error);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: JSON.parse(localStorage.getItem("currenuser")) || null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signin.pending, (state, action) => {
      return { ...state, isLoading: true, error: null };
    });
    builder.addCase(signin.fulfilled, (state, action) => {
      return { ...state, isLoading: false, currentUser: action.payload };
    });
    builder.addCase(signin.rejected, (state, action) => {
      return { ...state, isLoading: false, error: action.error.message };
    });
  },
});

export default authSlice.reducer;
