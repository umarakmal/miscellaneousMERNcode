const fs = require("fs");
const mongodb = require("mongodb").MongoClient;
const fastcsv = require("fast-csv");
const Bulkdata = require("../models/bulkdata");

let stream = fs.createReadStream("React App (5).csv");
let csvData = [];
exports.bulkcsv = (req, res) => {
  let csvStream = fastcsv
    .parse()
    .on("data", function (data) {
      csvData.push({
        name: data[0],
        email: data[1],
        phone: data[2],
        interest: data[3],
        city: data[4],
        state: data[5],
        zip: data[6],
        address: data[7],
      });
    })
    .on("end", function () {
      // remove the first line: header
      csvData.shift();

      console.log(csvData);

      Bulkdata.insertMany(csvData, (err, res) => {
        if (err) throw err;

        console.log(`Inserted: ${res.insertedCount} rows`);
      });
    });

  stream.pipe(csvStream);
};
