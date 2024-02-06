import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import clsx from "clsx";
import styles from "./InvitationDashboardTable.module.scss";
import {
  DeleteDashboardInvitationType,
  GetDashboardInvitationType,
} from "@/types/dashboard";
import {
  getInvitationList,
  deleteDashboardInvitation,
} from "@/api/invitations";
import Spinner from "@/components/spinner";
import PagingButton from "@/components/button/pagingButton/PagingButton";
import BaseButton from "@/components/button/baseButton/BaseButton";
import NoInvitation from "../myInvitedDashboardTable/NoInvitation";
import InviteModal from "@/components/modal/invitationModal";
import AlertModal from "@/components/modal/alertModal";

function InvitationDashboardTable() {
  const router = useRouter();
  const { id } = router.query;
  const dashboardId = Number(id);
  const [currentPage, setCurrentPage] = useState(1);
  const [getInvitation, setGetInvitation] =
    useState<GetDashboardInvitationType>({
      totalCount: 0,
      invitations: [],
    });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
  const [selectedInvitation, setSelectedInvitaton] =
    useState<DeleteDashboardInvitationType>({
      id: 0,
      nickname: "",
    });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const ITEMS_PER_PAGE = 5;
  const totalPage = Math.ceil((getInvitation.totalCount || 1) / ITEMS_PER_PAGE);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const openAlertModal =
    (invitationId: number, invitationNickname: string) => () => {
      setSelectedInvitaton({ id: invitationId, nickname: invitationNickname });
      setIsAlertOpen(true);
    };

  const closeAlertModal = () => {
    setIsAlertOpen(false);
  };

  const handleLeftButtonClick = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleRightButtonClick = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPage));
  };

  const InvitationData = async (page: number) => {
    try {
      const response = await getInvitationList(dashboardId, 5, page);
      setGetInvitation(response);
      setIsLoading(false);
    } catch (error) {
      console.error("GET 요청 실패: ", error);
    }
  };

  const handleCancelInvitation = async (invitationId: number) => {
    try {
      await deleteDashboardInvitation(dashboardId, invitationId);
      setSelectedInvitaton({ id: 0, nickname: "" });
      closeAlertModal();
      InvitationData(currentPage);
    } catch (error) {
      console.error("초대 삭제에 실패했습니다.", error);
    }
  };

  useEffect(() => {
    if (totalPage !== 0 && totalPage < currentPage)
      setCurrentPage(prev => prev - 1);
  }, [totalPage]);

  useEffect(() => {
    if (router.query.id) {
      if (!isModalOpen) {
        {
          InvitationData(currentPage);
        }
      }
    }
  }, [isModalOpen, dashboardId, getInvitation.totalCount, currentPage]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <form className={clsx(styles.tableForm)}>
      {isModalOpen && <InviteModal setModal={setIsModalOpen} />}
      {isAlertOpen && (
        <AlertModal
          setModal={setIsAlertOpen}
          alertMessage={`${selectedInvitation.nickname} 님 초대를 취소하겠습니까?`}
          isCancelButton
          onConfirmClick={() => handleCancelInvitation(selectedInvitation.id)}
        />
      )}
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
            <div className={clsx(styles.button)}>
              <BaseButton onClick={openModal} small>
                <div className={clsx(styles.buttonText)}>
                  <Image
                    src="/icons/addImage.svg"
                    width={16}
                    height={16}
                    alt="add image"
                  />
                  초대하기
                </div>
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
      {getInvitation?.totalCount ? (
        <>
          <div className={clsx(styles.label)}>이메일</div>
          <ul>
            {getInvitation.invitations
              ?.sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime(),
              )
              .map(invitation => (
                <li key={invitation.invitee.id}>
                  <div className={clsx(styles.inviteListWrapper)}>
                    <div className={clsx(styles.invitedEmail)}>
                      {invitation.invitee.email}
                    </div>
                    <BaseButton
                      type="button"
                      onClick={openAlertModal(
                        invitation.id,
                        invitation.invitee.nickname,
                      )}
                      small
                      white
                    >
                      취소
                    </BaseButton>
                  </div>
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
export default InvitationDashboardTable;
