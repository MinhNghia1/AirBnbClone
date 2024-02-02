import axios from "axios";

const export const editImg = async (formFile, maViTri) => {
  try {
    const formData = new FormData();
    formData.append("location", formFile.location);

    console.log("formData:", formData); // Check the data sent to the server

    const resp = await baseAPI.post(`/api/locations/upload-images/${maViTri}`, formData, {
      headers: {
        'token': '{{token_admin}}', // Replace with your actual token_admin value
        'tokenByClass': '{{tokenByClass}}', // Replace with your actual tokenByClass value
        'Content-Type': 'multipart/form-data',
      },
    });

    return resp.data?.content;
  } catch (error) {
    console.error("Error in editImg:", error);

    if (error?.response) {
      toast.error(error?.response?.data?.content);
    } else {
      toast.error("An unexpected error occurred.");
    }
    throw error.message;
  }
};
baseAPI = axios.create({
  baseURL: "https://airbnbnew.cybersoft.edu.vn/api",
  headers: {
    tokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA1NSIsIkhldEhhblN0cmluZyI6IjI0LzA1LzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcxNjUwODgwMDAwMCIsIm5iZiI6MTY4Nzg4NTIwMCwiZXhwIjoxNzE2NjU2NDAwfQ.HsoestvkIN5Kub3jnAr8UddrPugJcxCsAm4QfMi4ZbU",
  },
});
baseAPI.interceptors.request.use(
  (request) => {
    const currentUser = JSON.parse(localStorage.getItem("currenuser"));
    if (currentUser) {
      request.headers.token = `${currentUser.token}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);
baseAPI.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // mã lỗi 403 => token hết hạn => đăng xuất
    if (error.response.content === "token user hết hạn hoặc không đúng") {
      localStorage.removeItem("currenuser");
      window.location.replace("/SiginUser");
    }
    return Promise.reject(error);
  }
);

export default baseAPI;
