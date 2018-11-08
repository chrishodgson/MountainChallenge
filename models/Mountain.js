const mongoose = require("mongoose");
const { Schema } = mongoose;
const MountainClassificationSchema = require("./MountainClassificationSchema");

const mountainSchema = new Schema({
  name: String,
  lat: Number,
  lng: Number,
  height: Number,
  classifications: [MountainClassificationSchema],
  classificationCount: Number
});

module.exports = mountainSchema;
