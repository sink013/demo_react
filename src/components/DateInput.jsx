import React from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
const DateInput = ({ value, onChange }) => {
  // console.log(value);
  return (
    <div>
      <DatePicker
        value={value ? dayjs(value) : value}
        onChange={(e) => {
          //   console.log(e);
          let val = e.format("YYYY-MM-DD");
          onChange(val);
        }}
      />
    </div>
  );
};

export default DateInput;
