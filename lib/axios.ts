import axios from "axios";

const authInstance = axios.create({
  baseURL: "https://sp-taskify-api.vercel.app/2-3/",
});

authInstance.interceptors.request.use(config => {
  const accessToken = window.localStorage.getItem("login");

  // if (accessToken)
  //   config.headers.Authorization = `Bearer ${dashboardId}`;

  // test
  if (accessToken)
    config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzA4LCJ0ZWFtSWQiOiIyLTMiLCJpYXQiOjE3MDY2OTM4OTIsImlzcyI6InNwLXRhc2tpZnkifQ.K6Sscplbko0_PPazWg0wFYna77L8vg-NvJJ9JJutucM`;

  return config;
});

export default authInstance;
