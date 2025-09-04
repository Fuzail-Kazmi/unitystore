// import axios from "axios";
// import { API_URL } from "./index";
// import { redirectToLogin } from "./redirect";

// const axiosClient = axios.create({
//   baseURL: API_URL,
//   withCredentials: true,
// });

// axiosClient.interceptors.request.use((config) => {
//   const tokens = localStorage.getItem("tokens");
//   if (tokens) {
//     const { access } = JSON.parse(tokens);
//     if (access) {
//       config.headers.Authorization = `Bearer ${access}`;
//     }
//   }
//   return config;
// });

// axiosClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const tokens = localStorage.getItem("tokens");
//       if (tokens) {
//         const { refresh } = JSON.parse(tokens);
//         try {
//           const res = await axios.post(`${API_URL}api/login/refresh/`, { refresh });
//           const newTokens = { access: res.data.access, refresh };
//           localStorage.setItem("tokens", JSON.stringify(newTokens));
//           originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
//           return axiosClient(originalRequest);
//         } catch (refreshError) {
//           localStorage.removeItem("tokens");
//           redirectToLogin();
//         }
//       } else {
//         redirectToLogin();
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default axiosClient;

import axios from "axios";
import { API_URL } from "./index";

const axiosClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

axiosClient.interceptors.request.use((config) => {
  const tokens = localStorage.getItem("tokens");
  if (tokens) {
    const { access } = JSON.parse(tokens);
    if (access) {
      config.headers.Authorization = `Bearer ${access}`;
      console.log("🔑 Sending access token:", access);
    }
  } else {
    console.log("❌ No tokens found in localStorage");
  }
  return config;
});

export default axiosClient;
