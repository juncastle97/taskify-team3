import axios from "@/lib/axios";

/**
 * 내가 받은 초대 목록 조회
 * @param page
 * @param size
 * @param dashboardId
 */
export const getMemberList = async (
  // dashboardId: number,
  page: number = 1,
  size: number = 20,
) => {
  try {
    // const response = await axios.get(
    //   `/members?page=${page}&size=${size}&dashboardId=${dashboardId}`,
    // );

    const response = await axios.get(
      `/members?page=${page}&size=${size}&dashboardId=2722`,
    );
    return response.data;
  } catch (error) {
    console.error("GET 요청 에러:", error);
  }
};
