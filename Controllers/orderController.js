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
};

module.exports = orderController;
