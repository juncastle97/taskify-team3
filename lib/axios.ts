import axios from "axios";

const authInstance = axios.create({
  baseURL: "https://sp-taskify-api.vercel.app/2-3/",
});

authInstance.interceptors.request.use(config => {
  const accessToken = localStorage.getItem("login");
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

export default authInstance;
