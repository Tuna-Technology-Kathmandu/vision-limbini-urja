const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    altText: {
      type: String,
      required: false,
    },
    photo: {
      type: String,
      required: [true, "Photo is required"],
      trim: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gallery", gallerySchema);
