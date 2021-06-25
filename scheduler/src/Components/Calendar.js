import React, { useEffect, useState } from "react";
import Dates from "./Dates";
import Weekdays from "./Weekdays";
function App(props) {
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(2021);
  const [day, setDay] = useState();
  const handleDetails = (data) => {
    setDay(data);
  };
  // console.log(day);
  useEffect(() => {
    props.handleDate(day, month, year);
  }, [day, month, year]);

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
    const Years = [2021, 2022, 2023, 2024];

    const handleChange = (e) => {
      setMonth(e.target.value);
    };

    const handleChangeYear = (e) => {
      setYear(e.target.value);
    };
    // console.log(month);
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ margin: "5px" }}>
          <select value={month} onChange={handleChange}>
            {options.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        <div style={{ margin: "5px" }}>
          <select value={year} onChange={handleChangeYear}>
            {Years.map((year) => (
              <option value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        // justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        flex: 2,
      }}
    >
      <CalendarHeader />
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "770px",
          // margin: "20px",
        }}
      >
        <Weekdays name="Sunday" />
        <Weekdays name="Monday" />
        <Weekdays name="Tuesday" />
        <Weekdays name="Wednesday" />
        <Weekdays name="Thursday" />
        <Weekdays name="Friday" />
        <Weekdays name="Saturday" />
      </div>
      <Dates month={month} year={year} handle={handleDetails.bind(this)} />
    </div>
  );
}

export default App;
