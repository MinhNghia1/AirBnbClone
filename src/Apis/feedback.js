import baseAPI from "./baseAPI";
import { toast } from "react-toastify";

export async function getFeedbacks(roomId) {
    try {
      const response = await baseAPI.get(
        `/binh-luan/lay-binh-luan-theo-phong/${roomId}`
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
  
  export async function postFeedbacks(payload) {
    try {
      const response = await baseAPI.post("/binh-luan", payload);
      return response.data.content;
    } catch (error) {
    if (error?.response) {
      toast.error(error?.response?.data?.content);
    } else {
      throw error.message;
    }
  }
  }
  