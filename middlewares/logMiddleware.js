const asyncHandler = require("../utils/asyncHandler");
const apiError = require("../utils/apiError");
const shortner = require("../models/shortnerModel");

const logMiddleware = asyncHandler(async (req, res, next) => {
  const { shortUrl } = req.params;
  let i = 1;
  const countClicks = await shortner.updateOne(
    { short_url: `${process.env.SERVER_URI}/${shortUrl}` },
    { $inc: { clicks: i++ }, $set: { last_clicked_at: new Date() } }
  );
  if (!countClicks) {
    throw new apiError(500, "Error saving  counts to database");
  }
  

  next();
});

module.exports = logMiddleware;
