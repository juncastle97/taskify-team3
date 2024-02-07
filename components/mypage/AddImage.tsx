import Image from "next/image";
import clsx from "clsx";
import { useRef, ChangeEvent, useState, useEffect } from "react";
import styles from "@/components/mypage/AddImage.module.scss";
import axios from "@/lib/axios";

interface AddImageProp {
  profileImageUrl: string | null;
  onImageUpload?: (imageUrl: string) => void | null;
  small?: boolean; // 작은 버전을 위한 prop 추가
  columnId?: number;
}

function AddImage({
  profileImageUrl,
  onImageUpload,
  small,
  columnId,
}: AddImageProp) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    setPreviewImage(profileImageUrl);
  }, [profileImageUrl]);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && columnId) {
      uploadCardImage(file, columnId);
    } else if (file) {
      uploadImage(file);
    }
  };

  const uploadImage = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post("users/me/image", formData);
      const imageURL = response.data.profileImageUrl;
      setPreviewImage(imageURL);
      if (onImageUpload) {
        onImageUpload(imageURL);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const uploadCardImage = async (file: File, columnId: number) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post(
        `columns/${columnId}/card-image`,
        formData,
      );
      const imageURL = response.data.imageUrl;
      setPreviewImage(imageURL);
      if (onImageUpload) {
        onImageUpload(imageURL);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={clsx(styles.imageContainer, { [styles.small]: small })}>
      <label htmlFor="chooseFile" className={styles.chooseFileLabel}>
        <input
          type="file"
          ref={fileInputRef}
          className={clsx("realUpload")}
          accept="image/*"
          id="user_profile_img"
          required
          onChange={handleChange}
          style={{ display: "none" }}
        />
        {previewImage ? (
          <Image
            id="user_image"
            className={clsx(
              styles.upload,
              styles.previewImage,
              { [styles.small]: small }, // 작은 버전일 경우에 클래스 추가
            )}
            src={previewImage}
            alt="프로필 이미지"
            width={small ? 100 : 182} // 작은 버전일 경우에 크기 조정
            height={small ? 100 : 182} // 작은 버전일 경우에 크기 조정
            onClick={handleImageClick}
          />
        ) : (
          <div
            className={clsx(styles.addImageOverlay, { [styles.small]: small })}
            onClick={handleImageClick}
          >
            <Image
              className={clsx(styles.addImageIcon)}
              src="/myPage/add.svg"
              alt="이미지 추가"
              width={small ? 20 : 30} // 작은 버전일 경우에 아이콘 크기 조정
              height={small ? 20 : 30} // 작은 버전일 경우에 아이콘 크기 조정
            />
          </div>
        )}
      </label>
    </div>
  );
}

export default AddImage;
