export interface Comment {
  comments: {
    id: number;
    content: string;
    createdAt: string;
    updatedAt: string;
    cardId: number;
    author: {
      id: number;
      nickname: string;
      profileImageUrl: string | null;
    };
  };
}

export interface Content {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  cardId: number;
  author: {
    id: number;
    nickname: string;
    profileImageUrl: string | null;
  };
}
