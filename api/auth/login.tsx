import axios from "@/lib/axios";
import { PostLoginRequestType } from "@/types/auth";

export const login = async (data: PostLoginRequestType) => {
  try {
    const response = await axios.post("/api/vercel/auth/login", data);

    if (response.status === 201) {
      window.localStorage.setItem("login", response.data.accessToken);
      return response.data; // 여기서 성공 메시지를 반환하지 않습니다. 성공 알림은 handleLogin에서 처리합니다.
    }
  } catch (error: any) {
    if (error.response) {
      // 서버에서 응답한 에러 메시지를 그대로 예외로 발생시킵니다.
      throw new Error(error.response.data.message);
    } else if (error.request) {
      // 요청이 이루어졌으나 응답을 받지 못한 경우
      throw new Error("서버로부터 응답이 없습니다.");
    } else {
      // 요청을 설정하는 과정에서 문제가 발생한 경우
      throw new Error("로그인 요청 중 문제가 발생했습니다.");
    }
  }
};
