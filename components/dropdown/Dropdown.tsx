import { useState } from "react";

import clsx from "clsx";
import styles from "./Dropdown.module.scss";
import Image from "next/image";

interface DropdownProps {
  data: DropdownItem[] | null;
}

interface DropdownItem {
  id: number;
  title: string;
  color: string;
}

interface Assignee {
  assignee: {
    profileImageUrl: string;
    nickname: string;
    id: number;
  };
}

const Dropdown: React.FC<DropdownProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (clickedItem: DropdownItem) => {
    setSelectedItem(clickedItem);
    setIsOpen(false);
  };

  return (
    <div className={clsx(styles.Wrapper)} onClick={toggleDropdown}>
      <button type="button" onClick={toggleDropdown}>
        <Image
          className={clsx(styles.Arrow, { [styles.RotateArrow]: isOpen })}
          src="/icons/arrowDropdown.svg"
          alt="드롭다운 화살표"
          width={26}
          height={26}
        />
      </button>
      {isOpen && (
        <ul className={clsx(styles.UlWrapper)}>
          {data?.map(item => (
            <li key={item.id} onClick={() => handleMenuItemClick(item)}>
              <div
                key={item.id}
                className={clsx(styles.Chip)}
                style={{ backgroundColor: item.color }}
              >
                •{item.title}
              </div>
              <Image
                  className={clsx(styles.CheckImage)}
                  src="/icons/checkImg.svg"
                  alt="체크 이미지"
                  width={22}
                  height={22}
                />
            </li>
          ))}
        </ul>
      )}
      {selectedItem ? (
        <div
          key={selectedItem.id}
          className={clsx(styles.Chip)}
          style={{ backgroundColor: selectedItem.color }}
        >
          •{selectedItem.title}
        </div>
      ) : (
        data &&
        data[0] && (
          <div
            key={data[0].id}
            className={clsx(styles.Chip)}
            style={{ backgroundColor: data[0].color }}
          >
            •{data[0].title}
          </div>
        )
      )}
    </div>
  );
};

export default Dropdown;
