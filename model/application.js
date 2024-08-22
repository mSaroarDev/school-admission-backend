const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    tracking_id: {
      type: String,
      required: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    personal_info: {
      type: Object,
      required: true,
      default: {},
    },
    citizen_info: {
      type: Object,
      required: true,
      default: {},
    },
    address_info: {
      type: Object,
      required: true,
      default: {},
    },
    contact_info: {
      type: Object,
      required: true,
      default: {},
    },
    admission_info: {
      type: Object,
      required: true,
      default: {},
    },
    media: {
      type: Object,
      required: true,
      default: {},
    },
    currStatus: {
      type: String,
      enum: [
        "Draft",
        "Submitted",
        "Waiting",
        "Waiting",
        "Rejected",
        "Approved",
      ],
      default: "Draft",
    },
  },
  {
    timestamps: true,
  }
);

const applicationModel =
  mongoose.models.Application ||
  mongoose.model("Application", applicationSchema);
module.exports = applicationModel;
