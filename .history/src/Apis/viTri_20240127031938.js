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
export async function getLocationById(roomId) {
  try {
    const response = await fetcher.get(`/vi-tri/${roomId}`);
    return response.data.content;
  } catch (error) {
    throw error.response.data.content;
  }
}

export async function getLocationByPageSize() {
  try {
    const response = await fetcher.get("/vi-tri/phan-trang-tim-kiem", {
      params: {
        pageIndex: 1,
        pageSize: 10,
        keyword: "",
      },
    });
    return response.data?.content;
  } catch (error) {
    throw error.response.content;
  }
}

export async function addLocation(payload) {
  try {
    const response = await fetcher.post("/vi-tri", payload);
    return response.data?.content;
  } catch (error) {
    throw error.response.content;
  }
}

export async function removeLocation(id) {
  try {
    const response = await fetcher.delete(`/vi-tri/${id}`);
    return response.data?.content;
  } catch (error) {
    throw error.response.content;
  }
}
export async function updateLocation(id, payload) {
  try {
    const response = await fetcher.put(`/vi-tri/${id}`, payload);
    return response.data?.content;
  } catch (error) {
    throw error.response.content;
  }
}

