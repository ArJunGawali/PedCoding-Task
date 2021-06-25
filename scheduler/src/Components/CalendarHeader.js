import React, { useState } from "react";

function CalendarHeader() {
  const options = [
    {
      label: "Jan",
      value: 0,
    },
    {
      label: "Feb",
      value: 1,
    },
    {
      label: "Mar",
      value: 2,
    },
    {
      label: "Apr",
      value: 3,
    },
    {
      label: "May",
      value: 4,
    },
    {
      label: "June",
      value: 5,
    },
    {
      label: "July",
      value: 6,
    },
    {
      label: "Aug",
      value: 7,
    },
    {
      label: "Sept",
      value: 8,
    },
    {
      label: "Oct",
      value: 9,
    },
    {
      label: "Nov",
      value: 10,
    },
    {
      label: "Dec",
      value: 11,
    },
  ];
  const [month, setMonth] = useState(0);
  const handleChange = (e) => {
    setMonth(e.target.value);
  };
  console.log(month);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <select value={month} onChange={handleChange}>
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
}

export default CalendarHeader;
