import Image from "next/image";
import Link from "next/link";
import styles from "./Gnb.module.scss";

function Gnb() {
  return (
    <div className={styles.gnb}>
      <div className={styles.gnbContainer}>
        <Link className={styles.logo} href="/">
          <Image
            src="/logo/logo.svg"
            width={29}
            height={33}
            alt="taskify 로고(white theme)"
          />
          <Image
            className={styles.logoText}
            src="/logo/Taskify.svg"
            width={80}
            height={22}
            alt="taskify 로고(white theme)"
          />
        </Link>
        <div className={styles.authContainer}>
          <Link href="/login">로그인</Link>
          <Link href="/signup">회원가입</Link>
        </div>
      </div>
    </div>
  );
}

export default Gnb;
