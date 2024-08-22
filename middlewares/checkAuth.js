const jwt = require("jsonwebtoken");

function checkAuth(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ msg: "user unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.id = decoded.id;
    req.email = decoded.email;
    req.institute = decoded.institute;

    next();
  } catch (error) {
    next("Authorization Failed");
  }
}

module.exports = checkAuth;
