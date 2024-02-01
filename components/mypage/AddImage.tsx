import Image from "next/image";
import clsx from "clsx";
import { useRef, ChangeEvent, useEffect, useState } from "react";
import styles from "@/components/mypage/AddImage.module.scss";

function AddImage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 파일 입력 요소의 값이 변경되면 호출되는 함수
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // 선택한 파일 정보를 콘솔에 출력
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      console.log(selectedFile);
      PreviewImage(selectedFile);
    }
  };

  const PreviewImage = (file: File) => {
    const preview = new FileReader();
    preview.onload = function (e) {
      const imageDataURL = e.target?.result as string;
      setPreviewImage(imageDataURL);
    };
    preview.readAsDataURL(file);
  };

  return (
    <>
      <div className={styles.imageContainer}>
        <label htmlFor="chooseFile" className={styles.chooseFileLabel}>
          <input
            type="file"
            ref={fileInputRef}
            className={clsx("realUpload")}
            accept="image/*"
            id="user_profile_img"
            required
            multiple
            onChange={handleChange}
            style={{ display: "none" }}
          />
          {previewImage ? (
            <Image
              id="user_image"
              className={clsx(styles.upload, styles.previewImage)}
              src={previewImage}
              alt="이미지"
              width={182}
              height={182}
              onClick={handleImageClick}
            />
          ) : (
            <div className={styles.addImageOverlay} onClick={handleImageClick}>
              <Image
                className={clsx(styles.addImageIcon)}
                src="/myPage/add.svg"
                alt="이미지 추가"
                width={30}
                height={30}
              />
            </div>
          )}
        </label>
      </div>
    </>
  );
}

export default AddImage;
