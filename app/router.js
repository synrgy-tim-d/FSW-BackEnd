const express = require("express");
const router = express.Router();
// const { checkRole } = require("../app/controller/handler.example");
const getExample = require("./controller/exampleHandler");

router.use(express.json());

router.get("/", (req, res) => {
  res.status(200).send("Anjas");
});

router.get("/test/example", getExample);

module.exports = router;
