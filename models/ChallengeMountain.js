const mongoose = require("mongoose");
const { Schema } = mongoose;

const challengeMountainSchema = new Schema({
  name: String,
  lat: Number,
  lng: Number,
  height: Number,
  ascentCount: Number,
  ascentOrder: Number,
  _mountain: { type: Schema.Types.ObjectId, ref: "Mountain" }
});

module.exports = challengeMountainSchema;
