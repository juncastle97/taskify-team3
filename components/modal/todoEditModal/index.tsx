import ModalContainer from "../ModalContainer";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/router";
import ModalPortal from "../ModalPortal";
import clsx from "clsx";
import style from "./TodoEditModal.module.scss";
import BaseButton from "@/components/button/baseButton/BaseButton";
import Dropdown from "@/components/dropdown/Dropdown";
import { DropdownItem } from "@/components/dropdown/Dropdown";
import AddImage from "@/components/mypage/AddImage";
import { TodoCreateType } from "@/types/cards";
import { getCardinfoList } from "@/api/cards";
import InputDropdown from "@/components/inputdropdown/InputDropdown";
import { getColumnList } from "@/api/columns";
import Calendar from "@/components/datepicker/Calendar";
import TagInput from "@/components/input/tagInput";
import { putTodoEditCard } from "@/api/todo";

interface TodoEditModalProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  cardId: number;
}

function TodoEditModal({ setIsOpen, cardId }: TodoEditModalProps) {
  const router = useRouter();
  const { id } = router.query;
  const dashboardId = Number(id);
  const [formState, setFormState] = useState<TodoCreateType>({
    assigneeUserId: 0,
    dashboardId: 0,
    columnId: 0,
    title: "",
    description: "",
    tags: [],
    dueDate: "",
    assignee: [],
    imageUrl: "",
  });
  const [columnList, setColumnList] = useState<DropdownItem[]>([]);

  const cardData = async (cardId: number) => {
    try {
      const exsistData = await getCardinfoList(cardId);
      setFormState(exsistData);
    } catch (error) {
      console.log("GET 요청 실패: ", error);
    }
  };

  const columnListData = async () => {
    try {
      const data = await getColumnList(dashboardId);
      setColumnList(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectedId = (selectedAssignee: any) => {
    setFormState(prevState => ({
      ...prevState,
      assignee: selectedAssignee,
    }));
  };

  const handleDropdownSelect = (selectedItemId: number) => {
    setFormState(prevState => ({
      ...prevState,
      columnId: selectedItemId,
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

  const handleSelectedImage = (selectedItemImage: string) => {
    setFormState(prevState => ({
      ...prevState,
      imageUrl: selectedItemImage,
    }));
  };

  const handleTodoEditClick = async (event: FormEvent) => {
    if (event) event.preventDefault();
    try {
      await putTodoEditCard(cardId, formState);
      console.log(1);
      setIsOpen(false);
    } catch (error) {
      console.error(error);
      console.log(cardId);
    }
  };

  useEffect(() => {
    cardData(cardId);
    columnListData();
  }, [cardId]);

  return (
    <ModalPortal>
      <ModalContainer setIsOpen={setIsOpen}>
        <form onSubmit={handleTodoEditClick}>
          <div className={clsx(style.modalWrapper)}>
            <h1>할 일 수정</h1>
            <div className={clsx(style.inputWrapper)}>
              <div className={clsx(style.flexWrapper)}>
                <div>
                  <p>상태</p>
                  <Dropdown
                    data={columnList}
                    onSelectItem={handleDropdownSelect}
                    defaultValue={formState.columnId}
                  />
                </div>
                <div>
                  <p>담당자</p>
                  <div className={clsx(style.inputdropdown)}>
                    <InputDropdown
                      small
                      onSelectItem={handleSelectedId}
                      //@ts-ignore
                      defaultValue={formState.assignee}
                    />
                  </div>
                </div>
              </div>
              <div className={clsx(style.gap)}>
                <p>
                  제목 <span className={clsx(style.star)}>*</span>
                </p>
                <input
                  className={clsx(style.input)}
                  placeholder="제목을 입력해 주세요"
                  defaultValue={formState.title}
                  onChange={handleTitleInputChange}
                />
              </div>
              <div className={clsx(style.gap)}>
                <p>설명 *</p>
                <textarea
                  className={clsx(style.input)}
                  rows={5}
                  cols={40}
                  placeholder="설명을 입력해 주세요"
                  defaultValue={formState.description}
                  onChange={handleDescriptionInputChange}
                />
              </div>
              <div className={clsx(style.gap)}>
                <p>마감일</p>
                <Calendar
                  onDueDate={handleSelectedDate}
                  defaultValue={formState.dueDate}
                />
              </div>
              <div className={clsx(style.gap)}>
                <p>태그</p>
                <TagInput formState={formState} setFormState={setFormState} />
              </div>
              <div className={clsx(style.gap)}>
                <p> 이미지 </p>
                <div className={clsx(style.img)}>
                  <AddImage
                    small
                    profileImageUrl={formState.imageUrl}
                    onImageUpload={handleSelectedImage}
                    columnId={formState.columnId}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={clsx(style.buttons)}>
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

export default TodoEditModal;
