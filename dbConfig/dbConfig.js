const mongoose = require("mongoose");
const dbConnect = {
  connect: () => {
    mongoose
      .connect(process.env.DATABASE_URL)
      .then((response) => {
        console.log("database connected");
      })
      .catch((err) => {
        console.log("database failed to connect", err);
      });
  },
};

module.exports = dbConnect;
