const express = require("express");
const router = require("./routes/auth");
const fs = require("fs");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyparser = require("body-parser");

const app = express();

dotenv.config();

//morgan
app.use(express.json());
// app.use(cors());
app.use(morgan("dev"));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use(function (request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/", (req, res) => {
  res.json("Welcome to LodgeMe API");
});

//route map middleware
fs.readdirSync("./routes").map((r) =>
  app.use("/api", require(`./routes/${r}`))
);



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
