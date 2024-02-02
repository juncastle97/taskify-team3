export interface DashboardType {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
}

export interface PutDashboardTitleType {
  title: string | undefined;
  color: string | undefined;
}

export interface InviteeType {
  nickname: string;
  email: string;
  id: number;
}

export interface DashboardInvitationType {
  id: number;
  inviterUserId: number;
  teamId: string;
  dashboard: {
    title: string;
    id: number;
  };
  invitee: InviteeType;
  inviteAccepted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GetDashboardInvitationType {
  totalCount: number;
  invitations: DashboardInvitationType[];
}

export interface PostDashboardInvitationType {
  email: string;
}
