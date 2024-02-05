import axios from "@/lib/axios";

/**
 * 내가 받은 초대 목록 조회
 */
export const getMemberList = async (
  dashboardId: number,
  page: number = 1,
  size: number = 20,
) => {
  const response = await axios.get(
    `/members?page=${page}&size=${size}&dashboardId=${dashboardId}`,
  );
  return response.data;
};

/**
 * 대시보드 멤버 삭제
 */
export const deleteMember = async (memberId: number | undefined) => {
  const response = await axios.delete(`/members/${memberId}`);

  return response.data;
};