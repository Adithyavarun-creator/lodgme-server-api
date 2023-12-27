const express = require("express");
// const router = require("./routes/auth");
const fs = require("fs");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/auth");
const listingRoute = require("./routes/listing");

const app = express();

dotenv.config();

//morgan
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["https://lodgme-client.vercel.app", "http://localhost:3000"],
    credentials: true,
  })
);
// app.use(cors({ credentials: true }));
app.use(morgan("dev"));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//middlewares
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// app.use(function (request, response, next) {
//   response.header("Access-Control-Allow-Origin", "*");
//   response.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.get("/", (req, res) => {
  res.json("Welcome to LodgeMe API");
});

app.use("/api", userRoute);
app.use("/api", listingRoute);

//route map middleware
// fs.readdirSync("./routes").map((r) =>
//   app.use("/api", require(`./routes/${r}`))
// );

//mongodb connect
//xrG8MbzGFGmtYMBx
mongoose
  .connect(process.env.MONGODB, {})
  .then(() => console.log("DB connected 🔥🔥🔥"))
  .catch((err) => console.log("DB Error => ", err));

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server running on ${port} 🚀🚀🚀`);
});
