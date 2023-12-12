const errorHandler = require("./error.js");
const jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(errorHandler(401, "UnAuthorized"));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(401, "Forbidden"));

    req.user = user;
    next();
  });
};

module.exports = { verifyUser };
