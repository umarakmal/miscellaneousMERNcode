let Doc = require("../models/doc");

let express = require("express"),
  multer = require("multer"),
  mongoose = require("mongoose"),
  { v4: uuidv4 } = require("uuid");
router = express.Router();

const DIR = "./public/";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4() + "-" + fileName);
  },
});
var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "text/csv") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .csv format allowed!"));
    }
  },
});

router.post("/user-profile", upload.single("csvfile"), (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const doc = new Doc({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    csvfile: url + "/public/" + req.file.filename,
  });
  doc
    .save()
    .then((result) => {
      res.status(201).json({
        message: "file uploaded successfully!",
        docCreated: {
          _id: result._id,
          csvfile: result.csvfile,
        },
      });
    })
    .catch((err) => {
      console.log(err),
        res.status(500).json({
          error: err,
        });
    });
});
router.get("/", (req, res, next) => {
  Doc.find().then((data) => {
    res.status(200).json({
      message: "User list retrieved successfully!",
      docs: data,
    });
  });
});
module.exports = router;
