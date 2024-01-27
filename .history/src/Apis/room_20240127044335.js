import baseAPI from "./baseAPI";
import { toast } from "react-toastify";

export const getRoomByLocation = async (id) => {
  try {
    const resp = await baseAPI.get("/phong-thue/lay-phong-theo-vi-tri", {
      params: {
        maViTri: id,
      },
    });
    return resp.data.content;
  } catch (error) {
    if (error.respone) {
      throw error.respone?.data?.content;
    } else {
      throw error?.message;
    }
  }
};
export async function getRoomDetail(roomId) {
  try {
    const response = await baseAPI.get(`/phong-thue/${roomId}`);
    return response.data.content;
  } catch (error) {
    if (error?.response) {
      toast.error(error?.response?.data?.content);
    } else {
      throw error.message;
    }
  }
}

export async function getRoomisBooked() {
  try {
    const response = await baseAPI.get("/dat-phong");
    return response.data.content;
  } catch (error) {
    if (error?.response) {
      toast.error(error?.response?.data?.content);
    } else {
      throw error.message;
    }
  }
}
export async function bookingRoom(payload) {
  try {
    const response = await baseAPI.post("/dat-phong", payload);
    return response.data.content;
  } catch (error) {
    if (error?.response) {
      toast.error(error?.response?.data?.content);
    } else {
      throw error.message;
    }
  }
}

export async function getHistoryRoom(userId) {
  try {
    const response = await baseAPI.get(
      `/dat-phong/lay-theo-nguoi-dung/${userId}`
    );
    return response.data.content;
  } catch (error) {
    if (error?.response) {
      toast.error(error?.response?.data?.content);
    } else {
      throw error.message;
    }
  }
}

export const removeBooked = async (id) => {
  try {
    const response = await baseAPI.delete(`/dat-phong/${id}`);
    return response.data?.content;
  } catch (error) {
    if (error?.response) {
      toast.error(error?.response?.data?.content);
    } else {
      throw error.message;
    }
  }
};

export const updateBooking = async (userId, payload) => {
  try {
    const response = await baseAPI.put(`/dat-phong/${userId}`, payload);
    return response.data?.content;
  } catch (error) {
    if (error?.response) {
      toast.error(error?.response?.data?.content);
    } else {
      throw error.message;
    }
  }
};

export const getBooked = async (userId) => {
  try {
    const response = await baseAPI.get(`/dat-phong/${userId}`);
    return response.data?.content;
  } catch (error) {
    if (error?.response) {
      toast.error(error?.response?.data?.content);
    } else {
      throw error.message;
    }
  }
};

export const getListRooms = async () => {
  try {
    const response = await baseAPI.get(`/phong-thue`);
    return response.data?.content;
  } catch (error) {
    if (error?.response) {
      toast.error(error?.response?.data?.content);
    } else {
      throw error.message;
    }
  }
};

export const deleteRoom = async (roomId) => {
  try {
    const response = await baseAPI.delete(`/phong-thue/${roomId}`);
    return response.data?.content;
  } catch (error) {
    if (error?.response) {
      toast.error(error?.response?.data?.content);
    } else {
      throw error.message;
    }
  }
};

export const updateRoom = async (roomId, payload) => {
  try {
    const response = await baseAPI.put(`/phong-thue/${roomId}`, payload);
    return response.data?.content;
  } catch (error) {
    if (error?.response) {
      toast.error(error?.response?.data?.content);
    } else {
      throw error.message;
    }
  }
};
export const addRoom = async (payload) => {
  try {
    const response = await baseAPI.post(`/phong-thue`, payload);
    return response.data?.content;
  } catch (error) {
    if (error?.response) {
      toast.error(error?.response?.data?.content);
    } else {
      throw error.message;
    }
  }
};
export const upLoadImgRoom = async (roomId, payload) => {
  try {
    const response = await baseAPI.post(
      `/phong-thue/upload-hinh-phong`,
      payload,
      {
        params: {
          maPhong: roomId,
        },
      }
    );
    return response.data?.content;
  } catch (error) {
    if (error?.response) {
      toast.error(error?.response?.data?.content);
    } else {
      throw error.message;
    }
  }
};
