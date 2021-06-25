import React, { useEffect, useState } from "react";
import axios from "axios";
const baseUrl = "http://127.0.0.1:3001";
export default function Events(props) {
  // const date = new Date(Number(props.yy), Number(props.mm), Number(props.dd));
  const [data, setData] = useState();

  const getData = async () => {
    // console.log(props.dd);
    const date =
      (Number(props.dd) < 10 ? "0" + String(props.dd) : String(props.dd)) +
      (Number(props.mm) < 10
        ? "0" + String(Number(props.mm) + 1)
        : String(props.mm)) +
      String(props.yy);
    // console.log(date);
    axios
      .get(`${baseUrl}/api/Events/${date}`)
      .then((result) => {
        // if (err) throw err;
        setData(result.data);
        // console.log(data, result.data, "data");
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };

  useEffect(() => {
    getData();
  }, [props]);

  const del = (idm) => {
    console.log(idm);
    axios.delete(`${baseUrl}/api/Events/delete/?id=${idm}`).then(() => {
      console.log("Item deleted");
      getData();
    });
  };

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
        backgroundColor: "lightblue",
        // justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h1 style={{ textAlign: "center", fontWeight: "bold" }}>Events</h1>
      <h3 style={{ textAlign: "center" }}>
        {props.dd}/{Number(props.mm) + 1}/{props.yy}
      </h3>

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
                <div>
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
                <button
                  onClick={() => {
                    del(item.id);
                  }}
                >
                  Delete
                </button>
              </div>
            );
          })
        : null}
    </div>
  );
}
