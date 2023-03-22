const mongoose = require("mongoose");
const orderSchema = mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  orderId: { type: String, required: true },
  orderStatus: { type: String, default: "placed" },
});
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
