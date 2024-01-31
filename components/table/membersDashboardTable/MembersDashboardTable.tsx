import clsx from "clsx";
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "./MembersDashboardTable.module.scss";
import PagingButton from "@/components/button/pagingButton/PagingButton";
import assigneeMockData from "@/pages/dashboard/mockAssignee.json";
import Button from "@/components/button/baseButton/BaseButton";
import BaseButton from "@/components/button/baseButton/BaseButton";

interface Assignee {
  assignee: {
    profileImageUrl: string;
    nickname: string;
    id: number;
  };
}

interface DashboardProps {
  assigneeData: Assignee[] | null;
}

const MembersDashboardTable: React.FC<DashboardProps> = () => {
  const [currentPage, setCurrentPage] = useState(1);
  // mockdata 연결
  const [assigneeData, setAssigneeData] = useState<Assignee[] | null>(null);
  // swagger 연결
  // const [dashMember, setDashMember] = useState<GetMemberListResponseType>({
  //   members: [],
  //   totalCount: 0,
  // });

  const ITEMS_PER_PAGE = 4;
  const totalPage = Math.ceil((assigneeData?.length || 1) / ITEMS_PER_PAGE);

  const currentPageData = assigneeData?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleLeftButtonClick = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleRightButtonClick = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPage));
  };

  const handleDeleteMember = (memberId: number) => {
    // 데이터 삭제 기능
    console.log(`Deleting member with ID: ${memberId}`);
  };

  useEffect(() => {
    if (totalPage !== 0 && totalPage < currentPage)
      setCurrentPage(prev => prev - 1);
  }, [totalPage]);

  useEffect(() => {
    const fetchAssigneeData = async () => {
      try {
        const result: Assignee[] = await assigneeMockData;
        setAssigneeData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAssigneeData();
  }, []);

  return (
    <form className={clsx(styles.tableForm)}>
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
        {currentPageData?.map((member, index) => (
          <li key={member.assignee.id}>
            <div className={clsx(styles.memberListWrapper)}>
              <Image
                src={`${member.assignee.profileImageUrl as string}`}
                alt="프로필 이미지"
                width={38}
                height={38}
              />

              <div className={clsx(styles.memberNickname)}>
                {member.assignee.nickname}
              </div>
              {index === 0 && currentPage === 1 ? (
                <Image
                  className={clsx(styles.crownIcon)}
                  src="/button-icon/crown_icon.png"
                  width={16}
                  height={16}
                  alt="crown icon"
                />
              ) : (
                <div className={clsx(styles.button)}>
                  <BaseButton
                    onClick={() => {
                      alert(
                        `${member.assignee.nickname}님을 구성원에서 삭제하겠습니까?`,
                      );
                      handleDeleteMember(member.assignee.id);
                    }}
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
};
export default MembersDashboardTable;
