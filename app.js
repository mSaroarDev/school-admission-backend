const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// import routes
const userRoute = require("./routes/user");
const applicationRoute = require("./routes/application");

// initialize app
const app = express();

// configure dotenv
dotenv.config();
app.use(express.json());
app.use(cookieParser());

// enable cors
app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);

// routes
app.get("/", (req, res) => {
  res.send("Hello Developer");
});

app.use("/auth", userRoute);
app.use("/application", applicationRoute);

// start the server
app.listen(process.env.PORT || 5003, () => {
  console.log(`server started at port ${process.env.PORT || 5003}`);
});
