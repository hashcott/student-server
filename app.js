const express = require("express");
const bodyParser = require("body-parser");
const CORS = require("cors");
const config = require("config");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || config.get("port");
const DB = require("./db");
DB();

app.use(bodyParser.json());
app.use(CORS);
if (!config.get("jwtPrivateKey")) {
  throw new Error("JWTPrivateKey not exists !");
}
app.listen(PORT, () => console.log(`App is running on ${PORT}`));
