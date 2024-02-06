import axios from "@/lib/axios";

/**
 * 컬럼 목록 조회
 */
export const getColumnList = async (dashboardId: number) => {
  const response = await axios.get(`/columns?dashboardId=${dashboardId}`);
  return response.data;
};
