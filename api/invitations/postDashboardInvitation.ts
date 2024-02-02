import axios from "@/lib/axios";
import { PostDashboardInvitationType } from "@/types/dashboard";

export const inviteDashboard = async (
  // dashboardId: number,
  data: PostDashboardInvitationType,
) => {
  try {
    const response = await axios.post(
      // `/dashboards/${dashboardId}/invitations`,
      `/dashboards/2722/invitations`,
      data,
    );
    if (response.status === 201) {
      // POST 요청이 성공적으로 처리된 경우 페이지를 새로 고침합니다.
      window.location.reload();
      return response;
    } else {
      console.error("POST 요청 실패:", response.status);
    }
  } catch (error) {
    console.error("POST 요청 에러:", error);
  }
};
