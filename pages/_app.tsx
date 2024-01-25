import "@/styles/base/_globals.scss";
import "@/styles/base/_reset.scss";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Gnb from "@/components/gnb/Gnb";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isAuthRoute = /^\/(login|signup)/.test(router.pathname);

  return (
    <>
      {!isAuthRoute && <Gnb />}
      <Component {...pageProps} />
    </>
  );
}
