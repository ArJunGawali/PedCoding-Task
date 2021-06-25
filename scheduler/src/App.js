import "./App.css";
import React, { useEffect, useState } from "react";
import Calendar from "./Components/Calendar";
import Events from "./Components/Events";
import SideBar from "./Components/SideBar";
import EventForm from "./Components/EventForm";
const baseUrl = "http://127.0.0.1:3001";
function App() {
  const [date, setDate] = useState({});

  const dateHandler = (a, b, c) => {
    setDate({
      d: a,
      m: b,
      y: c,
    });
  };
  const [modal, setModal] = useState(false);
  const modalHandler = (item) => {
    setModal(item);
  };
  // console.log(date);
  return (
    <div
      className="App"
      style={{ display: "flex", height: "100%", width: "100%", flex: 1 }}
    >
      {/* <CalendarHeader /> */}
      <SideBar
        handleModal={modalHandler.bind(this)}
        dd={date.d}
        mm={date.m}
        yy={date.y}
      />
      <Calendar handleDate={dateHandler.bind(this)} />
      <Events dd={date.d} mm={date.m} yy={date.y} />
      {modal ? (
        <EventForm
          handleModal={modalHandler.bind(this)}
          dd={date.d}
          mm={date.m}
          yy={date.y}
        />
      ) : null}
    </div>
  );
}

export default App;
