const _ = require("lodash");
const keys = require("./config/keys");
const mongoose = require("mongoose");
const args = require("minimist")(process.argv.slice(2));
const csv = require("csvtojson");

require("./models/Mountain");

const Mountain = mongoose.model("mountains");

mongoose.connect(
  keys.mongoURI,
  { useNewUrlParser: true }
);

const csvFilePath = args["filename"] || null;

let count = 0;

const getJson = async () => {
  //"/(Number|Name|Metres|Feet|Section|Area|Grid ref 10|Classification)/"
  const jsonArray = await csv().fromFile(csvFilePath);
  _.each(jsonArray, item => {
    const classifications = item["Classification"].split(",");
    if (classifications.includes("W")) {
      handleItem(item);
    }
  });
  // todo get this working
  // console.log("Mountains imported: " + count);
};

const handleItem = async item => {
  //todo a quicker find ??
  const existingMountain = await Mountain.find({ dobihId: item.Number });

  if (!existingMountain.length) {
    const mountain = new Mountain({
      dobihId: item["Number"],
      name: item["Name"],
      lat: item["Latitude"],
      lng: item["Longitude"],
      metres: item["Metres"],
      feet: item["Feet"],
      section: item["Section"], //34A
      area: item["Area"], //Lake District - Northern Fells
      gridRef: item["Grid ref 10"]
    });

    try{
      await mountain.save();
      console.log('Imported ' + item.Number + " // " + item.Name);
      count++;
    } catch(e) {
      console.log(e, 'save error');
    }
  } else {
    console.log('Exists ' + item.Number + " // " + item.Name);
  }
};

getJson();
