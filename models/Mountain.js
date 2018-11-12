const mongoose = require("mongoose");
const { Schema } = mongoose;
const MountainClassificationSchema = require("./MountainClassificationSchema");

const mountainSchema = new Schema({
  dobihId: Number,
  name: String,
  lat: Number,
  lng: Number,
  metres: Number,
  feet: Number,
  gridRef: String,
  countryCode: String
});

module.exports = mountainSchema;
