const jwt = require("jsonwebtoken");
const Users = require("../models/User");
const util = {
  getAuthId: (req, res, next) => {
    console.log("in util");
    const authToken = req.headers["authorization"];
    const userId = jwt.verify(authToken, process.env.secret);
    const id = userId.id;
    const response = Users.findById({ _id: id });
    // console.log("returned ", userId);
    if (response) {
      next();
    } else {
      res
        .status(401)
        .json({ message: "user unauthenticated", statusCode: 401 });
    }
  },
  catchAsync: (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next),
};

module.exports = util;
