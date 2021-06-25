const express = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");
const cors = require("cors");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "08Oct2000@",
  database: "scheduler",
});
connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connection established...");
  }
});
const app = express();

// const allowedOrigins = ['http://localhost:3000'];

// const options: cors.CorsOptions = {
//   origin: allowedOrigins
// };

// Then pass these options to cors:
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/api/Events", (req, res) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:3002");
  connection.query("SELECT * FROM Events", (err, result) => {
    if (err) throw err;
    // console.log(result[0].id);
    res.json(result);
    console.log(result);
  });
});

app.get("/api/Events/:date", (req, res) => {
  const dt = req.params.date;
  res.set("Access-Control-Allow-Origin", "http://localhost:3002");
  connection.query(`SELECT * FROM Events WHERE date=?`, [dt], (err, result) => {
    if (err) throw err;
    // console.log(result[0].id);
    res.json(result);
    console.log(result);
  });
});

app.get("/api/Events/date/teacher/:date", (req, res) => {
  const dt = req.params.date;
  const teacher = req.query.teacher;
  res.set("Access-Control-Allow-Origin", "http://localhost:3002");
  connection.query(
    `SELECT * FROM Events WHERE date=${dt} AND organiser=?`,
    [teacher],
    (err, result) => {
      if (err) throw err;
      // console.log(result[0].id);
      res.json(result);
      console.log(result, "teacher date");
    }
  );
});

app.get("/api/Events/teachers/:date", (req, res) => {
  const dt = req.params.date;
  console.log(dt);
  console.log(req.params);
  res.set("Access-Control-Allow-Origin", "http://localhost:3002");
  connection.query(
    `SELECT DISTINCT organiser FROM Events WHERE date=?`,
    [dt],
    (err, result) => {
      if (err) throw err;
      // console.log(result[0].id);
      res.json(result);
      console.log(result, "teachers");
    }
  );
});

app.post("/api/addEvent", (req, res) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:3002");
  const data = req.body;
  const name = data.name;
  const organiser = data.organiser;
  const start = data.start;
  const end = data.end;
  const date = data.date;
  const id = organiser + start + end + date;

  let sql = "INSERT INTO Events(id,name,organiser,start,end,date)VALUES?";
  let value = [[id, name, organiser, start, end, date]];
  connection.query(sql, [value], (err, result) => {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });
});

app.delete("/api/Events/delete/", (req, res) => {
  console.log(req.query);
  const id = req.query.id;
  res.set("Access-Control-Allow-Origin", "http://localhost:3002");
  connection.query(`DELETE FROM Events WHERE id=?`, [id], (err, result) => {
    if (err) throw err;
    // console.log(result[0].id);
    res.json(result);
    console.log(result.affectedRows);
  });
});

app.listen(3001, () => {
  console.log("Server is running on 3000...");
});
