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
  dashboardId?: number;
  createdAt: string;
  updatedAt: string;
}

export interface TodoCreateType {
  assigneeUserId: number;
  dashboardId: number;
  columnId: number;
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
  userId: number;
}
