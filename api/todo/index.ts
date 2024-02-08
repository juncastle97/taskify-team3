import axios from "@/lib/axios";

export const postTodoCreateCard = async (data: any) => {
  const response = await axios.post(`/cards`, data);

  return response.data;
};

export const putTodoEditCard = async (cardId: number, data: any) => {
  const response = await axios.put(`/cards/${cardId}`, data);
  console.log(data);
  return response.data;
};
