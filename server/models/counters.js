const mongoose = require("mongoose");


const countersSchema = new mongoose.Schema(
  {
    count: {
      type: Number,
    },
    clientCounter: {
      type: Number,
    },
  },
);


module.exports = mongoose.model("Counters", countersSchema);
