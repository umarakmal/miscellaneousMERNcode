const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const stateSchema = new Schema(
  {
    // _id: mongoose.Schema.Types.ObjectId,
    state: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("State", stateSchema);
