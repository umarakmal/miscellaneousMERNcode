const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bulkdataSchema = new Schema(
  {
    // _id: mongoose.Schema.Types.ObjectId,
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    interest: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zip: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Bulkdata", bulkdataSchema);
