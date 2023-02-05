const express = require("express");
const router = express.Router();

const getExample = require("./controller/exampleHandler");
const auth = require("./middleware/auth");

router.use(express.json());

router.get("/", (req, res) => {
  res.status(200).send("Anjas");
});

router.get("/test/auth", auth, (req, res) => {
  res.status(200).json(req.user);
});

router.get("/test/example", getExample);

module.exports = router;
