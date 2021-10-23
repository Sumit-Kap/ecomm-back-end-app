const userController = require("../Controllers/userController");
const util = require("../utils/util");
const routes = {
  userRoutes: (app) => {
    app.post("/api/v1/postUsers", userController.postUsers);
    app.get(
      "/api/v1/users",
      util.catchAsync(util.getAuthId),
      util.catchAsync(userController.getUsers)
    );
    app.put("/api/v1/user/:id", userController.updateUserById);
    app.delete("/api/v1/deleteUser/:id", userController.deleteUserById);
    app.post("/api/v1/authenticateUser", userController.authenticateUser);
  },
};

module.exports = routes;
