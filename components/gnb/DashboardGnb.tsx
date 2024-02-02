import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import styles from "./DashboardGnb.module.scss";
import mockData from "./members.json";
import { COLORS } from "@/constants/colors";

interface member {
  id: number;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
  isOwner: boolean;
  userId: number;
}

interface DashboardGnbProps {
  members: member[];
  totalCount: number;
}

interface Colors {
  GREEN: string;
  PURPLE: string;
  ORANGE: string;
  BLUE: string;
  PINK: string;
}

const DashboardGnb: React.FC<DashboardGnbProps> = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const [data, setData] = useState<DashboardGnbProps | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result: DashboardGnbProps = await mockData;
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleKebab = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // 로그아웃 클릭 시 수행할 동작
  };

  const isDashboardRoute = /^\/(dashboard)/.test(router.pathname);
  const isEditPage = router.pathname === "/dashboard/[id]/edit";

  function getRandomColor(): string {
    const colorKeys: (keyof Colors)[] = Object.keys(COLORS) as (keyof Colors)[];
    const randomIndex = Math.floor(Math.random() * colorKeys.length);
    const selectedColorKey = colorKeys[randomIndex];
    return COLORS[selectedColorKey];
  }

  return (
    <div className={clsx(styles.gnb)}>
      <div className={clsx(styles.dashboardTitle)}>
        {isEditPage ? "계정 관리" : "내 대시보드"}
      </div>
      <div className={clsx(styles.wrapper)}>
        {isDashboardRoute && (
          <div className={clsx(styles.manageWrapper)}>
            <button className={clsx(styles.manageBtn)}>
              <Image
                src="/icons/manageButton.svg"
                width={20}
                height={20}
                alt="manage 버튼"
              />
              <span>관리</span>
            </button>
            <button className={clsx(styles.inviteBtn)}>
              <Image
                src="/button-icon/sidemenuPlus.svg"
                width={20}
                height={20}
                alt="plus 버튼"
              />
              <span>초대하기</span>
            </button>
            <div className={clsx(styles.memberWrapper)}>
              {data?.members.slice(0, 4).map(member => (
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
              {(data?.members?.length || 0) > 4 &&
                data?.totalCount !== undefined && (
                  <div className={clsx(styles.totalCount)}>
                    +{data.totalCount - 4}
                  </div>
                )}
            </div>
          </div>
        )}
        <div className={clsx(styles.profile)} onClick={handleKebab}>
          <Image
            src="/icons/testProfileImg.svg"
            width={38}
            height={38}
            alt="프로필 이미지"
          />
          <div className={clsx(styles.user)}>배유철</div>
          {isOpen && (
            <div className={clsx(styles.kebabModal)}>
              <Link href="/dashboard/id/edit">
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
