const { Booking, BookingDetail, KostRoom } = require("../../models/index");

module.exports = async (req, res) => {
  const rent_time = req.body.rent_time;
  let rent_price;

  try {
    const priceRoom = await KostRoom.findOne({
      where: {
        id: req.body.room_id,
      },
    });

    if (rent_time === "HARIAN") {
      rent_price = priceRoom.price_per_daily;
    } else if (rent_time === "MINGGUAN") {
      rent_price = priceRoom.price_per_weekly;
    } else if (rent_time === "BULANAN") {
      rent_price = priceRoom.price_per_monthly;
    }
    rent_price = Math.round(rent_price);

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
      rent_price: rent_price,
      rent_time: rent_time,
    });

    await KostRoom.update(
      {
        is_available: false,
      },
      {
        where: {
          id: req.body.room_id,
        },
      }
    );

    res.status(200).json({
      message: "Booking Success",
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
