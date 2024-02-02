import axios from "@/lib/axios";

/**
 * 대시보드 초대 불러오기
 */
export const getInvitationList = async (
  // dashboardId: number,
  size: number,
  page: number,
) => {
  try {
    // const response = await axios.get(
    //   `/dashboards/${dashboardId}/invitations?page=${page}&size=${size}`,
    // );

    const response = await axios.get(
      `/dashboards/2722/invitations?page=${page}&size=${size}`,
    );
    return response.data;
  } catch (error) {
    console.error("GET 요청 에러:", error);
  }
};
