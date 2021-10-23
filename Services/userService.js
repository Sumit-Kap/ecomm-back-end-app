const Users = require("../models/User");
const bcrypt = require("bcrypt");

const userService = {
  postUserService: async (requestBody, cb) => {
    const {
      first_name,
      last_name,
      email_id,
      password,
      phone_number,
    } = requestBody;

    const salt = await bcrypt.genSalt(10);
    const encryptedPwd = await bcrypt.hash(password, salt);
    const user = new Users({
      first_name,
      last_name,
      password: encryptedPwd,
      phone_number,
      email_id,
    });
    user
      .save()
      .then((response) => {
        console.log(response);
        cb(null, response);
      })
      .catch((err) => {
        console.log("data failed", err);
        cb(err, null);
      });
  },
  getUsersService: (cb) => {
    Users.find({}, (err, response) => {
      if (err) {
        cb(err, null);
        return;
      } else {
        cb(null, response);
      }
    });
  },
  updateUserService: (id, userName, cb) => {
    Users.findByIdAndUpdate(
      { _id: id },
      { name: userName },
      { new: true },
      (err, response) => {
        if (err) {
          cb(err, null);
        } else {
          cb(null, response);
        }
      }
    );
  },
  deleteUser: (id, cb) => {
    Users.deleteOne({ _id: id }, (err, response) => {
      if (err) {
        cb(err, null);
      } else {
        cb(null, response);
      }
    });
  },
  authenticateUserService: (email, password, cb) => {
    console.log("print email", email);
    Users.findOne({ email_id: email }, async (err, response) => {
      if (err) {
        cb(err, null);
      } else {
        console.log("print response", response);
        const result = await bcrypt.compare(password, response.password);
        console.log("print result", result);
        if (result) {
          cb(null, response);
        } else {
          cb({ statusCode: 400, msg: "user entered wrong password" }, null);
        }
      }
    });
  },
};

module.exports = userService;
