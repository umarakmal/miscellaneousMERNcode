const fs = require("fs");
const multer = require("multer");
const express = require("express");

const csv = require("csvtojson");

const app = express();

global.__basedir = __dirname;

// -> Multer Upload Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// -> Express Upload RestAPIs
app.post("/api/uploadfile", upload.single("uploadfile"), (req, res) => {
  importCsvData2MongoDB(__basedir + "/uploads/" + req.file.filename);
  res.json({
    msg: "File uploaded/import successfully!",
    file: req.file,
  });
});

// -> Import CSV File to MongoDB database
function importCsvData2MongoDB(filePath) {
  csv()
    .fromFile(filePath)
    .then((jsonObj) => {
      console.log(jsonObj);

      Sheets.insertMany(jsonObj, (err, res) => {
        if (err) throw err;
        console.log("Number of documents inserted: " + res.insertedCount);
        /**
                       Number of documents inserted: 5
                   */
        Sheets.close();
      });
    });

  fs.unlinkSync(filePath);
}
