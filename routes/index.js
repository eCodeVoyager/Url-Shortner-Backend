var express = require("express");
var router = express.Router();
const {
  shorten,
  redirector,
  getShortUrl,
} = require("../controllers/shortnerController");
const logMiddleware = require("../middlewares/logMiddleware");
const asyncHandler = require("../utils/asyncHandler");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("Welcome to URL Shortner API");

});

router.post("/shorten", shorten);

router.get("/:shortUrl", logMiddleware, redirector);

router.get("/shorted/:shortUrl", getShortUrl);

module.exports = router;
