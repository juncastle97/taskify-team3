import axios from "@/lib/axios";
import { PutDashboardTitleType } from "@/types/dashboard";

/**
 * 대시보드 상세 조회
 */
export const getDashboardInfo = async (dashboardId: number) => {
  const response = await axios.get(`/dashboards/${dashboardId}`);
  return response.data;
};

/**
 * 대시보드 수정
 */
export const editDashboard = async (
  dashboardId: number,
  data: PutDashboardTitleType,
) => {
  const response = await axios.put(`/dashboards/${dashboardId}`, data);
  return response;
};

/**
 * 대시보드 삭제
 */
export const deleteDashboard = async (dashboardId: number) => {
  const response = await axios.delete(`/dashboards/${dashboardId}`);
  return response;
};
