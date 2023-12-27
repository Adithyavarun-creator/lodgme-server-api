const jwt = require("jsonwebtoken");
const errorHandler = require("./error");

const verifyUser = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.json("A token is required for authentication");
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      res.status(403);
    }
    req.user = user;
    next();
  });
};

module.exports = verifyUser;

// const User = require("../models/User");
// require("dotenv").config();
// const jwt = require("jsonwebtoken");

// module.exports.verifyUser = (req, res) => {
//   const token = req.cookies.access_token;
//   if (!token) {
//     return res.json({ status: false });
//   }
//   jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, data) => {
//     if (err) {
//       return res.json({ status: false });
//     } else {
//       const user = await User.findById(data.id);
//       if (user) return res.json({ user: user });
//       else return res.json({ status: false });
//     }
//   });
// };
