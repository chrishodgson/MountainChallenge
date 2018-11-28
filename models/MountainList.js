const mongoose = require("mongoose");
const { Schema } = mongoose;

const mountainListSchema = new Schema({
  name: String,
  description: String,
  countryCodes: [String],
  classificationCode: String,
  highestMountain: Number,
  mountainCount: Number
});

mongoose.model("mountainLists", mountainListSchema);
