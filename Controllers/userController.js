const userService = require("../Services/userService");
const jwt = require("jsonwebtoken");
const userController = {
  postUsers: (req, res) => {
    const {
      email_id,
      first_name,
      last_name,
      phone_number,
      password,
    } = req.body;
    // console.log(req.params, req.body, req.query);
    if (!email_id) {
      res.status(400).json({
        status: 400,
        message: "email not defined",
      });
    } else if (!(first_name && last_name)) {
      res.status(400).json({
        status: 400,
        message: "name not defined",
      });
    } else if (!phone_number) {
      res.status(400).json({
        status: 400,
        message: "phone_number not defined",
      });
    } else if (!password) {
      res.status(400).json({
        status: 400,
        message: "password not defined",
      });
    }
    userService.postUserService(req.body, (err, response) => {
      if (err) {
        res.status(500).json({
          message: "something went wrong",
        });
      } else {
        res.status(200).json({
          data: response,
        });
      }
    });
  },
  getUsers: (req, res) => {
    userService.getUsersService((err, response) => {
      if (err) {
        res.status(500).json({ message: "Something went wrong" });
      } else {
        // res.redirect("http://amazon.in")
        res.status(200).json({ data: response });
      }
    });
  },
  updateUserById: (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    userService.updateUserService(id, name, (err, response) => {
      if (err) {
        res.status(500).json({ message: "Something went wrong" });
      } else {
        res.status(200).json({ data: response });
      }
    });
  },
  deleteUserById: (req, res) => {
    const { id } = req.params;
    userService.deleteUser(id, (err, response) => {
      if (err) {
        res.status(500).json({ message: "Something went wrong" });
      } else {
        res.status(200).json({ message: "user got deleted" });
      }
    });
  },
  authenticateUser: (req, res) => {
    const { email_id, password } = req.body;
    console.log(req.body);
    userService.authenticateUserService(email_id, password, (err, response) => {
      if (err) {
        res.status(err.statusCode).json({ message: err.msg });
      } else {
        // res.redirect("http://localhost:3000/");
        const authToken = jwt.sign({ id: response._id }, process.env.secret, {
          expiresIn: "20 days",
        });
        console.log("authToken", authToken);
        res.status(200).json({ message: "user matched", token: authToken });
      }
    });
  },
};

module.exports = userController;
