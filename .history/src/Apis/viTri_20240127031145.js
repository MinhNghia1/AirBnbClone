import baseAPI from "./baseAPI";

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
