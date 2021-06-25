import React from "react";

function Date(props) {
  return (
    <div
      style={{
        width: "100px",
        height: "70px",
        backgroundColor: "lightcoral",
        margin: "5px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "5px",
      }}
    >
      {props.name}
    </div>
  );
}

export default Date;
