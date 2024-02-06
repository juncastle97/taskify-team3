import { useState } from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Calendar.module.scss";
import clsx from "clsx";
import Image from "next/image";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <div className={clsx(styles.datepickerWrap)}>
      <DatePicker
        className={clsx(styles.datepicker)}
        showIcon
        selected={selectedDate}
        onChange={date => setSelectedDate(date)}
        locale={ko}
        selectsStart
        placeholderText="날짜를 선택하세요"
        minDate={new Date()}
        dateFormat="yyyy.MM.dd HH:mm"
        showTimeInput
        timeInputLabel="Time:"
        icon={
          <Image src="/icons/calendar.svg" alt="icon" width={22} height={22} />
        }
      />
    </div>
  );
};
export default Calendar;
