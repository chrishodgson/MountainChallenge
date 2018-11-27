const mongoose = require("mongoose");
const { Schema } = mongoose;

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
  _mountainLists: [{ type: Schema.Types.ObjectId, ref: "MountainList" }],
});

mongoose.model("mountains", mountainSchema);
