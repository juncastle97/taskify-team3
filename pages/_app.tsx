import "@/styles/base/_globals.scss";
import "@/styles/base/_reset.scss";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Gnb from "@/components/gnb/Gnb";
import SnbGnb from "@/components/snb&gnb/SnbGnb";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isAuthRoute = /^\/(login|signup|mydashboard|dashboard|mypage)/.test(
    router.pathname,
  );
  const isGnbRoute = /^\/(mydashboard|dashboard|mypage)/.test(router.pathname);

  return (
    <>
      <div id="modal">
        {!isAuthRoute && <Gnb />}
        {isGnbRoute && <SnbGnb />}
        <Component {...pageProps} />
      </div>
    </>
  );
}
