const mongoose = require("mongoose");
const { Schema } = mongoose;

const challengeMountainSchema = new Schema({
  _mountain: { type: Schema.Types.ObjectId, ref: "Mountain" },
  name: String,
  lat: Number,
  lng: Number,
  height: Number,
  ascentCount: Number,
  ascentOrder: Number
});

module.exports = challengeMountainSchema;
