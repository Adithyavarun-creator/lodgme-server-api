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
