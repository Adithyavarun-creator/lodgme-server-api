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
app.use(
  cors({
    origin: ["https://lodgme-client.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
//app.use(cors());
app.use(morgan("dev"));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.post("/", (req, res) => {
  res.status(200).send("Welcome to LodgeMe API");
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


/**
 "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Credentials", "value": "true" },
        { "key": "Access-Control-Allow-Origin", "value": "*" },
        {
          "key": "Access-Control-Allow-Methods",
          "value": "GET,OPTIONS,PATCH,DELETE,POST,PUT"
        },
        {
          "key": "Access-Control-Allow-Headers",
          "value": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
        }
      ]
    }
  ]
 */