import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import clsx from "clsx";
import Spinner from "@/components/spinner";
import ModalContainer from "../ModalContainer";
import ModalPortal from "../ModalPortal";
import BaseButton from "@/components/button/baseButton/BaseButton";
import { putComments, deleteComments, getComments } from "@/api/comments";
import { getCardinfoList, deleteCard } from "@/api/cards";
import { CardPropsType } from "@/types/cards";
import { Comment, CommentContent } from "@/types/comments";
import { Time } from "@/utils/time";
import { generateRandomColorHexCode } from "@/utils/color";
import { COLORS } from "@/constants/colors";
import styles from "./CardModale.module.scss";
import axios from "@/lib/axios";
import TagChips from "@/components/chips/TagChips";
import TodoEditModal from "../todoEditModal";
import AlertModal from "../alertModal";

interface CardModalProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  cardId: number;
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

const CardModal = ({ setIsOpen, cardId, title }: CardModalProps) => {
  const { register, handleSubmit, watch, reset } = useForm<CommentForm>({
    mode: "onBlur",
  });
  const watchInput = watch("comment", "");
  const noneImgUrl =
    "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/taskify/task_image";

  const currentCardId = Number(cardId);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isComment, setIsComment] = useState<Comment>();
  const [kebabOpen, setKebabOpen] = useState<boolean>(false);
  const [cardData, setCardData] = useState<CardPropsType>({
    id: 0,
    title: "",
    description: "",
    tags: [],
    dueDate: "",
    assignee: {
      profileImageUrl: "",
      nickname: "",
      id: 0,
    },
    imageUrl: "",
    teamId: "",
    columnId: 0,
    dashboardId: 0,
    createdAt: "",
    updatedAt: "",
  });
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleKebab = () => {
    setKebabOpen(prevKebabOpen => !prevKebabOpen);
  };

  const getCardData = async (cardId: number) => {
    try {
      const response = await getCardinfoList(cardId);
      setCardData(response);
      setIsLoading(false);
    } catch (error) {
      console.error("카드 상세 조회 실패", error);
      console.log(cardId);
      console.log(cardData);
    }
  };

  const deleteCardData = async (cardId: number) => {
    try {
      await deleteCard(cardId);
      closeAlertModal();
    } catch (error) {
      console.error("카드 삭제 실패", error);
    }
  };

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post("/comments", {
        content: data.comment,
        cardId: cardId,
        columnId: cardData.columnId,
        dashboardId: cardData.dashboardId,
      });
      getCommentData(10, currentCardId);
      reset();
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

  // const putCommentData = async (commentId: number) => {
  //   try {
  //     await putComments(commentId);
  //     getCommentData(10, currentCardId);
  //   } catch (error) {
  //     console.error("댓글 수정 실패");
  //   }
  // };

  const deleteCommentData = async (commentId: number) => {
    try {
      await deleteComments(commentId);
      getCommentData(10, currentCardId);
    } catch (error) {
      console.error("댓글 삭제 실패");
    }
  };

  useEffect(() => {
    getCommentData(10, currentCardId);
    getCardData(currentCardId);
    deleteCardData(currentCardId);
  }, [currentCardId]);

  const openEditModal = () => {
    setIsEditOpen(true);
  };

  const getRandomColor = (): string => {
    const colorKeys: (keyof Colors)[] = Object.keys(COLORS) as (keyof Colors)[];
    const randomIndex = Math.floor(Math.random() * colorKeys.length);
    const selectedColorKey = colorKeys[randomIndex];
    return COLORS[selectedColorKey];
  };

  const openAlertModal = () => {
    setIsAlertOpen(true);
  };

  const closeAlertModal = () => {
    setIsAlertOpen(false);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <ModalPortal>
      <ModalContainer setIsOpen={setIsOpen} isModalOpen={isEditOpen}>
        {isEditOpen && (
          <TodoEditModal setIsOpen={setIsEditOpen} cardId={cardData.id} />
        )}
        <div className={clsx(styles.modalWrapper)}>
          <div>
            <div className={clsx(styles.titleWrapper)}>
              <h1>{cardData.title}</h1>
              <div className={clsx(styles.buttonWrapper)}>
                <Image
                  src="/icons/moreButton.svg"
                  alt="케밥 버튼"
                  width={32}
                  height={32}
                  onClick={handleKebab}
                />
                {/* <Image
                  src="/icons/close.svg"
                  alt="닫기 버튼"
                  width={20}
                  height={20}
                /> */}
              </div>
              {kebabOpen && (
                <div className={clsx(styles.kebabModal)}>
                  <div
                    className={clsx(styles.kebabItem)}
                    onClick={openEditModal}
                  >
                    수정하기
                  </div>
                  <div
                    className={clsx(styles.kebabItem)}
                    onClick={openAlertModal}
                  >
                    삭제하기
                  </div>
                  {isAlertOpen && (
                    <AlertModal
                      setModal={setIsAlertOpen}
                      alertMessage="카드의 모든 정보가 삭제됩니다."
                      isCancelButton
                      onConfirmClick={() => {
                        deleteCardData(currentCardId);
                      }}
                    />
                  )}
                </div>
              )}
            </div>
            <div className={clsx(styles.inputWrapper)}>
              <div className={clsx(styles.tagWrapper)}>
                <div className={clsx(styles.columnTitle)}>•{title}</div>
                <div className={clsx(styles.divide)}></div>
                <div className={clsx(styles.tags)}>
                  {cardData.tags.map((tag, index) => (
                    <TagChips
                      key={`tags_${index}`}
                      tagName={tag}
                      color={generateRandomColorHexCode()}
                    />
                  ))}
                </div>
              </div>
              <div className={clsx(styles.description)}>
                {cardData.description}
              </div>
              <div className={clsx(styles.imgWrapper)}>
                {cardData.imageUrl !== noneImgUrl && (
                  <Image
                    className={clsx(styles.cardImg)}
                    src={`${cardData.imageUrl}`}
                    alt="카드 이미지"
                    width={450}
                    height={263}
                  />
                )}
                <div>
                  <div className={clsx(styles.assigneeWrapper)}>
                    <span>담당자</span>
                    <div className={clsx(styles.profile)}>
                      <div
                        key={cardData.assignee.id}
                        className={clsx(styles.invitee)}
                        style={{
                          backgroundImage: cardData.assignee.profileImageUrl
                            ? `url(${cardData.assignee.profileImageUrl})`
                            : "none",
                          backgroundColor: getRandomColor(),
                        }}
                      >
                        {cardData.assignee.nickname.charAt(0).toUpperCase()}
                      </div>
                      <div className={clsx(styles.user)}>
                        {cardData.assignee.nickname}
                      </div>
                    </div>
                    <div className={clsx(styles.dueDateWrapper)}>
                      <span>마감일</span>
                      <div>{Time(`${cardData.dueDate}`)}</div>
                    </div>
                  </div>
                </div>
              </div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className={clsx(styles.commentForm)}
              >
                <label>댓글</label>
                <input
                  type="text"
                  placeholder="댓글 작성하기"
                  {...register("comment", { required: true })}
                />
                <div className={clsx(styles.submitButton)}>
                  <BaseButton
                    type="submit"
                    comment
                    white
                    disabled={!watchInput}
                  >
                    입력
                  </BaseButton>
                </div>
              </form>
              <div className={clsx(styles.commentWrapper)}>
                {isComment?.comments.map((comment: CommentContent) => (
                  <div key={comment.id} className={clsx(styles.commentProfile)}>
                    <div
                      className={clsx(styles.invitee)}
                      style={{
                        backgroundImage: comment.author.profileImageUrl
                          ? `url(${comment.author.profileImageUrl})`
                          : "none",
                        backgroundColor: getRandomColor(),
                      }}
                    >
                      {comment.author.nickname.charAt(0).toUpperCase()}
                    </div>
                    <div className={clsx(styles.textWrapper)}>
                      <div className={clsx(styles.nicknameWrapper)}>
                        <div className={clsx(styles.user)}>
                          {comment.author.nickname}
                        </div>
                        <div className={clsx(styles.date)}>
                          {Time(`${comment.updatedAt}`)}
                        </div>
                      </div>
                      <div className={clsx(styles.content)}>
                        {comment.content}
                      </div>
                      <div className={clsx(styles.editButton)}>
                        <div>수정</div>
                        <div onClick={() => deleteCommentData(comment.id)}>
                          삭제
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ModalContainer>
    </ModalPortal>
  );
};

export default CardModal;
