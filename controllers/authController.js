const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const Token = require("../models/Token");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const userRegistration = async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    gender,
    location,
    contactnumber,
    password,
  } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);
  try {
    const user = new User({
      firstname,
      lastname,
      email,
      gender,
      location,
      contactnumber,
      password: hashedPassword,
    });
    await user.save();

    // const token = new Token({
    //   userId: user._id,
    //   token: crypto.randomBytes(32).toString("hex"),
    // });
    // const url = `http://localhost:3000/${user._id}/verify/${token.token}`;
    // const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: "adivarun01@gmail.com",
    //     pass: "etwwaoyiygupvlsr",
    //   },
    // });
    // var mailOptions = {
    //   from: "adivarun01@gmail.com",
    //   to: user.email,
    //   subject: "Account verification for LodgeMe account",
    //   text: `http://localhost:3000/users/${user._id}/verify/${token.token}`,
    // };

    // transporter.sendMail(mailOptions, function (error, info) {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log("Email sent: ");
    //   }
    // });

    res.status(200).json({ message: "Registered as a user", ok: true });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Error try after sometime",
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message:
          "The email address you entered is not connected to our LodgeMe community",
      });
    }
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res.status(400).json({
        message: "Invalid credentials, please try again !",
      });
    }
    let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });
    res.json({
      token,
      user: {
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        createdAt: user.createdAt,
        gender: user.gender,
        location: user.location,
        contactnumber: user.contactnumber,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error while logging in",
    });
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
      bcrypt.hash(password, 10).then((hash) => {
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
};
