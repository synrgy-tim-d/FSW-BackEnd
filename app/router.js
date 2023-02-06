const express = require("express");
const router = express.Router();
const auth = require("./middleware/auth");

const getExample = require("./controller/exampleHandler");
const postBooking = require("./controller/postBookingHandler");
const putWillpay = require("./controller/putWillpayHandler");
const putIsPaid = require("./controller/putIsPaidHandler");

const {
  oauthGoogle,
  oauthCallback,
} = require("./controller/oauthGoogleHandler");

router.use(express.json());

router.get("/", (req, res) => {
  res.status(200).send("Anjas");
});

router.get("/test/auth", auth, (req, res) => {
  res.status(200).json(req.user);
});

router.get("/test/example", getExample);
// router.put("/test/example", putIsPaid);

router.post("/api/book", auth, postBooking);
router.put("/api/book", auth, putWillpay);
router.put("/api/book/payment", auth, putIsPaid);

router.get("/oauth", oauthGoogle);
router.get("/Callback", oauthCallback);

module.exports = router;
