import baseAPI from "./baseAPI";

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
