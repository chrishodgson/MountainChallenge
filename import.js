const _ = require("lodash");
const keys = require("./config/keys");
const mongoose = require("mongoose");
const args = require("minimist")(process.argv.slice(2));
const csv = require("csvtojson");
require("./models/Mountain");

mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true }
);

const Mountain = mongoose.model("mountains");
const csvFilePath = args["filename"] || null;
const reportItems = args["report"] || false;
const columns = /(Number|Name|Metres|Feet|Area|Grid ref 10|Classification|Parent (Ma)|Map 1:25k|Country|County)/;

let existingCount = 0,
  createdCount = 0;

const parseFile = async () => {
  const jsonArray = await csv({ includeColumns: columns }).fromFile(
    csvFilePath
  );
  for (const item of jsonArray) {
    const classifications = item["Classification"].split(",");
    if (classifications.includes("W")) {
      await handleItem(item);
    }
  }
  console.log(
    "Created " +
      createdCount +
      " mountains, " +
      existingCount +
      " already exist."
  );
};

const handleItem = async item => {
  const countDocuments = await Mountain.countDocuments({
    dobihId: item.Number
  });

  if (countDocuments > 0) {
    existingCount++;
    if (reportItems) {
      console.log("Exists " + item.Number + " // " + item.Name);
    }
  } else {
    try {
      mountain = hydrateMountain(item);
      await mountain.save();
      createdCount++;
      if (reportItems) {
        console.log("Imported " + item.Number + " // " + item.Name);
      }
    } catch (e) {
      console.log(e, "on save error");
    }
  }
};

const hydrateMountain = item => {
  return new Mountain({
    dobihId: item["Number"],
    name: item["Name"],
    lat: item["Latitude"],
    lng: item["Longitude"],
    metres: item["Metres"],
    feet: item["Feet"],
    area: item["Area"], //ie Lake District - Northern Fells
    gridRef: item["Grid ref 10"]
  });
};

parseFile();
