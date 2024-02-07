export interface InitialCardData {
  cursorId: number;
  totalCount: number;
  cards: [
    {
      id: number;
      title: string;
      description: string;
      tags: string[];
      dueDate: string;
      assignee: {
        profileImageUrl: string;
        nickname: string;
        id: number;
      };
      imageUrl: string;
      teamId: string;
      columnId: number;
      createdAt: string;
      updatedAt: string;
    },
  ];
}

export interface CardPropsType {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assignee: {
    profileImageUrl: string | null;
    nickname: string;
    id: number;
  };
  imageUrl: string;
  teamId: string;
  columnId: number;
  createdAt: string;
  updatedAt: string;
}

export interface TodoEditType {
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assignee: {
    nickname: string;
  };
  imageUrl: string;
}

export interface TodoCreateType {
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assignee: Assignee[];
  imageUrl: string;
}

export interface Assignee {
  profileImageUrl: string;
  nickname: string;
  id: number;
}
