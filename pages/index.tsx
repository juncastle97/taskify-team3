import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/pages/Home.module.scss";
import Footer from "@/components/footer/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <Head>
        <title>Taskify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <Image
          className={styles.headerImage}
          src="/landing/header.png"
          width={722}
          height={423}
          alt="header image"
        />
        <div className={styles.title}>
          새로운 일정 관리 <span className={styles.titlePurple}>Taskify</span>
        </div>
        <Link href="/login">
          <button className={styles.login}>로그인하기</button>
        </Link>
      </header>
      <div className={styles.section}>
        <div className={styles.mainCard1}>
          <div className={styles.mainCardText}>
            <div className={styles.point}>Point 1</div>
            <div className={styles.description}>
              일의 우선순위를
              <br />
              관리하세요
            </div>
          </div>
          <div>
            <Image
              className={styles.mainImage1}
              src="/landing/point1.png"
              width={594}
              height={497}
              alt="point 1"
            />
          </div>
        </div>
        <div className={styles.mainCard2}>
          <div className={styles.mainCardText}>
            <div className={styles.point}>Point 2</div>
            <div className={styles.description}>
              해야 할 일을
              <br />
              등록하세요
            </div>
          </div>
          <div>
            <Image
              className={styles.mainImage2}
              src="/landing/point2.png"
              width={436}
              height={502}
              alt="point 2"
            />
          </div>
        </div>
        <div className={styles.config}>
          <div className={styles.configTitle}>
            생산성을 높이는 다양한 설정 ⚡️
          </div>
          <div className={styles.configCards}>
            <div className={styles.configContainer}>
              <div className={styles.configCard}>
                <div className={styles.configCardImageContainer}>
                  <Image
                    className={styles.configCardImage}
                    src="/landing/dashbord.png"
                    width={300}
                    height={124}
                    alt="대시보드 설정"
                  />
                </div>
                <div className={styles.configDescriptionContainer}>
                  <div className={styles.configSubTitle}>대시보드 설정</div>
                  <div className={styles.configDescription}>
                    대시보드 사진과 이름을 변경할 수 있어요.
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.configContainer}>
              <div className={styles.configCard}>
                <div className={styles.configCardImageContainer}>
                  <Image
                    className={styles.configCardImage}
                    src="/landing/invite.png"
                    width={300}
                    height={230}
                    alt="초대"
                  />
                </div>
                <div className={styles.configDescriptionContainer}>
                  <div className={styles.configSubTitle}>초대</div>
                  <div className={styles.configDescription}>
                    새로운 팀원을 초대할 수 있어요.
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.configContainer}>
              <div className={styles.configCard}>
                <div className={styles.configCardImageContainer}>
                  <Image
                    className={styles.configCardImage}
                    src="/landing/member.png"
                    width={300}
                    height={195}
                    alt="구성원"
                  />
                </div>
                <div className={styles.configDescriptionContainer}>
                  <div className={styles.configSubTitle}>대시보드 설정</div>
                  <div className={styles.configDescription}>
                    구성원을 초대하고 내보낼 수 있어요.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
