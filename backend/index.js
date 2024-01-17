const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

const userRoute = require("./routes/userRoute");
const courseRoute = require("./routes/courseRoute");
const { dbConnection } = require("./config/dbConnection");

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/", userRoute);
app.use("/courses", courseRoute);

dbConnection();

app.listen(port, async () => {
  console.log("server is running", port);
});
