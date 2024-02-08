import { InitialInvitations } from "@/types/invitations";

export default function mapInvitations(initialData: InitialInvitations) {
  return initialData.invitations.map(({ id, inviter, dashboard }) => ({
    id,
    inviter: inviter.nickname,
    dashboard: dashboard.title,
  }));
}
