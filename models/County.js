const mongoose = require("mongoose");
const { Schema } = mongoose;

const countySchema = new Schema({
  countryCode: String,
  name: String
});

mongoose.model("counties", countySchema);
