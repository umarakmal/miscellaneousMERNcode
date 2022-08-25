const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const citySchema = new Schema(
  {
    // _id: mongoose.Schema.Types.ObjectId,
    city: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("City", citySchema);
