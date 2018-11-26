const mongoose = require("mongoose");
const { Schema } = mongoose;
const ClassificationMountainSchema = require("./ClassificationMountainSchema");

// ie wainwrights, munroes
const classificationSchema = new Schema({
  name: String,
  code: String,
  countryCode: String,
  mountains: [ClassificationMountainSchema],
  mountainCount: Number
});

module.exports = classificationSchema;
