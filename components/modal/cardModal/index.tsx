import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import axios from "@/lib/axios";
import clsx from "clsx";
import ModalContainer from "../ModalContainer";
import ModalPortal from "../ModalPortal";
import BaseButton from "@/components/button/baseButton/BaseButton";
import { postComments, getComments } from "@/api/comments";
import { CardPropsType } from "@/types/cards";
import { Comment, Content } from "@/types/comments";
import { Time } from "@/utils/time";
import { COLORS } from "@/constants/colors";
import styles from "./CardModale.module.scss";
import Link from "next/link";

interface CardModalProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  cardProps: CardPropsType;
  title: string;
}

interface CommentForm {
  comment: string;
}

interface Colors {
  GREEN: string;
  PURPLE: string;
  ORANGE: string;
  BLUE: string;
  PINK: string;
}

const CardModal = ({ setIsOpen, cardProps, title }: CardModalProps) => {
  const currentCardId = Number(cardProps.id);
  const [isComment, setIsComment] = useState<Comment>();

  const postCommentData = async (data: string) => {
    try {
      await axios.post("/comments", { content: data });
    } catch (error) {
      console.error("댓글 작성 실패", error);
    }
  };

  const getCommentData = async (size: number, cardId: number) => {
    try {
      const response = await getComments(10, cardId);
      setIsComment(response);
    } catch (error) {
      console.error("댓글 불러오기 실패", error);
    }
  };

  useEffect(() => {
    getCommentData(10, currentCardId);
  }, [currentCardId]);

  const getRandomColor = (): string => {
    const colorKeys: (keyof Colors)[] = Object.keys(COLORS) as (keyof Colors)[];
    const randomIndex = Math.floor(Math.random() * colorKeys.length);
    const selectedColorKey = colorKeys[randomIndex];
    return COLORS[selectedColorKey];
  };

  return (
    <ModalPortal>
      <ModalContainer setIsOpen={setIsOpen}>
        <div className={clsx(styles.modalWrapper)}>
          <div>
            <h1>{cardProps.title}</h1>
            <div>
              {title} | {cardProps.tags}
            </div>
            <div>{cardProps.description}</div>
            <Image
              src={`${cardProps.imageUrl}`}
              alt="카드 이미지"
              width={450}
              height={263}
            />
            <form>
              <label>댓글</label>
              <input type="text" placeholder="댓글 작성하기" />
              <BaseButton type="submit">입력</BaseButton>
            </form>
            <div>
              {isComment?.comments.map((comment: Content) => (
                <div key={comment.id}>
                  <div
                    style={{
                      backgroundImage: comment.author.profileImageUrl
                        ? `url(${comment.author.profileImageUrl})`
                        : "none",
                      backgroundColor: getRandomColor(),
                    }}
                  >
                    {comment.author.nickname.charAt(0).toUpperCase()}
                  </div>
                  <div>{comment.author.nickname}</div>
                  <div>{Time(`${comment.updatedAt}`)}</div>
                  <div>{comment.content}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div>
              <span>담당자</span>
              <div>
                <div
                  key={cardProps.assignee.id}
                  className={clsx(styles.invitee)}
                  style={{
                    backgroundImage: cardProps.assignee.profileImageUrl
                      ? `url(${cardProps.assignee.profileImageUrl})`
                      : "none",
                    backgroundColor: getRandomColor(),
                  }}
                >
                  {cardProps.assignee.nickname.charAt(0).toUpperCase()}
                </div>
                <div className={clsx(styles.user)}>
                  {cardProps.assignee.nickname}
                </div>
              </div>
            </div>
            <div>
              <span>마감일</span>
              <span>{Time(`${cardProps.dueDate}`)}</span>
            </div>
          </div>
        <div className={clsx(styles.kebabModal)}>
          케밥버튼
          <div className={clsx(styles.kebabItem)}>수정하기</div>
          <div className={clsx(styles.kebabItem)}>삭제하기</div>
        </div>
        </div>
      </ModalContainer>
    </ModalPortal>
  );
};

export default CardModal;
