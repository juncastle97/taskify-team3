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
export interface GetUserInfoType {
  email: string;
  nickname: string;
  profileImageUrl: string | null;
}
export interface GetProfileImageType {
  profileImageUrl: string | null;
}
export interface PutPasswordType {
  password: string;
  newPassword: string;
}

export interface PutUserInfoProps {
  nickname?: string;
  profileImageUrl?: string | null;
}

export interface PutPasswordInfoProps {
  password: string;
  newPassword: string;
}
