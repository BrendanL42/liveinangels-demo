const express = require("express");
const router = express.Router();

const {
  getBlogPosts,
  blogById,
  getSingleBlogPost,
  getBlogsByTag,
} = require("../controllers/blog");

router.get("/blogs", getBlogPosts);
router.get("/blogs/:blogid", getSingleBlogPost);
router.post("/blogs/tags", getBlogsByTag);

// any route containing :userId, our app will first execute userByID()
router.param("blogid", blogById);

module.exports = router;
