const express = require("express");
const bodyParser = require("body-parser");
const CORS = require("cors");
const config = require("config");
const app = express();
const logger = require("morgan");
require("express-async-errors");
const PORT = process.env.PORT || config.get("port");
const AuthRoute = require("./routes/Auth");
const TimeTableRoute = require("./routes/TimeTable");

const DB = require("./db");
const TimeTable = require("./models/TimeTable");

DB();

app.use(bodyParser.json());
app.use(logger("dev"));
if (!config.get("jwtPrivateKey")) {
  throw new Error("JWTPrivateKey not exists !");
}
app.use("/auth", AuthRoute);
app.use("/timetable", TimeTableRoute);

app.listen(PORT, () => console.log(`App is running on ${PORT}`));
