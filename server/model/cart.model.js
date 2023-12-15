const mongoose = require("mongoose");
const cartProductsSchema = mongoose.Schema(
  {
    userID: String,
    batteryID: { type: mongoose.Schema.Types.ObjectId, ref: "battery" },
    qty: Number,
  },
  {
    versionKey: false,
  }
);

const CartProductsModel = mongoose.model("cartProducts", cartProductsSchema);

module.exports = { CartProductsModel };
