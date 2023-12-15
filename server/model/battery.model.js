const mongoose = require("mongoose");

const batterySchema = new mongoose.Schema(
  {
    weight: { type: String, required: true },
    desc: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    qunty: { type: Number, required: true },
  },
  { versionKey: false }
);

const BatteryModel = mongoose.model("battery", batterySchema);

module.exports = BatteryModel;
