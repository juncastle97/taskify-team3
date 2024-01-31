import clsx from "clsx";
import { useEffect, useState } from "react";
import styles from "./InviteDashboardTable.module.scss";
import PagingButton from "@/components/button/pagingButton/PagingButton";
import Button from "@/components/button/BaseButton/BaseButton";
import Image from "next/image";
import mockInvitations from "@/pages/mydashboard/mockInvitations.json";
import NoInvitation from "../myInvitedDashboardTable/NoInvitation";
import { InitialInvitations } from "@/types/invitations";

interface Invitee {
  nickname: string;
  email: string;
  id: number;
}

interface InvitationType {
  id: number;
  invitee: Invitee;
  inviteAccepted: boolean;
  createdAt: string;
}

type InvitationTypes = InvitationType[];

function InviteDashboardTable({ totalCount }: InitialInvitations) {
  const [currentPage, setCurrentPage] = useState(1);
  // mockdata 연결
  const [inviteeData, setInviteeData] = useState<InvitationTypes | null>(null);

  const ITEMS_PER_PAGE = 4;
  const totalPage = Math.ceil((totalCount || 1) / ITEMS_PER_PAGE);
  const handleLeftButtonClick = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleRightButtonClick = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPage));
  };

  const handleCancelInvitation = (invitationId: number) => {
    setInviteeData(prevInviteeData => {
      if (prevInviteeData) {
        return prevInviteeData.map(invitation => {
          if (invitation.id === invitationId) {
            return {
              ...invitation,
              inviteAccepted: false,
            };
          }
          return invitation;
        });
      }
      return prevInviteeData;
    });
  };

  useEffect(() => {
    if (totalPage !== 0 && totalPage < currentPage)
      setCurrentPage(prev => prev - 1);
  }, [totalPage]);

  useEffect(() => {
    const fetchInviteeData = async () => {
      try {
        const result: InvitationTypes = await mockInvitations.invitations;
        setInviteeData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchInviteeData();
  }, [inviteeData]);

  return (
    <form className={clsx(styles.tableForm)}>
      <div className={clsx(styles.dashboardTitle)}>
        <div>초대 내역</div>
        <div className={clsx(styles.pageNumber)}>
          <p>{`${totalPage} 페이지 중 ${currentPage}`}</p>
          <div className={clsx(styles.buttonGroup)}>
            <PagingButton
              onClick={{
                left: handleLeftButtonClick,
                right: handleRightButtonClick,
              }}
              disabled={{
                left: currentPage === 1,
                right: currentPage === totalPage,
              }}
              small
            />
            <div className={clsx(styles.inviteButton)}>
              <Button small>
                <div className={clsx(styles.buttonText)}>
                  <Image
                    src="/icons/addImage.svg"
                    width={16}
                    height={16}
                    alt="add image"
                  />
                  {"초대하기"}
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
      {mockInvitations.totalCount ? (
        <>
          <div className={clsx(styles.label)}>이메일</div>
          <ul>
            {mockInvitations.invitations
              ?.sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime(),
              )
              .map(invitation => (
                <li key={invitation.invitee.email}>
                  {invitation.inviteAccepted && (
                    <div className={clsx(styles.inviteListWrapper)}>
                      <div className={clsx(styles.invitedEmail)}>
                        {invitation.invitee.email}
                      </div>
                      <button
                        type="button"
                        className={clsx(styles.cancelButton)}
                        onClick={() => {
                          alert(
                            `${invitation.invitee.nickname}님 초대를 취소하겠습니까?`,
                          );
                          handleCancelInvitation(invitation.id);
                        }}
                      >
                        취소
                      </button>
                    </div>
                  )}
                </li>
              ))}
          </ul>
        </>
      ) : (
        <NoInvitation />
      )}
    </form>
  );
}
export default InviteDashboardTable;
