const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    order_id: { type: String, index: true },
    payment_id: { type: String, index: true },
    amount: { type: Number },
    customer_name: { type: String },
    customer_email: { type: String, index: true },
    order_status: {
      type: String,
      enum: [
        "order_payment_status_pending",
        "order_payment_status_success",
        "order_payment_status_failed",
        "order_payment_status_cancel",
      ],
      default: "order_payment_status_pending",
    },
    payment_response: { type: Object },
  },
  { timestamps: true }
);

const Order = mongoose.model("Orders", OrderSchema);

module.exports = Order;
