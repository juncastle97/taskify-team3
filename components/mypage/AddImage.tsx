import Image from "next/image";
import clsx from "clsx";
import { useRef, ChangeEvent, useEffect, useState } from "react";
import styles from "@/components/mypage/AddImage.module.scss";
import axios from "@/lib/axios";

interface AddImageProp {
  profileImageUrl: string | null;
  onImageUpload?: (imageUrl: string) => void | null;
}

function AddImage({ profileImageUrl, onImageUpload }: AddImageProp) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log(file);
      PreviewImage(file);
      setSelectedFile(file);
      const response = await postImageUrl(file);
      if (onImageUpload) {
        onImageUpload(response);
      }
    } else {
      setPreviewImage(null);
      setSelectedFile(null);
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

  const postImageUrl = async (data: File) => {
    try {
      const formData = new FormData();
      formData.append("image", data);

      const response = await axios.post("users/me/image", formData);

      const imageURL = response.data.profileImageUrl;
      if (onImageUpload) {
        onImageUpload(imageURL);
      }
      console.log(imageURL);

      return imageURL;
    } catch (error) {
      console.error(error);
      throw error;
    }
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
            style={{ visibility: "hidden" }}
          />
          {selectedFile ? (
            <img
              id="user_image"
              className={clsx(styles.upload, styles.previewImage)}
              src={previewImage || ""}
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
