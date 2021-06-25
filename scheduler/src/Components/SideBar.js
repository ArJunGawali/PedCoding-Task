import React, { useState, useEffect } from "react";
import axios from "axios";
const baseUrl = "http://127.0.0.1:3001";
export default function SideBar(props) {
  const [data, setData] = useState();
  const [teach, setTeach] = useState();
  const [teachers, setTeachers] = useState([]);
  // const date = new Date(Number(props.yy), Number(props.mm), Number(props.dd));
  console.log(teachers);

  const getData = async () => {
    // console.log(props.dd);
    console.log(teach, "teach");
    if (teach) {
      const date =
        (Number(props.dd) < 10 ? "0" + String(props.dd) : String(props.dd)) +
        (Number(props.mm) < 10
          ? "0" + String(Number(props.mm) + 1)
          : String(props.mm)) +
        String(props.yy);
      console.log(date);
      axios
        .get(`${baseUrl}/api/Events/date/teacher/${date}/?teacher=${teach}`)
        .then((result) => {
          // if (err) throw err;
          setData(result.data);
          console.log(result.data, "data");
        })
        .catch((err) => {
          console.log(err, "err");
        });
    }
  };

  const getTeacher = async () => {
    // console.log(props.dd);
    const date =
      (Number(props.dd) < 10 ? "0" + String(props.dd) : String(props.dd)) +
      (Number(props.mm) < 10
        ? "0" + String(Number(props.mm) + 1)
        : String(props.mm)) +
      String(props.yy);
    console.log(date, "sidebar");
    axios
      .get(`${baseUrl}/api/Events/teachers/${date}`)
      .then((result) => {
        // if (err) throw err;
        setTeachers(result.data);
        // console.log(data, result.data, "data");
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };

  const handleChangeTeacher = (e) => {
    setTeach(e.target.value);
  };

  useEffect(() => {
    getTeacher();
    getData();
  }, [props, teach]);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "600px",
        maxHeight: "600px",
        overflowY: "scroll",
        flex: 1,
        borderWidth: "4px",
        borderColor: "black",
        margin: "10px",
        backgroundColor: "lightsalmon",

        flexDirection: "column",
      }}
    >
      <h1 style={{ textAlign: "center", fontWeight: "bold" }}>SideBar</h1>

      <button
        style={{
          height: "40px",
          backgroundColor: "violet",
          marginInline: "80px",
          borderRadius: "5px",
        }}
        onClick={() => {
          props.handleModal(true);
        }}
      >
        Add Event
      </button>
      <p>Filter Events by teachers :</p>
      <select
        style={{ height: "35px", borderRadius: "3px", margin: "5px" }}
        value={teach}
        onChange={handleChangeTeacher}
      >
        {teachers.map((teacher) => (
          <option key={teacher.id} value={teacher.organiser}>
            {teacher.organiser}
          </option>
        ))}
      </select>

      {data
        ? data.map((item) => {
            return (
              <div
                style={{
                  alignSelf: "center",
                  backgroundColor: "tan",
                  margin: "5px",
                  padding: "5px",
                  borderRadius: "5px",
                }}
                key={item.id}
              >
                <p>
                  <b>Event Name</b>:{item.name}
                </p>
                <p>
                  <b>Organiser</b>:{item.organiser}
                </p>
                <p>
                  <b>Time</b>:{item.start.slice(0, 5)}-{item.end.slice(0, 5)}
                </p>
              </div>
            );
          })
        : null}
    </div>
  );
}
