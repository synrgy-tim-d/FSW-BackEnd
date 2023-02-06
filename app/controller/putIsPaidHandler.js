const { BookingDetail } = require("../../models/index");
const formidableMiddleware = require("formidable");
const cloudinary = require("../../config/cloudinary");

module.exports = async (req, res, next) => {
  try {
    const form = formidableMiddleware({ multiples: true });
    let uploadedFiles = "";

    form.parse(req, (err, fields, files) => {
      if (err) {
        next(err);
        return;
      }

      cloudinary.uploader.upload(files.files.filepath, async (err, result) => {
        if (err) {
          next(err);
          return;
        }
        uploadedFiles = result.secure_url;
        await BookingDetail.update(
          {
            is_paid: "true",
            payment_image_url: result.secure_url,
          },
          {
            where: {
              booking_id: req.query.booking_id,
            },
          }
        );

        res.status(200).json({
          message: "Upload Success",
        });
      });
    });
  } catch (error) {
    res.status(400).send(error);
  }
};
