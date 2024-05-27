/* eslint-disable react/prop-types */

import { Calendar } from "lucide-react";
import DatePicker from "react-datepicker";

const index = ({ startDate, minTime, handleDateChange }) => {
  return (
    <>
      <DatePicker
        showIcon
        toggleCalendarOnIconClick
        selected={startDate}
        onChange={handleDateChange}
        icon={<Calendar className="w-4 h-4" />}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="time"
        dateFormat="dd/MM/yyyy h:mm aa"
        minDate={new Date()}
        minTime={minTime}
        maxTime={new Date(0, 0, 0, 23, 45)}
        className="w-full border rounded-md"
      />
    </>
  );
};

export default index;
