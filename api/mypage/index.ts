import axios from "@/lib/axios";
import { PutPasswordInfoProps } from "@/types/users";
import { PutUserInfoProps } from "@/types/users";
import authInstance from "@/lib/axios";

export const editPassword = async (data: PutPasswordInfoProps) => {
  const response = await axios.put("auth/password", data);
  return response.data;
};

export const getUserInfo = async () => {
  try {
    const response = await axios.get("users/me");
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updateUserProfile = async (data: PutUserInfoProps) => {
  try {
    const response = await authInstance.put(`users/me`, data);

    if (response.status === 200) {
      const updatedResponse = await axios.put(`users/me`, data);
      return updatedResponse.data;
    } else {
      throw new Error("PUT 요청 실패:" + response.status);
    }
  } catch (error) {
    console.error("PUT 요청 에러:", error);
    throw error;
  }
};
