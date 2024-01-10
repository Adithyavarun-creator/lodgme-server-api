const bcryptjs = require("bcryptjs");
const User = require("../models/User");
const GoogleUser = require("../models/GoogleUser");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const FacebookUser = require("../models/FacebookUser");
const axios = require("axios");
const Token = require("../models/Token");
const errorHandler = require("../utils/error");

const userRegistration = async (req, res, next) => {
  const {
    username,
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
    username,
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
    const token = await new Token({
      userId: newUser._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD,
      },
    });

    var mailOptions = {
      from: process.env.MY_EMAIL,
      to: newUser.email,
      subject: "User Email verification for Lodgeme",
      text: `${process.env.REACT_FRONTEND_APP}/user/${newUser._id}/verify/${token.token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent for verification: ");
      }
    });

    res
      .status(201)
      .json(
        "An email has been sent to your account ! Please check and verify the link"
      );
    // res.status(201).json("User created successfully!");
  } catch (error) {
    next(error);
  }
};

const verifyUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    //console.log(user);
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
    await User.updateOne(
      {
        _id: user._id,
        // verified: true,
      },
      { $set: { emailVerified: true } }
    );
    // await token.remove();
    res.status(200).json({
      message: "Email verified successfully",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Internal server error",
    });
  }
};

const verifyUserInDashboard = async (req, res) => {
  // console.log(req.params.id);
  try {
    const user = await User.findOne({ _id: req.params.id });
    //const user = await User.findOne({ email });
    console.log(user);
    if (!user)
      return res.status(400).json({
        message: "Invalid token",
      });
    const token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();
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
      subject: "User Email verification for Lodgeme",
      text: `${process.env.REACT_FRONTEND_APP}/user/${user._id}/verify/${token.token}`,
    };

    
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent for verification: ");
      }
    });

    return res
      .status(201)
      .json(
        "An email has been sent to your account ! Please check and verify the link"
      );

    // //content
    // if (!token)
    //   return res.status(400).json({
    //     message: "Invalid token",
    //   });
    // await User.updateOne(
    //   {
    //     _id: user._id,
    //   },
    //   { $set: { emailVerified: true } }
    // );
    // return res.status(200).json({
    //   message: "Email sent to your account",
    // });
  } catch (error) {
    return res.status(400).json({
      message: "Internal server error",
    });
  }
};

const verifyUserPhone = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    //console.log(user);
    if (!user)
      return res.status(400).json({
        message: "Invalid User for verification",
      });

    await User.updateOne(
      {
        _id: user._id,
        // verified: true,
      },
      { $set: { mobileVerified: true } }
    );
    // await token.remove();
    res.status(200).json({
      message: "Phone number verified successfully",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Internal server error",
    });
  }
};

const userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return next(errorHandler(404, "User not found!"));
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
    // const { password: pass, ...rest } = user._doc;
    // res
    //   .cookie("access_token", token, { httpOnly: true })
    //   .status(200)
    //   .json({ user, token });
    return res.status(200).json({
      msg: "Login successful",
      token,
      user,
    });
  } catch (error) {
    next(error);
  }
};

const googleSignIn = async (req, res, next) => {
  try {
    const user = await GoogleUser.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
      const { password: pass, ...rest } = user._doc;
      // res
      //   .cookie("access_token", token, { httpOnly: true })
      //   .status(200)
      //   .json(rest);
      return res.status(200).json({
        msg: "Login successful",
        token,
        user,
        provider: "google",
      });
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new GoogleUser({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY);
      const { password: pass, ...rest } = newUser._doc;
      // res
      //   .cookie("access_token", token, { httpOnly: true })
      //   .status(200)
      //   .json(rest);
      return res.status(200).json({
        msg: "Login successful",
        token,
        user,
        provider: "google",
      });
    }
  } catch (error) {
    next(error);
  }
};

let getUserByFacebookIdAndAccessToken = (accessToken, userId) => {
  let urlGraphFacebook = `https://graph.facebook.com/v2.11/${userId}?fields=id,name,email&access_token=${accessToken}`;
  let result = axios.get(urlGraphFacebook);
  return result;
};

const facebookSignIn = async (req, res, next) => {
  try {
    const { userId, accessToken } = req.body;
    if (!userId || userId == "" || !accessToken || accessToken == "") {
      return res
        .status(400)
        .json({ message: "userId and accessToken are required" });
    }
    //get user by facebook userId and accesToken
    let { data } = await getUserByFacebookIdAndAccessToken(accessToken, userId);
    //check if user exist
    var user = await FacebookUser.findOne({ facebookId: data.id });
    var authObject = {};
    if (user) {
      var token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
      authObject = {
        auth: true,
        token,
        user,
        message: "Successfully logged in.",
        provider: "facebook",
      };
      //console.log(user);
      // res
      //   .cookie("access_token", token, { httpOnly: true })
      //   .status(200)
      //   .json({ authObject });
      return res.status(200).json({
        authObject,
      });
    } else {
      user = await FacebookUser.create({
        username: data.name,
        email: data.email,
        facebookId: data.id,
      });
      var token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
      authObject = {
        auth: true,
        token,
        user,
        message: "Successfully Registered.",
        provider: "facebook",
      };
      // res
      //   .cookie("access_token", token, { httpOnly: true })
      //   .status(200)
      //   .json({ authObject });
      return res.status(200).json({
        authObject,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
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

const updateUser = async (req, res, next) => {
  // console.log(req.user.id);
  // console.log(req.params.id);
  if (req.user.id !== req.params.id)
    return next(
      errorHandler(401, "You are allowed to edit only your own account!")
    );
  try {
    // console.log(req.body.country);
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          firstname: req.body.firstname,
          country: req.body.country,
          lastname: req.body.lastname,
          username: req.body.username,
          homeAddress: req.body.homeAddress,
          email: req.body.email,
          password: req.body.password,
          profilePic: req.body.profilePic,
          contactnumber: req.body.contactnumber,
          gender: req.body.gender,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return next(errorHandler(404, "User not found!"));

    const { password: pass, ...rest } = user._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  userRegistration,
  userLogin,
  forgotPassword,
  resetPassword,
  verifyUser,
  verifyUserInDashboard,
  signOut,
  googleSignIn,
  facebookSignIn,
  getUser,
  updateUser,
  verifyUserPhone,
};
