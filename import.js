/**
 * import mountains from CSV
 * node import.js --filename=absoluteFilePath.csv --report --save --country=E
 * switches: --save to save rows that don't already exist
 *           --report to report which rows exist and which do not
 *           --classification classification to import
 *           --area area to import
 *           --country country to import
 *           --mountain mountain to import
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
require("./models/MountainList");
require("./models/County");
require("./models/Area");

mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true }
);

const Mountain = mongoose.model("mountains");
const MountainList = mongoose.model("mountainLists");
const Area = mongoose.model("areas");
const County = mongoose.model("counties");

const columns = /(Number|Name|Metres|Feet|Area|Grid ref 10|Classification|Parent (Ma)|Map 1:25k|Country|County)/;

const csvFilePath = args["filename"] || null;
const reportItems = args["report"] || false;
const country = args["country"] || false;
const area = args["area"] || false;
const mountain = args["mountain"] || false;
const mountainPattern = new RegExp(mountain, "i");
const classification = args["classification"] || false;
const saveItems = args["save"] || false;

let existingCount = 0,
  createdCount = 0,
  areaList = [],
  countyList = [];

const parseFile = async () => {
  const jsonArray = await csv({ includeColumns: columns }).fromFile(
    csvFilePath
  );

  for (const item of jsonArray) {
    //import  by classification
    const classificationList = item["Classification"].split(",");
    if (classification && classificationList.includes(classification)) {
      await handleItem(item);
      continue;
    }

    //import by area
    if (area && area === item["Area"]) {
      await handleItem(item);
      continue;
    }

    //import by country
    if (country && country === item["Country"]) {
      await handleItem(item);
      continue;
    }

    //import by mountain name
    if (mountain && mountainPattern.test(item["Name"])) {
      console.log(item);
      await handleItem(item);
      continue;
    }
  }

  console.log(areaList, "areaList");

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
      console.log("Existing " + item.Number + " // " + item.Name);
    }
  } else {
    try {
      createdCount++;
      // add to list of areas
      const string = item["Country"] + "//" + item["Area"];
      if (item["Area"] && areaList.indexOf(string) == -1) {
        areaList.push(string);
      }

      if (saveItems) {
        await saveItem(item);
      }
      if (reportItems) {
        console.log("Not Existing " + item.Number + " // " + item.Name);
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

const hydrateArea = item => {
  return new Area({
    name: item["Area"]
  });
};

const hydrateCounty = item => {
  return new County({
    name: item["County"]
  });
};

const saveItem = async item => {
  const mountain = hydrateMountain(item);
  await mountain.save();

  //area - to do get all then check list
  if(item.Area) {
    const countDocuments = await Area.countDocuments({name: item.Area});
    if(countDocuments == 0) {
      const area = hydrateArea(item);
      await area.save();
    }
  }

  //county - to do get all then check list
  if(item.County) {
    const countDocuments = await County.countDocuments({name: item.County});
    if(countDocuments == 0) {
      const county = hydrateCounty(item);
      await county.save();
    }
  }
};


parseFile();
