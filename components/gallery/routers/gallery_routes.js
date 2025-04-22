const express = require("express");
const router = express.Router();

const verifyToken = require("../../../middleware/verify_token");
const checkRole = require("../../../middleware/check_role");

const { addNewGalleryItem, upload } = require("../controllers/add_gallery_item");
const listAllItems = require("../controllers/all_gallery_items");

router.post("/", upload.single("photo"), addNewGalleryItem);

router.get("/", listAllItems);

// router.get("/:id", getSingleCEOMessage);

// router.put("/:id", verifyToken, checkRole("admin", "editor"), upload.single("photo"), updateCEOMessage);

// router.delete("/:id", verifyToken, checkRole("admin", "editor"), deleteCEOMessage);

module.exports = router;
