export interface MemberListType {
  id: number;
  userId: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
  isOwner: boolean;
}

export interface GetMemberListType {
  members: MemberListType[];
  totalCount: number;
}

export interface DeleteMemeberType {
  id: number;
  nickname: string;
}
