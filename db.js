const mongoose = require("mongoose");
const config = require("config");

module.exports = async () => {
  try {
    await mongoose.connect(config.get("db"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to Mongodb");
  } catch (error) {
    throw new Error(error.message);
  }
};
