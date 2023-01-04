const express = require("express");
const router = express.Router();

router.use(express.json());

router.get("/", (req, res) => {
  res.status(200).send("Anjas");
});

module.exports = router;
