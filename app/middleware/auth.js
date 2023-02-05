const dotenv = require("dotenv");
const { User } = require('../../models/index');
dotenv.config();

const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.status(401);
  }
  jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
    console.log(err);
    if (err) return res.status(403);
    req.user = user;
    const userId = await User.findOne({where: {username: user.user_name}});
    req.user.userId = userId.dataValues.id;
    next();
  });
};

module.exports = auth;
