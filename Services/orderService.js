const Razorpay = require("razorpay");
const Order = require("../models/Order");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto");
const orderService = {
  orderCreationService: async (response, cb) => {
    const instance = new Razorpay({
      key_id: process.env.razorpay_key_id,
      key_secret: process.env.razor_pay_secret,
    });
    try {
      const orderId = uuidv4();
      const responseData = await instance.orders.create({
        amount: parseInt(response.price * 100),
        currency: "INR",
        receipt: orderId,
        payment_capture: true,
      });
      console.log(responseData);
      const order = new Order({
        order_id: orderId,
        payment_id: responseData.id,
        amount: response.price,
      });
      order
        .save()
        .then((response) => {
          cb(null, responseData);
        })
        .catch((err) => {
          cb(err, null);
        });
    } catch (err) {
      console.log(err);
    }
  },
  verifyPaymentService: (headers, requestBody, cb) => {
    const razorPaySignature = headers["x-razorpay-signature"];
    console.log("signature", razorPaySignature);
    const generatedSignature = crypto.createHmac(
      "sha256",
      proces.env.process.env.razor_pay_secret
    );
    generatedSignature.update(
      requestBody.payload.payment.entity.order_id +
        "|" +
        requestBody.payload.payment.entity.id
    );
    if (generated_signature.digest("hex") === razorPaySignature) {
      console.log("Inside razorPaySignature");
      Order.findOneAndUpdate(
        { payment_id: requestBody.payload.payment.entity.order_id },
        {
          order_status: "order_payment_status_success",
          payment_response: requestBody.payload,
        },
        { new: true },
        (err, response) => {
          if (err) {
            cb(err, null);
          } else {
            console.log("In success response", response);
            cb(null, response);
          }
        }
      );
    }
  },
};

module.exports = orderService;
