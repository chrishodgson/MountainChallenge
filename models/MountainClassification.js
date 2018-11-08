const mongoose = require("mongoose");
const { Schema } = mongoose;

const mountainClassificationSchema = new Schema({
  name: String,
  countryCode: String,
  _classification: { type: Schema.Types.ObjectId, ref: "Classification" }
});

module.exports = mountainClassificationSchema;
