const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "adivarun01@gmail.com",
        pass: "etwwaoyiygupvlsr",
      },
    });

    // await transporter.sendMail({
    //   from: process.env.USER,
    //   to: email,
    //   subject: subject,
    //   text: text,
    // });
    // console.log("email sent successfully");
    var mailOptions = {
      from: "adivarun01@gmail.com",
      to: user.email,
      subject: "Account verification for registering in LodgeMe account",
      text: `http://localhost:3000/${user._id}verify/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: ");
      }
    });
  } catch (error) {
    console.log("email not sent!");
    console.log(error);
    return error;
  }
};
