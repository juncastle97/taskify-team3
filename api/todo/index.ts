import axios from "@/lib/axios";

export const postTodoCreateCard = async (data: any) => {
  const response = await axios.post(`cards`, data);
  console.log(data);
  return response.data;
};
