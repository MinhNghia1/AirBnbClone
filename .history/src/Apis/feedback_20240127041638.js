import baseAPI from "./baseAPI";



export async function getFeedbacks(roomId) {
  try {
    const response = await baseAPI.get(
      `/binh-luan/lay-binh-luan-theo-phong/${roomId}`
    );
    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}

export async function postFeedbacks(payload) {
  try {
    const response = await baseAPI.post("/binh-luan", payload);
    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}
