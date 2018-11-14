const { URL } = require("url");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const Mountain = mongoose.model("mountains");

module.exports = app => {
  //search mountains
  app.get("/api/mountains", requireLogin, async (req, res) => {

    console.log(req.body, 'req.body');

    const { term, area } = req.body;
    const criteria = area ? { name: term, area } : { name: /term/i};

    console.log(criteria, 'criteria');

    const mountains = await Mountain.find();

    console.log(mountains, 'mountains');

    res.send(mountains);
  });
};
