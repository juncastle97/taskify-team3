import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import styles from "./DashboardGnb.module.scss";

interface DashboardGnbProps {
  // 받아오는 프롭들 타입 나중에 적어주기
}

const DashboardGnb: React.FC<DashboardGnbProps> = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleKebab = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // 로그아웃 클릭 시 수행할 동작
  };

  const isEditPage = router.pathname === "/dashboard/[id]/edit";

  return (
    <div className={clsx(styles.gnb)}>
      <div className={clsx(styles.dashboardTitle)}>
        {isEditPage ? "계정 관리" : "내 대시보드"}
      </div>
      <div className={clsx(styles.wrapper)}>
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
          <div></div>
        </div>
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
