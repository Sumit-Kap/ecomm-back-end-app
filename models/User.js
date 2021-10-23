const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  first_name: { type: String, index: true },
  last_name: { type: String, required: true },
  email_id: { type: String, index: true },
  phone_number: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("Users", UsersSchema);

module.exports = User;
