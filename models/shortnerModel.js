const mongoose = require("mongoose");

const shortnerSchema = new mongoose.Schema({
  original_url: {
    type: String,
    required: [true, "Please provide a valid URL"],
  },
  short_url: {
    type: String,
    required: [true, "Please provide a valid URL"],
  },
  clicks: {
    type: Number,
    default: 0,
  },
  last_clicked_at: {
    type: Date,
    default: null,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// shortnerSchema.index(
//   { last_clicked_at: 1 },
//   { expireAfterSeconds: 7 * 24 * 60 * 60 } // 7 days
// );

module.exports = mongoose.model("Shortner", shortnerSchema);
