import axios from "@/lib/axios";

/**
 * 대시보드 목록 조회
 */
export const getCardList = async (size: number, columnId: number) => {
  const response = await axios.get(`/cards?size=${size}&columnId=${columnId}`);
  return response.data;
};
