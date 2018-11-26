/**
 * import mountains from CSV
 * node import.js --filename=absoluteFilePath.csv --report --save --country=E
 * switches: --save to save rows that don't already exist
 *           --report to report which rows exist and which do not
 *           --classification classification to import
 *           --country country to import
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
const country = args["country"] || false;
const classification = args["classification"] || false;
const saveItems = args["save"] || false;
const columns = /(Number|Name|Metres|Feet|Area|Grid ref 10|Classification|Parent (Ma)|Map 1:25k|Country|County)/;

let existingCount = 0,
  createdCount = 0,
  areas = [];

const parseFile = async () => {
  const jsonArray = await csv({ includeColumns: columns }).fromFile(
    csvFilePath
  );
  for (const item of jsonArray) {
    //import  by classification
    const classificationList = item["Classification"].split(",");
    if (classification && classificationList.includes(classification)) {
      await handleItem(item);
    }

    //import by country
    if (country && country === item["Country"]) {
      await handleItem(item);
    }
  }

  if (saveItems && areas.length > 0) {
    //todo save areas to db
    console.log(areas, "areas");
  }

  console.log(
    saveItems
      ? createdCount + " mountains created."
      : createdCount + " mountains not found in database (not created)."
  );
  console.log(existingCount + " mountains already exist in database.");
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
      createdCount++;

      // add to list of areas
      if (item["Area"] && areas.indexOf(item["Area"]) == -1) {
        areas.push(item["Area"]);
      }

      if (saveItems) {
        mountain = hydrateMountain(item);
        await mountain.save();
      }
      if (reportItems) {
        console.log("Not Exists " + item.Number + " // " + item.Name);
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
