import axios from "axios";

const baseAPI = axios.create({
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
    if (error.response.status === 403) {
      localStorage.removeItem("currenuser");
      window.location.replace("/SiginUser");
    }
    return Promise.reject(error);
  }
);

export default baseAPI;
