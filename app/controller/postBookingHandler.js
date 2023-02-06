const { Booking, BookingDetail } = require("../../models/index");

module.exports = async (req, res) => {
  try {
    const postBooking = await Booking.create({
      booking_date_start: req.body.booking_date_start,
      booking_date_end: req.body.booking_date_end,
      user_id: req.user.userId,
      kos_id: req.body.kos_id,
      room_id: req.body.room_id,
      booking_id: `BK-${req.user.userId}-${req.body.room_id.slice(
        0,
        8
      )}-${req.body.booking_date_start.slice(0, 10)}`,
    });
    await BookingDetail.create({
      booking_id: postBooking.booking_id,
    });
    res.status(200).json({
      message: "Booking Success",
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
