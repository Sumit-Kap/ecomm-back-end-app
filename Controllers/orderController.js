const axios = require("axios").default;
const orderService = require("../Services/orderService");
const orderController = {
  createOrder: async (req, res, next) => {
    const { id } = req.params;

    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
    console.log(response);
    if (response) {
      orderService.orderCreationService(response.data, (err, response) => {
        if (err) {
          res.status(500).json({ message: "internal server error" });
        } else {
          res.status(200).json({ data: response });
        }
      });
    }
  },
  verifyPayment: (req, res, next) => {
    console.log("print", req.body, req.query, req.params);
    // orderService.verifyPaymentService(
    //   req.headers,
    //   req.body,
    //   (err, response) => {
    //     if (err) {
    //       res.status(500).json({ message: "something went wrong" });
    //     } else {
    //       // res.redirect(
    //       //   "https://ecomm-frontend-app.herokuapp.com/payment/success"
    //       // );
    //       res.status(200).json({ message: ok });
    //     }
    //   }
    // );
    res.redirect("https://ecomm-frontend-app.herokuapp.com/payment/success");
    // res.status(200).json({ message: ok });
  },
};

module.exports = orderController;
