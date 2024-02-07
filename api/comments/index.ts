import axios from "@/lib/axios";

/**
 * 댓글 생성
 */
export const postComments = async () => {
  const response = await axios.post("/comments");
  return response.data;
};

/**
 * 댓글 생성
 */
export const getComments = async (size: number, cardId: number) => {
  const response = await axios.get(`/comments?size=${size}&cardId=${cardId}`);
  return response.data;
};