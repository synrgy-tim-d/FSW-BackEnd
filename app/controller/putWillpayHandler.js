const { BookingDetail } = require("../../models/index");

module.exports = async (req, res) => {
  try {
    await BookingDetail.update(
      {
        will_pay: req.query.willpay,
        payment_method: req.body.method,
      },
      {
        where: {
          booking_id: req.query.booking_id,
        },
      }
    );
    res.status(200).json({
      message: "Update Success",
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
