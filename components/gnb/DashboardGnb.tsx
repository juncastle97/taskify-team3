import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import styles from "./DashboardGnb.module.scss";
import { COLORS } from "@/constants/colors";
import { useAuth } from "@/contexts/AuthProvider";
import { getMyInfo } from "@/api/users";
import { getMemberList } from "@/api/members";
import { getDashboard } from "@/api/dashboards";
import { UserType } from "@/types/users";
import ProfileImage from "../profileImage/ProfileImage";
import InvitationModal from "../modal/invitationModal";

interface Colors {
  GREEN: string;
  PURPLE: string;
  ORANGE: string;
  BLUE: string;
  PINK: string;
}

interface DashMemberType {
  members: UserType[];
  totalCount: number;
}

const DashboardGnb = () => {
  const { logout } = useAuth();
  const router = useRouter();
  const currentDashboardId = Number(router.query.id);

  const isMyPage = router.pathname === "/mypage";
  const isDashboardRoute = /^\/dashboard/.test(router.pathname);
  const [openInvitationModal, setOpenInvitationModal] =
    useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [myInfo, setMyInfo] = useState<{
    nickname: string;
    profileImageUrl: string | null;
  }>({
    nickname: "",
    profileImageUrl: null,
  });
  const [dashMember, setDashMember] = useState<DashMemberType | undefined>();
  const [dashboardTitle, setDashboardTitle] = useState<{ title: string }>({
    title: "",
  });

  //api
  const getMyInfoData = async () => {
    try {
      const response = await getMyInfo();
      setMyInfo(response);
    } catch (error) {
      console.error("내 정보 불러오기 실패", error);
    }
  };

  const MemberListData = async (dashboardId: number) => {
    try {
      const dashMemberData = await getMemberList(dashboardId);
      setDashMember(dashMemberData);
    } catch (error) {
      console.error("멤버 목록 불러오기 실패", error);
    }
  };

  const DashboardTitleData = async (dashboardId: number) => {
    try {
      const response = await getDashboard(dashboardId);
      setDashboardTitle(response);
    } catch (error) {
      console.error("대시보드 타이틀 불러오기 실패", error);
    }
  };

  const fetchData = async () => {
    try {
      await Promise.all([
        MemberListData(currentDashboardId),
        DashboardTitleData(currentDashboardId),
      ]);
    } catch (error) {
      console.error("데이터 불러오기 실패", error);
    }
  };

  useEffect(() => {
    getMyInfoData();
    if (currentDashboardId) {
      fetchData();
    }
  }, [currentDashboardId]);

  const handleInvitation = () => {
    setOpenInvitationModal(true);
  };

  const handleKebab = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
  };

  const getRandomColor = (): string => {
    const colorKeys: (keyof Colors)[] = Object.keys(COLORS) as (keyof Colors)[];
    const randomIndex = Math.floor(Math.random() * colorKeys.length);
    const selectedColorKey = colorKeys[randomIndex];
    return COLORS[selectedColorKey];
  };

  return (
    <div className={clsx(styles.gnb, isDashboardRoute && styles.flexRight)}>
      <div
        className={clsx(
          styles.dashboardTitle,
          isDashboardRoute && styles.showOnlyDesktop,
        )}
      >
        {isDashboardRoute
          ? `${dashboardTitle.title}`
          : isMyPage
            ? "계정 관리"
            : "내 대시보드"}
      </div>
      <div className={clsx(styles.wrapper)}>
        {isDashboardRoute && (
          <div className={clsx(styles.manageWrapper)}>
            <Link href={`/dashboard/${currentDashboardId}/edit`}>
              <button className={clsx(styles.manageBtn)}>
                <Image
                  src="/icons/manageButton.svg"
                  width={20}
                  height={20}
                  alt="manage 버튼"
                  className={clsx(styles.buttonIcon)}
                />
                <span>관리</span>
              </button>
            </Link>
            <button
              className={clsx(styles.inviteBtn)}
              onClick={handleInvitation}
            >
              <Image
                src="/button-icon/sidemenuPlus.svg"
                width={20}
                height={20}
                alt="plus 버튼"
                className={clsx(styles.buttonIcon)}
              />
              <span>초대하기</span>
              {openInvitationModal && (
                <InvitationModal setModal={setOpenInvitationModal} />
              )}
            </button>
            <div className={clsx(styles.memberWrapper)}>
              {dashMember?.members.slice(0, 4).map(member => (
                <div
                  key={member.id}
                  className={clsx(styles.invitee)}
                  style={{
                    backgroundImage: member.profileImageUrl
                      ? `url(${member.profileImageUrl})`
                      : "none",
                    backgroundColor: getRandomColor(),
                  }}
                >
                  {member.nickname.charAt(0).toUpperCase()}
                </div>
              ))}
              {(dashMember?.members.length || 0) > 4 &&
                dashMember?.totalCount !== undefined && (
                  <div className={clsx(styles.totalCount)}>
                    +{dashMember.totalCount - 4}
                  </div>
                )}
            </div>
          </div>
        )}
        <div className={clsx(styles.profile)} onClick={handleKebab}>
          <ProfileImage member={myInfo} width={38} height={38} />
          <div className={clsx(styles.user)}>
            {myInfo.nickname && myInfo.nickname.length > 3
              ? myInfo.nickname.substring(0, 4)
              : myInfo.nickname}
          </div>
          {isOpen && (
            <div className={clsx(styles.kebabModal)}>
              <Link href="/mypage">
                <div className={clsx(styles.kebabItem)}>계정 관리</div>
              </Link>
              <div className={clsx(styles.kebabItem)} onClick={handleLogout}>
                로그아웃
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardGnb;
