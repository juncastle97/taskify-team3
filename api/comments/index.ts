import axios from "@/lib/axios";

/**
 * 댓글 생성
 */
// export const postComments = async (data: string) => {
//   const response = await axios.post("/comments", , {
//     content: data.comment,
//     cardId: cardProps.id,
//     columnId: cardProps.columnId,
//     dashboardId: cardProps.dashboardId,
//   });
//   return response.data;
// };

/**
 * 댓글 목록 조회
 */
export const getComments = async (size: number, cardId: number) => {
  const response = await axios.get(`/comments?size=${size}&cardId=${cardId}`);
  return response.data;
};

/**
 * 댓글 수정
 */
export const putComments = async (commentId: number) => {
  const response = await axios.put(`/comments/${commentId}`);
  return response.data;
};

/**
 * 댓글 삭제
 */
export const deleteComments = async (commentId: number) => {
  const response = await axios.delete(`/comments/${commentId}`);
  return response.data;
};