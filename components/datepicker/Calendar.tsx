import { Dispatch, SetStateAction, useState } from "react";
import DatePicker from "react-datepicker";
import { getMonth, getYear } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./calendar.module.scss";
import Image from "next/image";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
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

  return (
    <DatePicker
      className={styles.datePicker}
      dateFormat="yyyy.MM.dd HH:mm"
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
        date.getDate() === selectedDate?.getDate()
          ? styles.selectedDay
          : styles.unselectedDay
      }
      timeClassName={time => time && styles.time}
      onChange={date => setSelectedDate(date)}
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
