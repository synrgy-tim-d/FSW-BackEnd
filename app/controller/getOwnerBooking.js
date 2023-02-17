const {
  Booking,
  BookingDetail,
  Kost,
  SetupCity,
  SetupImage,
} = require("../../models/index");

module.exports = async (req, res) => {
  try {
    const getOwnerBooking = await Booking.findAll({
      include: [
        {
          model: BookingDetail,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: Kost,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          include: [{ model: SetupCity }, { model: SetupImage }],
          where: {
            owner_id: req.user.userId,
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      //   where: {
      //     user_id: req.user.userId,
      //   },
    });
    res.status(200).json(getOwnerBooking);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
