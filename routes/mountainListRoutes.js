const { URL } = require("url");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const MountainList = mongoose.model("mountainLists");

module.exports = app => {
  app.get("/api/mountainLists", requireLogin, async (req, res) => {
    const MountainLists = await MountainList.find();
    res.send(MountainLists);
  });
};
