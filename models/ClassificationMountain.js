const mongoose = require("mongoose");
const { Schema } = mongoose;

const classificationMountainSchema = new Schema({
  name: String,
  lat: Number,
  lng: Number,
  height: Number,
  _mountain: { type: Schema.Types.ObjectId, ref: "Mountain" }
});

module.exports = classificationMountainSchema;
