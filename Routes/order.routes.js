const orderController = require("../Controllers/orderController");
const routes = {
  orderRoute: (app) => {
    app.get("/api/v1/create_order/:id", orderController.createOrder);
    app.post("/api/v1/verify_payment", orderController.verifyPayment);
  },
};

module.exports = routes;
