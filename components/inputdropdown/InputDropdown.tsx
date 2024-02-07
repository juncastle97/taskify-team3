import { useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./InputDropdown.module.scss";
import Image from "next/image";
import ProfileImage from "../profileImage/ProfileImage";
import { useRouter } from "next/router";
import { getMemberList } from "@/api/members";
import { GetMemberListType } from "@/types/members";
import { Assignee } from "@/types/cards";

interface InputDropdownProps {
  small?: boolean;
  onSelectItem: (itemId: number) => void;
}

const InputDropdown = ({ small, onSelectItem }: InputDropdownProps) => {
  const router = useRouter();
  const { id } = router.query;
  const dashboardId = Number(id);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [getMember, setGetMember] = useState<GetMemberListType>({
    members: [],
    totalCount: 0,
  });
  const [selectedItem, setSelectedItem] = useState<Assignee | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (clickedItem: Assignee) => {
    setSelectedItem(clickedItem);
    setIsOpen(false);
    onSelectItem(clickedItem.userId);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTerm(value);

    if (selectedItem !== null) {
      setSelectedItem(null);
    }
  };

  const MemberListData = async () => {
    try {
      const dashMember = await getMemberList(dashboardId, 1, 20);
      setGetMember(dashMember);
    } catch (error) {
      console.error("GET 요청 실패 :", error);
    }
  };

  const filteredAssigneeData = getMember?.members.filter(selectedItem =>
    selectedItem?.nickname?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    MemberListData();
  }, [dashboardId]);

  return (
    <div className={clsx(styles.Container)}>
      <div className={clsx(styles.Wrapper)}>
        <div className={clsx(styles.InputContainer, { [styles.small]: small })}>
          {selectedItem && (
            <ProfileImage member={selectedItem} width={28} height={28} />
          )}
          <input
            type="text"
            placeholder={"이름을 입력해 주세요"}
            onClick={toggleDropdown}
            onChange={handleInputChange}
            value={selectedItem ? `${selectedItem.nickname}` : searchTerm}
          />
        </div>
        <button onClick={toggleDropdown} tabIndex={-1}>
          <Image
            className={clsx(styles.Arrow, { [styles.RotateArrow]: isOpen })}
            src="/icons/arrowDropdown.svg"
            alt="드롭다운 화살표"
            width={26}
            height={26}
          />
        </button>
      </div>
      {isOpen && (
        <ul>
          {filteredAssigneeData?.map(item => (
            <li key={item.id} onClick={() => handleMenuItemClick(item)}>
              <div className={clsx(styles.Assignee)}>
                <ProfileImage member={item} width={28} height={28} />
                <span className={clsx(styles.Nickname)}>{item.nickname}</span>
                <Image
                  className={clsx(styles.CheckImage)}
                  src="/icons/checkImg.svg"
                  alt="체크 이미지"
                  width={22}
                  height={22}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InputDropdown;
