import baseAPI from "./baseAPI";
import { toast } from "react-toastify";

export const getLocation = async () => {
  try {
    const reps = await baseAPI.get("/vi-tri");
    return reps.data.content;
  } catch (error) {
    if (error.respone) {
      alert(error.respone?.data?.content);
    } else {
      alert(error?.message);
    }
  }
};
export async function getLocationById(roomId) {
  try {
    const response = await baseAPI.get(`/vi-tri/${roomId}`);
    return response.data.content;
  } catch (error) {
    if (error?.response) {
      toast.error(error?.response?.data?.content);
    } else {
      throw error.message;
    }
  }
}
export const getLocationByPageSize = async (numberPage) =>{
  try {
    const reps = await baseAPI.get("/vi-tri/phan-trang-tim-kiem", {
      params: { pageIndex: numberPage, pageSize: 5 },
    });
    return reps.data.content;
  } catch (error) {
    if (error?.response) {
      toast.error(error?.response?.data?.content);
    } else {
      throw error.message;
    }
  }
}

export async function addLocation(payload) {
  try {
    const response = await baseAPI.post("/vi-tri", payload);
    return response.data?.content;
  } catch (error) {
    throw error.response.content;
  }
}

export async function removeLocation(id) {
  try {
    const response = await baseAPI.delete(`/vi-tri/${id}`);
    return response.data?.content;
  } catch (error) {
    throw error.response.content;
  }
}
export async function updateLocation(id, payload) {
  try {
    const response = await baseAPI.put(`/vi-tri/${id}`, payload);
    return response.data?.content;
  } catch (error) {
    throw error.response.content;
  }
}


export const editImg = async (formFile, maViTri) => {
  try {
    const formData = new FormData();
    formData.append('maViTri', maViTri);
    for (let key in formFile) {
      formData.append(key, formFile[key]);
    }

    // Gọi hàm không đồng bộ và sử dụng await
    const resp = await baseAPI.post("/vi-tri/upload-hinh-vitri", formData);

    // Kiểm tra nếu resp.content được định nghĩa đúng
    if (resp && resp.data && resp.data.content) {
      return resp.data.content;
    } else {
      // Trả về một giá trị mặc định hoặc xử lý lỗi khác
      return null;
    }
  } catch (error) {
    if (error?.response) {
      toast.error(error?.response?.data?.content);
    } else {
      throw error.message;
    }
  }
};
