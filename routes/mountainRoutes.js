const { URL } = require("url");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const Mountain = mongoose.model("mountains");

module.exports = app => {
  //get mountains
  app.get("/api/mountains", requireLogin, async (req, res) => {
    const mountains = await Mountain.find();
    res.send(mountains);
  });
};
