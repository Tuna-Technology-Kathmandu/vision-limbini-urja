const Gallery = require("../models/gallery_model");

const listAllGalleryItems = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const sortOrder = req.query.sort === "asc" ? 1 : -1;

    const search = req.query.search || "";
    const position = req.query.position || "";

    const searchQuery = {
      ...(search && { name: { $regex: search, $options: "i" } }),
      ...(position && { position: { $regex: position, $options: "i" } }),
    };

    const messages = await Gallery.find(searchQuery)
      .sort({ createdAt: sortOrder })
      .skip(skip)
      .limit(limit)
      .lean();

    const totalMessages = await Gallery.countDocuments(searchQuery);

    return res.status(200).json({
      message: "Gallery messages fetched successfully",
      messages,
      pagination: {
        currentPage: page,
        totalMessages,
        totalPages: Math.ceil(totalMessages / limit),
        messagesPerPage: limit,
      },
    });
  } catch (error) {
    console.error("List Gallery Messages Error:", error);
    return res
      .status(500)
      .json({ message: "Server error while fetching Gallery messages" });
  }
};

module.exports = listAllGalleryItems;
