const orderController = require("../Controllers/orderController");
const routes = {
  orderRoute: (app) => {
    app.get("/api/v1/create_order/:id", orderController.createOrder);
  },
};

module.exports = routes;
