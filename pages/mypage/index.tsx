import clsx from "clsx";
import styles from "@/styles/pages/myPage.module.scss";
import Image from "next/image";

function MyPage() {
  return (
    <div className={clsx(styles.PageContainer)}>
      <nav className={clsx(styles.nav)}>
        <span>계정관리</span>
      </nav>
      <main>
        <section>
          <div>프로필</div>
          <div>
            <Image
              src="/myPage/addImage.png"
              alt="이미지 추가 버튼"
              width={182}
              height={182}
              priority
            />
            <input></input>
            <input></input>
            <button>버튼</button>
          </div>
        </section>
        <section></section>
      </main>
    </div>
  );
}

export default MyPage;
