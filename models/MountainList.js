const mongoose = require("mongoose");
const { Schema } = mongoose;
const MountainListMountain = require("./MountainListMountain");

const mountainListSchema = new Schema({
  countryCode: String,
  name: String,
  description: String,
  highestMountain: Number,
  mountainCount: Number,
  mountains: [MountainListMountain],
});

mongoose.model("mountainListSchema", mountainListSchema);
