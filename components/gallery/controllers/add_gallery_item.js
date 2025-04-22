const Gallery = require("../models/gallery_model");
const galleryValidator = require("../helper/gallery_validator");
const multer = require("multer");
const { storage } = require("../../../config/cloudinary");
const upload = multer({ storage });

const addNewGalleryItem = async (req, res) => {
  try {
    const { error, value } = galleryValidator.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Photo is required." });
    }
    const photo = req.file?.path || "";

    const response = new Gallery({
      ...value,
      photo,
    });

    await response.save();

    return res.status(201).json({
      message: "Gallery created successfully.",
      response,
    });
  } catch (error) {
    console.error("Create CEO Message Error:", error);
    return res
      .status(500)
      .json({ message: "Server error while creating Gallery message" });
  }
};

module.exports = { addNewGalleryItem, upload };
