const express = require("express");
const { addCSV, bulkcsv } = require("../controllers/bulkcsv");
const router = express.Router();
const {
  input,
  getAll,
  postAll,
  getState,
  getCity,
  cityAll,
  stateAll,
  inputAll,
} = require("../controllers/inputform");

router.post("/inputform", input);
router.get("/agent", getAll);
router.post("/postall", postAll);
router.post("/state", getState);
router.post("/city", getCity);
router.post("/bulkcsv", bulkcsv);
// router.post("/inputcsv", inputAll);
// router.get("/getcity", cityAll);
// router.get("/stateall", stateAll);
module.exports = router;
