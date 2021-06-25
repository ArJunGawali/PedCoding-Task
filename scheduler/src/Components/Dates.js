import React, { useEffect, useState } from "react";
import Weekdays from "./Weekdays";
// import Day from "./Day";
function Dates(props) {
  const [active, setActive] = useState(1);
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  // console.log(typeof props.month, "month");
  const noOfdaysInMonth = new Date(
    Number(props.year),
    Number(props.month) + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(Number(props.year), props.month, 1);
  const dateString = firstDayOfMonth.toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  // console.log(dateString);
  const paddingDays = weekdays.indexOf(dateString.split(", ")[0]);
  // console.log(paddingDays, "pd");
  // console.log(noOfdaysInMonth, "nd");

  useEffect(() => {
    props.handle(active);
  }, [active]);

  function Day(props) {
    return (
      <div
        style={{
          width: "100px",
          height: "70px",
          backgroundColor:
            active === Number(props.name) ? "lightgreen" : "lightcoral",
          margin: "5px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "5px",
        }}
        onClick={() => {
          setActive(Number(props.name));
        }}
      >
        {props.name}
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        width: "770px",
        margin: "20px",
        flexWrap: "wrap",
      }}
    >
      {Array.from(Array(paddingDays), (e, i) => {
        return <Weekdays />;
      })}

      {Array.from(Array(noOfdaysInMonth), (e, i) => {
        return <Day name={i + 1} />;
      })}
    </div>
  );
}

export default Dates;
