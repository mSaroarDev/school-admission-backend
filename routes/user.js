const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/checkAuth");
const {
  register,
  userLogin,
  verifyLogged,
  currUserInfo,
  logout,
} = require("../controllers/user");

// api's
router.post("/register", register);
router.post("/login", userLogin);
router.get("/verify-logged", checkAuth, verifyLogged);
router.get("/logged-user", checkAuth, currUserInfo);
router.post("/logout", checkAuth, logout);

module.exports = router;
