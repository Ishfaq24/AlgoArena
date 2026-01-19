const mongoose = require("mongoose");

const usageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  date: {
    type: String // YYYY-MM-DD
  },
  totalTime: {
    type: Number,
    default: 0 // seconds
  },
  pageWiseTime: {
    type: Map,
    of: Number,
    default: {}
  }
});

module.exports = mongoose.model("Usage", usageSchema);
