/**
 * import mountains from CSV
 * node import.js --filename=absoluteFilePath.csv --report --save
 * switches: --save to save rows that don't already exist
 *           --report to report which rows exist and which do not
 *
 * countries
 * [ 'S', 'ES', 'M', 'W', 'E', 'C', 'I' ]
 *
 * classifications
 * http://www.hills-database.co.uk/database_notes.html#classification
 */

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
const saveItems = args["save"] || false;
const columns = /(Number|Name|Metres|Feet|Area|Grid ref 10|Classification|Parent (Ma)|Map 1:25k|Country|County)/;

const list = [];

let existingCount = 0,
  createdCount = 0;

const parseFile = async () => {
  const jsonArray = await csv({ includeColumns: columns }).fromFile(
    csvFilePath
  );
  for (const item of jsonArray) {
    //restrict by classification
    const classifications = item["Classification"].split(",");
    if (classifications.includes("WO")) {
      await handleItem(item);
    }

    //restrict by country
    if(['C'].indexOf(item["Country"]) !== -1) {
      //await handleItem(item);
    }

    //get a list of areas
    // const string = item["Area"];
    // if (string && list.indexOf(string) == -1) {
    //   list.push(string);
    // }
  }
  console.log(
    saveItems
      ? createdCount + " mountains created."
      : createdCount + " mountains did not exist (not created)."
  );
  console.log(existingCount + " mountains already exist.");
  // console.log(list, "areas");
};

const handleItem = async item => {
  const countDocuments = await Mountain.countDocuments({
    dobihId: item.Number
  });

  if (countDocuments > 0) {
    existingCount++;
    if (reportItems) {
      console.log("Exists " + item.Country + " // " + item.Number + " // " + item.Name);
    }
  } else {
    try {
      createdCount++;
      if (saveItems) {
        mountain = hydrateMountain(item);
        await mountain.save();
      }
      if (reportItems) {
        console.log("Not Exists " + item.Country + " // " + item.Number + " // " + item.Name);
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
