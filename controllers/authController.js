const bcryptjs = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
// const Token = require("../models/Token");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const errorHandler = require("../utils/error");

const userRegistration = async (req, res, next) => {
  const {
    firstname,
    lastname,
    email,
    gender,
    country,
    contactnumber,
    homeAddress,
    password,
  } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    firstname,
    lastname,
    email,
    gender,
    homeAddress,
    country,
    contactnumber,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    res.status(201).json("User created successfully!");
  } catch (error) {
    next(error);
  }
};

const userLogin = async (req, res, next) => {
  // try {
  //   const { email, password } = req.body;
  //   const user = await User.findOne({ email });
  //   if (!user) {
  //     return res.status(400).json({
  //       message:
  //         "The email address you entered is not connected to our LodgeMe community",
  //     });
  //   }
  //   const check = await bcrypt.compare(password, user.password);
  //   if (!check) {
  //     return res.status(400).json({
  //       message: "Invalid credentials, please try again !",
  //     });
  //   }
  //   let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
  //     expiresIn: "7d",
  //   });
  //   res.json({
  //     token,
  //     user: {
  //       _id: user._id,
  //       firstname: user.firstname,
  //       lastname: user.lastname,
  //       email: user.email,
  //       createdAt: user.createdAt,
  //       gender: user.gender,
  //       location: user.location,
  //       contactnumber: user.contactnumber,
  //     },
  //   });
  // } catch (error) {
  //   console.log(error);
  //   res.status(500).json({
  //     message: "Error while logging in",
  //   });
  // }
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found!"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

const googleSignIn = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

const signOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been logged out!");
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(400).json({
      message: "User not found with this email",
    });
  }
  let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });

  //adivarun01@gmail.com
  //Adivarun2023
  //etww aoyi ygup vlsr
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASSWORD,
    },
  });

  var mailOptions = {
    from: process.env.MY_EMAIL,
    to: user.email,
    subject: "Reset Login password for your LodgeMe account",
    text: `${process.env.REACT_FRONTEND_APP}/reset-password/${user._id}/${token}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: ");
    }
  });
};

const resetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(400).json({
        message: "Invalid token",
      });
    } else {
      bcryptjs.hashSync(password, 10).then((hash) => {
        User.findByIdAndUpdate({ _id: id }, { password: hash }).then((u) =>
          res.send({ status: "Success" })
        );
      });
    }
  });
};

const verifyUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user)
      return res.status(400).json({
        message: "Invalid token",
      });
    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token)
      return res.status(400).json({
        message: "Invalid token",
      });
    await User.updateOne({
      _id: user._id,
      verified: true,
    });
    await token.remove();
    res.status(200).json({
      message: "Email verified successfully",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  userRegistration,
  userLogin,
  forgotPassword,
  resetPassword,
  verifyUser,
  signOut,
  googleSignIn,
};
