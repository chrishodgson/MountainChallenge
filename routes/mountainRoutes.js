const { URL } = require("url");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const Mountain = mongoose.model("mountains");

module.exports = app => {
  //search mountains
  app.get("/api/mountains", requireLogin, async (req, res) => {
    const { term, area } = req.query;
    const regex = new RegExp(term, "i");
    const criteria = area ? { name: regex, area: area } : { name: regex };
    const mountains = await Mountain.find(criteria);
    res.send(mountains);
  });
};
