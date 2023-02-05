const {
  Booking,
  BookingDetail,
  User,
  Kost,
  KostRoom,
} = require("../../models/index");

module.exports = async (req, res) => {
  try {
    const getExample = await Booking.findAll({
      attributes: [
        "booking_id",
        ["booking_date_start", "start"],
        "booking_date_end",
      ],
      include: [
        {
          model: BookingDetail,
          attributes: {
            exclude: ["booking_id", "created_at", "updated_at"],
          },
        },
        {
          model: User,
          attributes: {
            exclude: ["id", "created_at", "updated_at"],
          },
        },
        {
          model: Kost,
          attributes: {
            exclude: ["id", "created_at", "updated_at"],
          },
        },
        {
          model: KostRoom,
          attributes: {
            exclude: ["id", "created_at", "updated_at"],
          },
        },
      ],
    });
    res.status(200).json(getExample);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
