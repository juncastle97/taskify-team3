import axios from "@/lib/axios";

/**
 * 대시보드 상세 조회
 */
// export const getDashboardInfo = async (dashboardId: number) => {
//   try {
//     const response = await axios.get(`/api/vercel/dashboards/${dashboardId}`);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };

// test
export const getDashboardInfo = async () => {
  try {
    const response = await axios.get(`/dashboards/2722`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
