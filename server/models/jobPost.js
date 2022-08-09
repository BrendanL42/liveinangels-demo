const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const jobPostSchema = new mongoose.Schema({
    
  title: {
    type: String,
    trim: true,
  },
  startDate: {
    type: String,
    trim: true,
  },
  region: {
    type: String,
    trim: true,
  },
  role: {
    type: String,
    trim: true,
  },
  body: {
    type: String,
  },
  postedBy: {
    type: ObjectId,
    ref: "Admin",
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: Date,
});

module.exports = mongoose.model("JobPost", jobPostSchema);
