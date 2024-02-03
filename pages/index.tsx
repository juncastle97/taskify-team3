import Head from "next/head";
import Image from "next/image";
import clsx from "clsx";
import styles from "@/styles/pages/Home.module.scss";
import Footer from "@/components/footer/Footer";
import Link from "next/link";
import Button from "@/components/button/baseButton/BaseButton";
import { useAuth } from "@/contexts/AuthProvider";
import { useRouter } from "next/router";
import { useEffect } from "react";
export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) router.replace("/mydashboard");
  });

  return (
    <main className={clsx(styles["main"])}>
      <Head>
        <title>Taskify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={clsx(styles["header"])}>
        <Image
          className={clsx(styles["header-image"])}
          src="/landing/header.png"
          width={722}
          height={423}
          alt="header image"
        />
        <div className={clsx(styles["title"])}>
          새로운 일정 관리{" "}
          <span className={clsx(styles["title-purple"])}>Taskify</span>
        </div>
        <Link href="/login">
          <div className={clsx(styles["login"])}>
            <Button>로그인하기</Button>
          </div>
        </Link>
      </header>
      <div className={clsx(styles["section"])}>
        <div className={clsx(styles["main-card-1"])}>
          <div className={clsx(styles["main-card-text"])}>
            <div className={clsx(styles["point"])}>Point 1</div>
            <div className={clsx(styles["description"])}>
              일의 우선순위를
              <br />
              관리하세요
            </div>
          </div>
          <div>
            <Image
              className={clsx(styles["main-image-1"])}
              src="/landing/point1.png"
              width={594}
              height={497}
              alt="point 1"
            />
          </div>
        </div>
        <div className={clsx(styles["main-card-2"])}>
          <div className={clsx(styles["main-card-text"])}>
            <div className={clsx(styles["point"])}>Point 2</div>
            <div className={clsx(styles["description"])}>
              해야 할 일을
              <br />
              등록하세요
            </div>
          </div>
          <div>
            <Image
              className={clsx(styles["main-image-2"])}
              src="/landing/point2.png"
              width={436}
              height={502}
              alt="point 2"
            />
          </div>
        </div>
        <div className={clsx(styles["config"])}>
          <div className={clsx(styles["config-title"])}>
            생산성을 높이는 다양한 설정 ⚡️
          </div>
          <div className={clsx(styles["config-cards"])}>
            <div className={clsx(styles["config-container"])}>
              <div className={clsx(styles["config-card"])}>
                <div className={clsx(styles["config-card-image-container"])}>
                  <Image
                    className={clsx(styles["config-card-image"])}
                    src="/landing/dashbord.png"
                    width={300}
                    height={124}
                    alt="대시보드 설정"
                  />
                </div>
                <div className={clsx(styles["config-description-container"])}>
                  <div className={clsx(styles["config-sub-title"])}>
                    대시보드 설정
                  </div>
                  <div className={clsx(styles["config-description"])}>
                    대시보드 사진과 이름을 변경할 수 있어요.
                  </div>
                </div>
              </div>
            </div>
            <div className={clsx(styles["config-container"])}>
              <div className={clsx(styles["config-card"])}>
                <div className={clsx(styles["config-card-image-container"])}>
                  <Image
                    className={clsx(styles["config-card-image"])}
                    src="/landing/invite.png"
                    width={300}
                    height={230}
                    alt="초대"
                  />
                </div>
                <div className={clsx(styles["config-description-container"])}>
                  <div className={clsx(styles["config-sub-title"])}>초대</div>
                  <div className={clsx(styles["config-description"])}>
                    새로운 팀원을 초대할 수 있어요.
                  </div>
                </div>
              </div>
            </div>
            <div className={clsx(styles["config-container"])}>
              <div className={clsx(styles["config-card"])}>
                <div className={clsx(styles["config-card-image-container"])}>
                  <Image
                    className={clsx(styles["config-card-image"])}
                    src="/landing/member.png"
                    width={300}
                    height={195}
                    alt="구성원"
                  />
                </div>
                <div className={clsx(styles["config-description-container"])}>
                  <div className={clsx(styles["config-sub-title"])}>구성원</div>
                  <div className={clsx(styles["config-description"])}>
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
