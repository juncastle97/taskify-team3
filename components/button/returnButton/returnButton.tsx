import Image from "next/image";
import styles from "./returnButton.module.scss";
import { MouseEvent } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";

interface returnButtonProps {
  url: string;
}

function ReturnButton({ url }: returnButtonProps) {
  const router = useRouter();

  function handleReturnClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    router.push(`/${url}`);
  }

  return (
    <button
      className={clsx(styles["return-button"])}
      onClick={handleReturnClick}
    >
      <Image
        src={"/icons/leftArrow.svg"}
        alt="돌아가기 버튼 이미지"
        width={18}
        height={18}
      />
      돌아가기
    </button>
  );
}

export default ReturnButton;
