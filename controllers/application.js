const applicationoModel = require("../model/application");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connectDB = require("../db/connectDB");
const generateUnique8DigitNumber = require("../helpers/uniqueNumber");

// create application
const createApplication = async (req, res) => {
  const body = req.body;
  const {
    first_name,
    last_name,
    father_name,
    mother_name,
    dob,
    religion,
    blood_group,
    gender,
    st_nid,
    st_nationality,
    f_nid,
    f_nationality,
    m_nid,
    m_nationality,
    road1,
    post1,
    sub_dist1,
    dist1,
    zip1,
    road2,
    post2,
    sub_dist2,
    dist2,
    zip2,
    mobile,
    email,
    alt_mobile,
    classe,
    section,
    group,
    image,
    sign,
  } = body;

  try {
    await connectDB();

    // initialize body
    const newData = new applicationoModel({
      tracking_id: generateUnique8DigitNumber().toString(),
      first_name,
      last_name,
      personal_info: {
        father_name,
        mother_name,
        dob,
        religion,
        blood_group,
        gender,
      },
      citizen_info: {
        st_nid,
        st_nationality,
        f_nid,
        f_nationality,
        m_nid,
        m_nationality,
      },
      address_info: {
        present_address: {
          road1,
          post1,
          sub_dist1,
          dist1,
          zip1,
        },
        permanent_address: {
          road2,
          post2,
          sub_dist2,
          dist2,
          zip2,
        },
      },
      contact_info: {
        mobile,
        email,
        alt_mobile,
      },
      admission_info: {
        classe,
        section,
        group,
      },
      media: {
        image,
        sign,
      },
    });

    const data = await newData.save();

    return res.status(200).json({ msg: "success", data });
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json({ msg: "error", data: "Internal Server Error" });
  }
};

// get application details
const getApplicationDetails = async (req, res) => {
  const applicationId = req.params.id;

  try {
    await connectDB();

    const data = await applicationoModel.findOne({ _id: applicationId });

    res.status(200).json({ msg: "success", data });
  } catch (error) {
    res.status(500).json({ msg: "error" });
  }
};

// make draft to submitted
const markSubmitted = async (req, res) => {
  const applicationId = req.params.id;

  try {
    await connectDB();

    const data = await applicationoModel.findByIdAndUpdate(
      { _id: applicationId },
      {
        $set: {
          currStatus: "Submitted",
        },
      }
    );

    res.status(200).json({ msg: "success", data });
  } catch (error) {
    res.status(500).json({ msg: "error" });
  }
};

// get application details
const getApplications = async (req, res) => {
  try {
    await connectDB();

    const data = await applicationoModel.find().sort({ _id: -1 });

    res.status(200).json({ msg: "success", data });
  } catch (error) {
    res.status(500).json({ msg: "error" });
  }
};

// delete a application
const deleteApplication = async (req, res) => {
  const appId = req.params.id;

  try {
    await connectDB();

    const data = await applicationoModel.findByIdAndDelete({ _id: appId });

    res.status(200).json({ msg: "success", data });
  } catch (error) {
    res.status(500).json({ msg: "error" });
  }
};

// preview a application
const previewApplication = async (req, res) => {
  const appId = req.params.id;
  const { currStatus } = req.body;

  try {
    await connectDB();

    const data = await applicationoModel.findByIdAndUpdate(
      { _id: appId },
      {
        $set: {
          currStatus,
        },
      }
    );

    res.status(200).json({ msg: "success", data });
  } catch (error) {
    res.status(500).json({ msg: "error" });
  }
};

// get application details by tracking
const getApplicationDetailsByTrackingID = async (req, res) => {
  const trackingId = req.params.tId;

  try {
    await connectDB();

    const data = await applicationoModel.findOne({ tracking_id: trackingId });

    if (!data) {
      return res.status(404).json({ msg: "not found" });
    }

    res.status(200).json({ msg: "success", data });
  } catch (error) {
    console.log(error);

    res.status(500).json({ msg: "error" });
  }
};

module.exports = {
  createApplication,
  getApplicationDetails,
  markSubmitted,
  getApplications,
  deleteApplication,
  previewApplication,
  getApplicationDetailsByTrackingID,
};
