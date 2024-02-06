import Image from "next/image";
import clsx from "clsx";
import { useRef, ChangeEvent, useState, useEffect } from "react";
import styles from "@/components/mypage/AddImage.module.scss";
import axios from "@/lib/axios";

interface AddImageProp {
  profileImageUrl: string | null;
  onImageUpload?: (imageUrl: string) => void | null;
}

function AddImage({ profileImageUrl, onImageUpload }: AddImageProp) {
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
    if (file) {
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

  return (
    <div className={styles.imageContainer}>
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
            className={clsx(styles.upload, styles.previewImage)}
            src={previewImage}
            alt="프로필 이미지"
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
  );
}

export default AddImage;
