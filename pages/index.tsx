import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import styles from "@/styles/pages/Home.module.scss";
import Button from "@/components/button/baseButton/BaseButton";
import Footer from "@/components/footer/Footer";
import { useAuth } from "@/contexts/AuthProvider";
import LandingCard from "@/components/card/LandingCard";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) router.replace("/mydashboard");
  });

  return (
    <main className={clsx(styles.main)}>
      <Head>
        <title>Taskify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={clsx(styles.header)}>
        <Image
          src="/landing/header.png"
          width={722}
          height={423}
          alt="header image"
        />
        <div className={clsx(styles.title)}>
          새로운 일정 관리{" "}
          <span className={clsx(styles.titlePurple)}>Taskify</span>
        </div>
        <Link href="/login">
          <div className={clsx(styles.login)}>
            <Button>로그인하기</Button>
          </div>
        </Link>
      </header>
      <div className={clsx(styles.section)}>
        <div className={clsx(styles.mainCard1)}>
          <div className={clsx(styles.mainCardText)}>
            <div className={clsx(styles.point)}>Point 1</div>
            <div className={clsx(styles.description)}>
              일의 우선순위를
              <br />
              관리하세요
            </div>
          </div>
          <div>
            <Image
              className={clsx(styles.mainImage1)}
              src="/landing/point1.png"
              width={594}
              height={497}
              alt="point 1"
            />
          </div>
        </div>
        <div className={clsx(styles.mainCard2)}>
          <div className={clsx(styles.mainCardText)}>
            <div className={clsx(styles.point)}>Point 2</div>
            <div className={clsx(styles.description)}>
              해야 할 일을
              <br />
              등록하세요
            </div>
          </div>
          <div>
            <Image
              className={clsx(styles.mainImage2)}
              src="/landing/point2.png"
              width={436}
              height={502}
              alt="point 2"
            />
          </div>
        </div>
        <div className={clsx(styles.config)}>
          <div className={clsx(styles.configTitle)}>
            생산성을 높이는 다양한 설정 ⚡️
          </div>
          <LandingCard
            image="/landing/dashboard.png"
            title="대시보드 설정"
            description="대시보드 사진과 이름을 변경할 수 있어요."
          />
          <LandingCard
            image="/landing/invite.png"
            title="초대"
            description="새로운 팀원을 초대할 수 있어요"
          />
          <LandingCard
            image="/landing/member.png"
            title="대시보드 설정"
            description="대시보드 사진과 이름을 변경할 수 있어요."
          />
        </div>
      </div>
      <Footer />
    </main>
  );
}
