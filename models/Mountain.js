const mongoose = require("mongoose");
const { Schema } = mongoose;
const MountainMountainList = require("./MountainMountainList");

const mountainSchema = new Schema({
  dobihId: Number,
  name: String,
  lat: Number,
  lng: Number,
  metres: Number,
  feet: Number,
  gridRef: String,
  countryCode: String,
  _county: { type: Schema.Types.ObjectId, ref: "County" },
  _area: { type: Schema.Types.ObjectId, ref: "Area" },
  mountainLists: [MountainMountainList],
});

mongoose.model("mountains", mountainSchema);
