const ApiError = require("../utils/apiError");
const Shortner = require("../models/shortnerModel");
const asyncHandler = require("../utils/asyncHandler");
require("dotenv").config();

function generateRandomShortUrl(length = 4) {
  try {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomString = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }
    return randomString;
  } catch (error) {
    return error.message;
  }
}

// Shorten URL
const shorten = asyncHandler(async (req, res) => {
  const { original_url } = req.body;
  if (!original_url) {
    throw new ApiError(400, "Please provide a valid URL");
  }

  const randomSuffix = generateRandomShortUrl();
  if (!randomSuffix) {
    throw new ApiError(500, "Error generating short URL");
  }
  const short_url = `${process.env.SERVER_URI}/${randomSuffix}`;
  if (!short_url) {
    throw new ApiError(500, "Error generating short URL");
  }

  const DBprocess = await Shortner.create({
    original_url,
    short_url,
    last_clicked_at: Date.now(),
  });
  if (!DBprocess) {
    throw new ApiError(500, "Error saving to database");
  }

  res.status(200).json({
    success: true,
    shortURL: short_url,
  });
});
// Redirect to original URL
const redirector = asyncHandler(async (req, res) => {
  try {
    const { shortUrl } = req.params;
    if (!shortUrl) {
      throw new ApiError(400, "Invalid short URL");
    }
    if (shortUrl.length !== 4) {
      throw new ApiError(
        400,
        "Invalid short URL",
        "Short URL Suffix must be 4 characters long"
      );
    }
    const shortner = await Shortner.findOne({
      short_url: `${process.env.SERVER_URI}/${shortUrl}`,
    });

    if (!shortner) {
      throw new ApiError(400, "Invalid short URL");
    }
    res.redirect(shortner.original_url);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
      error: error.errors,
    });
  }
});

//Get  short URL Details
const getShortUrl = asyncHandler(async (req, res) => {
  try {
    const { shortUrl } = req.params;
    const shortUrlDetails = await Shortner.findOne({
      short_url: `${process.env.SERVER_URI}/${shortUrl}`,
    });
    if (!shortUrlDetails) {
      throw new ApiError(500, "Invalid short URL", "Short URL not found");
    }
    console.log(shortUrlDetails);
    res.status(200).json({
      success: true,
      shortUrlDetails,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
      error: error.errors,
    });
  }
});

module.exports = { shorten, redirector, getShortUrl };
