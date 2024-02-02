import authInstance from "@/lib/axios";
import { PutDashboardTitleType } from "@/types/dashboard";

/**
 * 대시보드 수정
 */
export const editDashboard = async (
  // dashboardId: number,
  data: PutDashboardTitleType,
) => {
  // const response = await authInstance.put(
  //   `/dashboards/${dashboardId}`,
  //   data,
  // );

  //test
  try {
    const response = await authInstance.put(`/dashboards/2722`, data);

    if (response.status === 200) {
      // PUT 요청이 성공적으로 처리된 경우 페이지를 새로 고침합니다.
      window.location.reload();
    } else {
      // 오류 처리
      console.error("PUT 요청 실패:", response.status);
    }
  } catch (error) {
    console.error("PUT 요청 에러:", error);
  }
};
