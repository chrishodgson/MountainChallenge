const mongoose = require("mongoose");
const { Schema } = mongoose;

const areaSchema = new Schema({
  countryCode: String,
  name: String
});

mongoose.model("areas", areaSchema);
