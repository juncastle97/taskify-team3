import axios from "@/lib/axios";

/**
 * 대시보드 상세 조회
 */
// test, dashboardId: number
export const getDashboardInfo = async () => {
  try {
    //const response = await axios.get(`/dashboards/${dashboardId}`);

    const response = await axios.get(`/dashboards/2722`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
