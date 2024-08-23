const userModel = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connectDB = require("../db/connectDB");

// user register
const register = async (req, res) => {
  const body = req.body;

  try {
    await connectDB();

    // check existing user
    const existUser = await userModel.find({ email: body.email });
    if (existUser.length > 0) {
      return res.status(406).json({ msg: "user already exist with this mail" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(body.password, 10);

    // save data to db
    const newData = new userModel({
      ...body,
      password: hashedPassword,
    });

    const data = await newData.save();
    res.status(200).json({ msg: "success", data });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ msg: "internal server error" });
  }
};

// login user
const userLogin = async (req, res) => {
  const formData = req.body;

  try {
    await connectDB();

    const existUser = await userModel.findOne({ email: formData.email });

    if (!existUser) {
      return res.status(401).json({ msg: "authentication failed" });
    }

    const isValidPassword = bcrypt.compareSync(
      formData.password,
      existUser.password
    );

    if (!isValidPassword) {
      return res.status(401).json({ msg: "authentication failed" });
    }

    if (existUser && isValidPassword) {
      // generate token
      const token = jwt.sign(
        {
          id: existUser._id,
          userName: existUser.userName,
          email: existUser.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        sameSite: "none",
        secure: true,
        expires: new Date(Date.now() + 1 * 60 * 60 * 1000),
      });

      // return response
      res.status(200).json({
        msg: "success",
      });
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ msg: "error", error: error });
  }
};

// verify user
const verifyLogged = async (req, res) => {
  try {
    return res.status(200).json({ msg: true });
  } catch (error) {
    return res.status(500).json({ msg: false });
  }
};

// user info
const currUserInfo = async (req, res) => {
  try {
    connectDB();

    const data = await userModel.findOne({ _id: req.id });
    res.status(200).json({ msg: "success", data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "error" });
  }
};

// logout
const logout = async (req, res) => {
  try {
    await connectDB();

    // remove cookie
    res.setHeader(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("Surrogate-Control", "no-store");
    res.clearCookie("token");
    res.status(200).json({ msg: "success", data: "logged out" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "authencation failed" });
  }
};

module.exports = { register, userLogin, verifyLogged, currUserInfo, logout };
