import baseAPI from "./baseAPI";
import { toast } from "react-toastify";

export const signUpUser = async (user) => {
  try {
    const reps = baseAPI.post("/auth/signup", user);
    return (await reps).data.content;
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
    const reps = baseAPI.post("/auth/signin", user);
    return (await reps).data.content;
  } catch (error) {
    if (error?.response) {
      toast.error(error?.response?.data?.content);
    } else {
      toast.error(error.message);
    }
  }
};
