const mongoose = require("mongoose");
const { Schema } = mongoose;

const areaSchema = new Schema({
  countryCode: String,
  title: String
  //mountainCount: Number
});

mongoose.model("areaSchema", areaSchema);
