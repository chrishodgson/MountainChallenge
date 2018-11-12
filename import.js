const columns =
  "/(Section/Number|Name|Metres|Feet|Grid ref 10|Country|County|Classification|Area)/";
//Parent (Ma)/Map 1:25k/

const _ = require("lodash");
// const keys = require("./config/keys");
// const mongoose = require("mongoose");
const args = require("minimist")(process.argv.slice(2));
const csvtojson = require("csvtojson");

// require("./models/Challenge");
// mongoose.connect(
//   keys.mongoURI,
//   { useNewUrlParser: true }
// );

const csvFilePath = args["filename"] || null;
csvtojson({
  /*includeColumns: columns*/
})
  .fromFile(csvFilePath)
  .then(jsonObj => {
    console.log(jsonObj);
    const challenge = new Challenge({
      dobihId: jsonObj["Number"],
      name: jsonObj["Number"]
      //lat,
      //lng
    });
  });

// const csvToJson = async () => {
//   const list = [];
//   const result = await csvtojson({}, { includeColumns: columns })
//     .fromFile(filename)
//     .subscribe(item => {
//       const classifications = item["Classification"].split(",");
//       const mountain = new Mountain({
//         name
//       });
//       await mountain.save();
//
//       //&&item.Area == "Lake District - Northern Fells"
//       if (classifications.includes("W")) {
//         list.push(item);
//       }
//     })
//     .on("done", error => {
//       let count = 0;
//       _.each(list, item => {
//         count++;
//         console.log(
//           item.Number +
//             " // " +
//             item.Name +
//             " // " +
//             item.Area +
//             " // " +
//             item.Section
//         );
//       });
//       console.log(count + " results");
//     });
// };
//csvToJson();
