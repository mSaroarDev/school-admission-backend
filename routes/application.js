const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/checkAuth");

const {
  createApplication,
  getApplicationDetails,
  markSubmitted,
  getApplications,
  deleteApplication,
  previewApplication,
  getApplicationDetailsByTrackingID,
} = require("../controllers/application");

// api's
router.post("/create", createApplication);
router.get("/get-applications", checkAuth, getApplications);
router.get("/get-app/:id", getApplicationDetails);
router.get("/get-app-by-tracking/:tId", getApplicationDetailsByTrackingID);
router.post("/preview/:id", checkAuth, previewApplication);
router.post("/mark-submitted/:id", markSubmitted);
router.delete("/delete/:id", checkAuth, deleteApplication);

module.exports = router;
