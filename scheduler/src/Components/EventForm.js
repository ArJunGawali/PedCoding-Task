import React, { useEffect, useState } from "react";
import axios from "axios";
const baseUrl = "http://127.0.0.1:3001";
function EventForm(props) {
  const [nm, setNm] = useState("");
  const [st, setSt] = useState("");
  const [end, setEnd] = useState("");
  const [tcr, setTcr] = useState("");
  // const [date, setDate] = useState("");

  const onSubmit = () => {
    const date =
      (Number(props.dd) < 10 ? "0" + String(props.dd) : String(props.dd)) +
      (Number(props.mm) < 10
        ? "0" + String(Number(props.mm) + 1)
        : String(props.mm)) +
      String(props.yy);

    axios({
      method: "post",
      url: `${baseUrl}/api/addEvent`,
      headers: { "Content-Type": "application/json" },
      data: {
        name: nm,
        organiser: tcr,
        start: st,
        end: end,
        date: date,
      },
    })
      .then((res) => {
        // console.log(res.data);
        props.handleModal(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        width: "100%",
        height: "100%",
        position: "absolute",
        zIndex: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "300px",
          //   height: "125px",
          backgroundColor: "antiquewhite",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <h4>Add Event</h4>
        <input
          style={{
            width: "200px",
            height: "30px",
            margin: "5px",
            // borderRadius: "3px",
          }}
          placeholder="Event Name"
          onChange={(event) => {
            setNm(event.target.value);
            console.log(event.target.value);
          }}
        ></input>
        <input
          onChange={(event) => {
            setTcr(event.target.value);
            console.log(event.target.value);
          }}
          style={{ width: "200px", height: "30px", margin: "5px" }}
          placeholder="Teacher Name"
        ></input>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <input
            onChange={(event) => {
              setSt(event.target.value);
            }}
            type="time"
            style={{ width: "95px", height: "30px", margin: "5px" }}
            placeholder="Start Time"
          ></input>
          <input
            onChange={(event) => {
              setEnd(event.target.value);
            }}
            type="time"
            style={{ width: "95px", height: "30px", margin: "5px" }}
            placeholder="End Time"
          ></input>
        </div>

        <div>
          <button
            style={{
              height: "30px",
              width: "60px",
              padding: "3px",
              margin: "5px",
              alignContent: "center",
            }}
            onClick={onSubmit}
          >
            Add
          </button>
          <button
            style={{
              height: "30px",
              width: "60px",
              padding: "3px",
              margin: "5px",
              alignContent: "center",
            }}
            onClick={() => {
              props.handleModal(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventForm;
