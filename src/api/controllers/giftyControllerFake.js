const logger = require("../../logger.js");

exports.addGift = async function(req, res) {
  logger.info("Add Gift");
  logger.debug("");
  res.status(200);
};

exports.getGift = async function(req, res) {};
