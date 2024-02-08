import ModalContainer from "../ModalContainer";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import ModalPortal from "../ModalPortal";
import clsx from "clsx";
import styles from "./TodoCreateModal.module.scss";
import BaseButton from "@/components/button/baseButton/BaseButton";
import InputDropdown from "@/components/inputdropdown/InputDropdown";
import AddImage from "@/components/mypage/AddImage";
import Calendar from "@/components/datepicker/Calendar";
import { TodoCreateType } from "@/types/cards";
import TagInput from "@/components/input/tagInput";
import { postTodoCreateCard } from "@/api/todo";
import { useRouter } from "next/router";
import { getMemberList } from "@/api/members";

interface TodoCreateModalProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  columnId: number;
}

function TodoCreateModal({ setIsOpen, columnId }: TodoCreateModalProps) {
  const router = useRouter();
  const { id } = router.query;
  const dashboardId = Number(id);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [formState, setFormState] = useState<TodoCreateType>({
    assigneeUserId: 0,
    dashboardId: dashboardId,
    columnId: columnId,
    title: "",
    description: "",
    tags: [],
    dueDate: "",
    assignee: [],
    imageUrl: imageUrl,
  });

  const MemberListData = async () => {
    try {
      const dashMember = await getMemberList(dashboardId, 1, 20);
      const formattedMembers = dashMember.members.map((member: any) => ({
        profileImageUrl: member.profileImageUrl,
        nickname: member.nickname,
        id: member.id,
      }));
      setFormState(prevState => ({
        ...prevState,
        assignee: formattedMembers,
      }));
    } catch (error) {
      console.error("GET 요청 실패 :", error);
    }
  };

  const handleSelectedId = (selectedItemId: number) => {
    setFormState(prevState => ({
      ...prevState,
      assigneeUserId: selectedItemId,
    }));
  };

  const handleTitleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;
    setFormState(prevState => ({
      ...prevState,
      title: value,
    }));
  };

  const handleDescriptionInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { value } = event.target;
    setFormState(prevState => ({
      ...prevState,
      description: value,
    }));
  };

  const handleSelectedDate = (selectedItemDate: string) => {
    setFormState(prevState => ({
      ...prevState,
      dueDate: selectedItemDate,
    }));
  };

  const handleSelectedImage = (selectedImageUrl: string) => {
    setImageUrl(selectedImageUrl);
  };

  const handleTodoCreateClick = async (event: FormEvent) => {
    if (event) event.preventDefault();
    try {
      const finalImageUrl =
        imageUrl ||
        "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/taskify/task_image";
      await postTodoCreateCard({ ...formState, imageUrl: finalImageUrl });
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    MemberListData();
  }, [dashboardId]);

  return (
    <ModalPortal>
      <ModalContainer setIsOpen={setIsOpen}>
        <form onSubmit={handleTodoCreateClick}>
          <div className={clsx(styles.modalWrapper)}>
            <h1>할 일 생성</h1>
            <div className={clsx(styles.inputWrapper)}>
              <div className={clsx(styles.assigneeUser)}>
                <p>담당자</p>
                <InputDropdown onSelectItem={handleSelectedId} />
              </div>
              <div className={clsx(styles.gap)}>
                <p>
                  제목 <span className={clsx(styles.star)}>*</span>
                </p>
                <input
                  className={clsx(styles.input)}
                  placeholder="제목을 입력해 주세요"
                  onChange={handleTitleInputChange}
                />
              </div>
              <div className={clsx(styles.gap)}>
                <p>
                  설명 <span className={clsx(styles.star)}>*</span>
                </p>
                <textarea
                  className={clsx(styles.input)}
                  rows={5}
                  cols={40}
                  placeholder="설명을 입력해 주세요"
                  onChange={handleDescriptionInputChange}
                />
              </div>
              <div className={clsx(styles.gap)}>
                <p>마감일</p>
                <Calendar onDueDate={handleSelectedDate} />
              </div>
              <div className={clsx(styles.gap)}>
                <p>태그</p>
                <TagInput formState={formState} setFormState={setFormState} />
              </div>
              <div className={clsx(styles.gap)}>
                <p>이미지</p>
                <div className={clsx(styles.img)}>
                  <AddImage
                    small
                    profileImageUrl={imageUrl}
                    onImageUpload={handleSelectedImage}
                    columnId={columnId}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={clsx(styles.buttons)}>
            <BaseButton
              type="button"
              onClick={() => setIsOpen(false)}
              small
              white
            >
              취소
            </BaseButton>
            <BaseButton
              type="submit"
              small
              disabled={!formState.title || !formState.description}
            >
              생성
            </BaseButton>
          </div>
        </form>
      </ModalContainer>
    </ModalPortal>
  );
}

export default TodoCreateModal;
