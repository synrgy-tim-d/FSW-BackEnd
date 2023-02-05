const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const router = require("./router");

app.use(cors());
app.use(router);

module.exports = app;
