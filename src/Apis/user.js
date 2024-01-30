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
      throw error.message;
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
      throw error.message;
    }
  }
};
export const getListUser = async () => {
  try {
    const reps = await baseAPI.get("/users");
    return reps.data.content;
  } catch (error) {
    if (error?.response) {
      toast.error(error?.response?.data?.content);
    } else {
      throw error.message;
    }
  }
};
export const getListUserPhanTrang = async (numberPage) => {
  try {
    const reps = await baseAPI.get("/users/phan-trang-tim-kiem", {
      params: { pageIndex: numberPage, pageSize: 8 },
    });
    return reps.data.content;
  } catch (error) {
    if (error?.response) {
      toast.error(error?.response?.data?.content);
    } else {
      throw error.message;
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
      throw error.message;
    }
  }
};
export const editAvatar = async (formFile) => {
  try {
    const formData = new FormData();
    for (let key in formFile) {
      formData.append(key, formFile[key]);
    }
    const resp = await baseAPI.post("/users/upload-avatar", formData);
    return resp.data.content;
  } catch (error) {
    if (error?.response) {
      toast.error(error?.response?.data?.content);
    } else {
      throw error.message;
    }
  }
};

export const updateUser = async (id, user) => {
  try {
    const resp = await baseAPI.put(`/users/${id}`, user);
    return resp.data.content;
  } catch (error) {
    if (error?.response) {
      toast.error(error?.response?.data?.content);
    } else {
      throw error.message;
    }
  }
};
export const findUser = async (keyWord) => {
  try {
    const resp = await baseAPI.get(`/users/search/${keyWord}`);
    return resp.data.content;
  } catch (error) {
    if (error?.response) {
      toast.error(error?.response?.data?.content);
    } else {
      throw error.message;
    }
  }
};
export const AddUser = async (user) => {
  try {
    const resp = await baseAPI.post(`/users`, user);
    return resp.data.content;
  } catch (error) {
    if (error?.response) {
      toast.error(error?.response?.data?.content);
    } else {
      throw error.message;
    }
  }
};
export const deleteUser = async (id) => {
  try {
    const resp = await baseAPI.delete(`/users`, { params: { id: id } });
    return resp.data.content;
  } catch (error) {
    if (error?.response) {
      toast.error(error?.response?.data?.content);
    } else {
      throw error.message;
    }
  }
};
