import axios from "@/lib/axios";
import { PutPasswordInfoProps } from "@/types/users";

export const editPassword = async (data: PutPasswordInfoProps) => {
  const response = await axios.put("auth/password", data);
  return response.data;
};
