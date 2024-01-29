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

export interface GetMemberListResponseType {
  members: MemberListType[];
  totalCount: number;
}
