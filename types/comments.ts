export interface CommentAuthor {
  id: number;
  nickname: string;
  profileImageUrl: string | null;
}

export interface CommentContent {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  cardId: number;
  author: CommentAuthor;
}

export interface Comment {
  comments: CommentContent[];
  cursorId: number | null;
}