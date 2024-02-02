import axios from "@/lib/axios";

/**
 * 대시보드 멤버 삭제
 */
export const deleteMember = async (memberId: number | undefined) => {
  try {
    const response = await axios.delete(`/members/${memberId}`);

    if (response.status === 204) {
      // DELETE 요청이 성공적으로 처리된 경우 페이지를 새로 고침합니다.
      window.location.reload();
    } else {
      // 오류 처리
      console.error("DELETE 요청 실패:", response.status);
    }
  } catch (error) {
    console.error("DELETE 요청 에러:", error);
  }
};
