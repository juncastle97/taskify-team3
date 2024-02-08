import { useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./Dropdown.module.scss";
import Image from "next/image";

interface DropdownProps {
  data: DropdownItem[];
  onSelectItem: (itemId: number) => void;
  defaultValue?: any;
}

export interface DropdownItem {
  id: number;
  title: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  data,
  onSelectItem,
  defaultValue,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<DropdownItem>({
    id: 0,
    title: "",
  });

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (clickedItem: DropdownItem) => {
    setSelectedItem(clickedItem);
    setIsOpen(false);
    onSelectItem(defaultValue ? defaultValue : clickedItem.id);
  };

  useEffect(() => {
    // defaultValue가 주어졌을 때, 해당 아이템을 선택합니다.
    if (defaultValue) {
      const defaultItem = data.find(item => item.id === defaultValue);
      if (defaultItem) {
        setSelectedItem(defaultItem);
      }
    }
  }, [defaultValue, data]);

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
              <div key={item.id} className={clsx(styles.Chip)}>
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
        <div key={selectedItem.id} className={clsx(styles.Chip)}>
          •{selectedItem.title}
        </div>
      ) : (
        data && (
          <div key={data[0].id} className={clsx(styles.Chip)}>
            •{data[0].title}
          </div>
        )
      )}
    </div>
  );
};

export default Dropdown;
