const Blog = require("../models/blog");



exports.blogById = (req, res, next, id) => {
  const postID = req.params.blogid;
  Blog.findById(postID).exec((err, post) => {
    if (err || !post) {
      return res.status(400).json({
        error: "post not found",
      });
    }
    req.profile = post;
    next();
  });
};


exports.getBlogPosts = (req, res) => {
  Blog.find().exec((err, posts) => {
    if (err) {
      return res.status(400).json("Opps something went wrong");
    } else {
      return res.status(200).json(posts);
    }
  });
};

exports.getSingleBlogPost = (req, res) => {
  const postID = req.profile._id;
  Blog.findById(postID).exec((err, posts) => {
    if (err) {
      return res.status(400).json("Opps something went wrong");
    } else {
      return res.status(200).json(posts);
    }
  });
};

// search blogs by tags
exports.getBlogsByTag = (req, res) => {
  var regexp = new RegExp("^"+ req.body.tags);
    Blog.find({tags: regexp}).exec((err, posts) => {
      if (err) {
        return res.status(400).json("Opps something went wrong");
      } else {
        if(!posts.length) {
          return res.status(200).json("Sorry no posts");
        } else {
          return res.status(200).json(posts);
        }
      }
    });
  };
  
