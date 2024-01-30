import clsx from "clsx";
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "./MembersDashboardTable.module.scss";
import PagingButton from "@/components/button/PagingButton";
import { GetMemberListResponseType } from "@/types/members";
import assigneeMockData from "@/pages/dashboard/mockAssignee.json";

import ModalContainer from "@/components/modal/ModalContainer";
import Button from "@/components/button/BaseButton/BaseButton";

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

  const ITEMS_PER_PAGE = 4; // 페이지 당 보여지는 assignee의 수

  // 총 페이지 수 계산
  const totalPage = Math.ceil((assigneeData?.length || 0) / ITEMS_PER_PAGE);

  // 현재 페이지에 해당하는 assignee 데이터 선택
  const currentPageData = assigneeData?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  // 페이지 이동 처리
  const handleLeftButtonClick = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleRightButtonClick = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPage));
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
      <div>
        {currentPageData?.map((member, index) => (
          <div key={member.assignee.id}>
            <div className={clsx(styles.memberListWrapper)}>
              <Image
                className={clsx(styles.memberProfileImage)}
                src={`${member.assignee.profileImageUrl as string}`}
                alt="프로필 이미지"
                width={38}
                height={38}
              />
              <div>
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
                  // 버튼 컴포넌트 구현되면 사용
                  <button
                    type="button"
                    className={clsx(styles.deleteButton)}
                    onClick={() => ModalContainer}
                  >
                    삭제
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </form>
  );
};
export default MembersDashboardTable;
