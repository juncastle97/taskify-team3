import { useState, useEffect } from "react";
import Image from "next/image";
import clsx from "clsx";
import styles from "./MembersDashboardTable.module.scss";
import { DeleteMemeberType, GetMemberListType } from "@/types/members";
import { getMemberList, deleteMember } from "@/api/members";
import PagingButton from "@/components/button/pagingButton/PagingButton";
import BaseButton from "@/components/button/baseButton/BaseButton";
import ProfileImage from "@/components/profileImage/ProfileImage";
import { useRouter } from "next/router";
import Spinner from "@/components/spinner";
import AlertModal from "@/components/modal/alertModal";

function MembersDashboardTable() {
  const router = useRouter();
  const { id } = router.query;
  const dashboardId = Number(id);
  const [currentPage, setCurrentPage] = useState(1);
  const [getMember, setGetMember] = useState<GetMemberListType | null>({
    members: [],
    totalCount: 0,
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedMember, setSelectedMember] = useState<DeleteMemeberType>({
    id: 0,
    nickname: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const ITEMS_PER_PAGE = 5;
  const totalPage = Math.ceil((getMember?.totalCount || 1) / ITEMS_PER_PAGE);

  const currentPageData = getMember?.members.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const openModal = (memberId: number, memberNickname: string) => () => {
    setSelectedMember({ id: memberId, nickname: memberNickname });
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleLeftButtonClick = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleRightButtonClick = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPage));
  };

  const handleDeleteMember = async (memberId: number) => {
    try {
      await deleteMember(memberId);
      setSelectedMember({ id: 0, nickname: "" });
      closeModal();
      MemberListData(currentPage);
    } catch (error) {
      console.error("멤버 삭제에 실패했습니다.", error);
    }
  };

  const MemberListData = async (page: number) => {
    try {
      const dashMember = await getMemberList(dashboardId, page, 20);
      setGetMember(dashMember);
      setIsLoading(false);
    } catch (error) {
      console.error("GET 요청 실패 :", error);
    }
  };

  useEffect(() => {
    if (totalPage !== 0 && totalPage < currentPage)
      setCurrentPage(prev => prev - 1);
  }, [totalPage]);

  useEffect(() => {
    if (router.query.id) {
      MemberListData(currentPage);
    }
  }, [dashboardId]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <form className={clsx(styles.tableForm)}>
      {isOpen && (
        <AlertModal
          setModal={setIsOpen}
          alertMessage={`${selectedMember.nickname} 님을 구성원에서 삭제하겠습니까?`}
          isCancelButton
          onConfirmClick={() => handleDeleteMember(selectedMember.id)}
        />
      )}
      <div className={clsx(styles.dashboardTitle)}>
        <div>구성원</div>
        <div className={clsx(styles.pageNumber)}>
          {`${totalPage} 페이지 중 ${currentPage}`}
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
        </div>
      </div>
      <div className={clsx(styles.label)}>이름</div>
      <ul>
        {currentPageData?.map(member => (
          <li key={member.id}>
            <div className={clsx(styles.memberListWrapper)}>
              <ProfileImage member={member} width={38} height={38} />
              <div className={clsx(styles.memberNickname)}>
                {member.nickname}
              </div>
              {member.isOwner ? (
                <Image
                  className={clsx(styles.crownIcon)}
                  src="/button-icon/crown_icon.png"
                  width={16}
                  height={16}
                  alt="crown icon"
                />
              ) : (
                <div className={clsx(styles.buttons)}>
                  <BaseButton
                    onClick={openModal(member.id, member.nickname)}
                    small
                    white
                  >
                    삭제
                  </BaseButton>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </form>
  );
}
export default MembersDashboardTable;
