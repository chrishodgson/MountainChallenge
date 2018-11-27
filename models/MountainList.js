const mongoose = require("mongoose");
const { Schema } = mongoose;

const mountainListSchema = new Schema({
  countryCode: String,
  title: String,
  description: String,
  highestMountain: Number,
  mountainCount: Number
});

mongoose.model("mountainListSchema", mountainListSchema);
