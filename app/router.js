const express = require("express");
const router = express.Router();
// const { checkRole } = require("../app/controller/handler.example");
const getBooking = require("../app/controller/handler.example");

router.use(express.json());

router.get("/", (req, res) => {
  res.status(200).send("Anjas");
});

router.get("/test", getBooking);

module.exports = router;
