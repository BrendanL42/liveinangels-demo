const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const blogPostSchema = new mongoose.Schema({
    
  title: {
    type: String,
    trim: true,
  },
  tags: [],
  
  body: {
    type: String,
  },
  postedBy: {
    type: ObjectId,
    ref: "Admin",
  },

  coverPhotoUrl: {
    type: String,
  },

  created: {
    type: Date,
    default: Date.now,
  },
  updated: Date,
});

module.exports = mongoose.model("BlogPost", blogPostSchema);
