import { ChangeEvent, useState } from "react";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import customParseFormat from "dayjs/plugin/customParseFormat";
import style from "./Calendar.module.scss";
import CalendarIcon from "@/public/icons/calendar.svg";
import clsx from "clsx";
import Image from "next/image";

const Calendar: React.FC<any> /* 타입 설정하기 */ = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className={clsx(style.datepickerWrap)}>
      <DatePicker
        className={clsx(style.datepicker)}
        showIcon
        selected={selectedDate}
        onChange={date => setSelectedDate(date)}
        locale={ko}
        selectsStart
        placeholderText="날짜를 선택하세요"
        dateFormat="yyyy.MM.dd HH:mm:ss"
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
