// const nodemailer = require("nodemailer");

// var transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.MY_EMAIL,
//     pass: process.env.MY_PASSWORD,
//   },
// });

// var mailOptions = {
//   from: process.env.MY_EMAIL,
//   to: user.email,
//   subject: "Reset Login password for your LodgeMe account",
//   text: `${process.env.REACT_FRONTEND_APP}/reset-password/${user._id}/${token}`,
// };

// transporter.sendMail(mailOptions, function (error, info) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Email sent: ");
//   }
// });
