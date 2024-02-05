import axios from "@/lib/axios";

/**
 * 내 정보 조희
 */
export const getMyInfo = async () => {
  const response = await axios.get(`/users/me`);
  return response.data;
};
