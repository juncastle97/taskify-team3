import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { getMonth, getYear } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Calendar.module.scss";
import Image from "next/image";
import { TimeDash } from "@/utils/time";

interface CalendarProps {
  onDueDate: (itemDate: any) => void;
  defaultValue?: any;
}

const Calendar = ({ onDueDate, defaultValue }: CalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const YEARS = Array.from(
    { length: 2100 - getYear(new Date()) + 1 },
    (_, i) => getYear(new Date()) + i,
  );
  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const onSelectedDate = (date: any) => {
    const formattedDate = TimeDash(date);
    setSelectedDate(date);
    onDueDate(formattedDate);
  };

  useEffect(() => {
    if (defaultValue) {
      setSelectedDate(defaultValue);
    }
  }, [defaultValue]);

  return (
    <DatePicker
      className={styles.datePicker}
      placeholderText="날짜를 입력해 주세요"
      dateFormat="YYYY-MM-dd HH:mm"
      formatWeekDay={nameOfDay => nameOfDay.substring(0, 1)}
      showYearDropdown
      scrollableYearDropdown
      shouldCloseOnSelect
      yearDropdownItemNumber={100}
      minDate={new Date()}
      selected={selectedDate}
      showTimeInput
      timeInputLabel="Time:"
      calendarClassName={styles.calenderWrapper}
      weekDayClassName={date => {
        if (date.getDay() === 0) {
          return styles.sunday;
        } else if (date.getDay() === 6) {
          return styles.saturday;
        } else {
          return styles.weekday;
        }
      }}
      dayClassName={date =>
        selectedDate &&
        date.getDate() ===
          (selectedDate instanceof Date ? selectedDate.getDate() : null)
          ? styles.selectedDay
          : styles.unselectedDay
      }
      timeClassName={time => time && styles.time}
      onChange={onSelectedDate}
      renderCustomHeader={({
        date,
        changeYear,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div className={styles.customHeaderContainer}>
          <div>
            <button
              type="button"
              onClick={decreaseMonth}
              className={styles.monthButton}
              disabled={prevMonthButtonDisabled}
            >
              <Image
                src="/icons/leftArrow.svg"
                width={20}
                height={20}
                alt="left arrow"
              />
            </button>
          </div>
          <div className={styles.monthAndYear}>
            <span className={styles.month}>{MONTHS[getMonth(date)]}</span>
            <select
              value={getYear(date)}
              className={styles.year}
              onChange={({ target: { value } }) => changeYear(+value)}
            >
              {YEARS.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <button
              type="button"
              onClick={increaseMonth}
              className={styles.monthButton}
              disabled={nextMonthButtonDisabled}
            >
              <Image
                src="/icons/rightArrow.svg"
                width={20}
                height={20}
                alt="right arrow"
              />
            </button>
          </div>
        </div>
      )}
    />
  );
};

export default Calendar;
