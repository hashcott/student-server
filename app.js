const express = require("express");
const bodyParser = require("body-parser");
const CORS = require("cors");
const config = require("config");
const app = express();
const PORT = process.env.PORT || config.get("port");
app.use(bodyParser.json());
app.use(CORS);
app.listen(PORT, () => console.log(`App is running on ${PORT}`));
