const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  id: {
    type: String,
    required: true,
    min: 9,
    max: 12,
  },
  password: {
    type: String,
    required: true,
  },
});

studentSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { name: this.name, id: this.id },
    config.get("jwtPrivateKey")
  );
  return token;
};
studentSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(this.password, salt);
  this.password = password;
});
module.exports = mongoose.model("Student", studentSchema);
