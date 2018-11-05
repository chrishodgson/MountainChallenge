//const _ = require("lodash");
//const Path = require("path-parser").default;
const { URL } = require("url");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const Survey = mongoose.model("challenges");

module.exports = app => {
  app.get("/api/challenges", requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false
    });

    res.send(surveys);
  });

  app.post("/api/challenges", requireLogin, async (req, res) => {
    res.send({});
  });
};
