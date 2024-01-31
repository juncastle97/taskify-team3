export interface UserType {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PostSignUpType {
  email: string;
  nickname: string;
  password: string;
}

export interface PutDashboardType {
  nickname: string;
  profileImageUrl: string | null;
}

export interface PostProfileImageType {
  profileImageUrl: string | null;
}
