const mongoose = require("mongoose");
const { Schema } = mongoose;

const activityMountainSchema = new Schema({
  name: String,
  lat: Number,
  lng: Number,
  height: Number,
  ascentOrder: Number,
  _mountain: { type: Schema.Types.ObjectId, ref: "Mountain" }
});

module.exports = activityMountainSchema;
