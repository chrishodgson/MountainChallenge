const mongoose = require("mongoose");
const { Schema } = mongoose;

const mountainItemSchema = new Schema({
  name: String,
  easting: Number,
  northing: Number,
  gridRef: String,
  height: Number,
  order: Number,
  _mountain: { type: Schema.Types.ObjectId, ref: "Mountain" }
});

module.exports = mountainItemSchema;
