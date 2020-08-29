const express = require("express");
const router = express.Router();
const Joi = require("joi");
const bcrypt = require("bcrypt");
const Student = require("../models/Student");
const api = require("../api");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.send(error.message);
  }
  const { id, password } = req.body;
  const student = await Student.findOne({ id: id });
  if (student) {
    const validatePass = await bcrypt.compare(password, student.password);
    if (!validatePass) res.status(400).send("Invalid email or password.");
    const token = student.generateAuthToken();
    res.send(token);
  } else {
    await api.login({ idUser: id, passwordUser: password });
    const isLogin = await api.isAuthenticated;
    if (!isLogin) {
      res.send("Invalid email or password.");
    }
    const newStudent = new Student(api.user);
    const token = newStudent.generateAuthToken();
    await newStudent.save();
    res.send(token);
  }
});

const validate = (user) => {
  const schema = Joi.object({
    id: Joi.string().required(),
    password: Joi.string().required(),
  });
  return schema.validate(user);
};
module.exports = router;
