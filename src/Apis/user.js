import baseAPI from "./baseAPI";
import { toast } from "react-toastify";

export const signUpUser = async (user) => {
  try {
    const reps = await baseAPI.post("/auth/signup", user);
    return reps.data.content;
  } catch (error) {
    if (error?.response) {
      toast.error(error?.response?.data?.content);
    } else {
      toast.error(error.message);
    }
  }
};
export const signInUser = async (user) => {
  try {
    const reps = await baseAPI.post("/auth/signin", user);
    return reps.data.content;
  } catch (error) {
    if (error?.response) {
      toast.error(error?.response?.data?.content);
    } else {
      toast.error(error.message);
    }
  }
};
export const getUserId = async (id) => {
  try {
    const resp = await baseAPI.get(`/users/${id}`);
    return resp.data.content;
  } catch (error) {
    if (error?.response) {
      toast.error(error?.response?.data?.content);
    } else {
      toast.error(error.message);
    }
  }
};
export const editAvatar = async (formFile) => {
  try {
    const formData = new FormData();
    for (let key in formFile) {
      formData.append(key, formFile[key]);
      console.log(key, formFile[key]);
    }
    const hasHinhAnh = formData.has("formFile");

    // In kết quả kiểm tra
    console.log("Has formFile:", hasHinhAnh);

    const resp = await baseAPI.post("/users/upload-avatar", formData);
    return resp.data.content;
  } catch (error) {
    if (error?.response) {
      toast.error(error?.response?.data?.content);
    } else {
      toast.error(error.message);
    }
  }
};
