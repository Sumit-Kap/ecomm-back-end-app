const Razorpay = require("razorpay");
const Order = require("../models/Order");
const { v4: uuidv4 } = require("uuid");
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
};

module.exports = orderService;
