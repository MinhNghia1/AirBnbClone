import baseAPI from "./baseAPI";

export const infoRoomBooking = async (idUser) => {
  try {
    const resp = await baseAPI.get(`/dat-phong/lay-theo-nguoi-dung/${idUser}`);
    return resp.data.content;
  } catch (error) {
    if (error.respone) {
      throw error.respone?.data?.content;
    } else {
      throw error?.message;
    }
  }
};
