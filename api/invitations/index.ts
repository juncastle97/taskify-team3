import axios from "@/lib/axios";
import { PostDashboardInvitationType } from "@/types/dashboard";

/**
 * 대시보드 초대 불러오기
 */
export const getInvitationList = async (
  dashboardId: number,
  size?: number,
  page?: number,
) => {
  const response = await axios.get(
    `/dashboards/${dashboardId}/invitations?page=${page}&size=${size}`,
  );
  return response.data;
};

/**
 * 대시보드 초대하기
 */
export const inviteDashboard = async (
  dashboardId: number,
  data: PostDashboardInvitationType,
) => {
  const response = await axios.post(
    `/dashboards/${dashboardId}/invitations`,
    data,
  );
  return response.data;
};

/**
 * 대시보드 초대 취소
 */
export const deleteDashboardInvitation = async (
  dashboardId: number,
  invitationId: number | undefined,
) => {
  const response = await axios.delete(
    `/dashboards/${dashboardId}/invitations/${invitationId}`,
  );

  return response.data;
};

/**
 * 초대된 이메일 중복 확인
 */
export const checkEmailExists = async (dashboardId: number) => {
  const response = await axios.get(`/dashboards/${dashboardId}/invitations`);
  return response.data;
};
