const { Router } = require("express");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const Student = require("../models/Student");
Router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.send(error.message);
  }
  const { id, password } = req.body;
  const student = await Student.find({ id });
  if (student) {
    const validatePass = await bcrypt.compare(password, student.password);
    if (!validatePass) res.status(400).send("Invalid email or password.");
    const token = student.generateAuthToken();
    res.send(token);
  } else {
    const newStudent = new Student({
      id,
      password,
    });
    await newStudent.save();
  }
});

const validate = (user) => {
  const schema = Joi.object({
    id: Joi.string().required(),
    password: Joi.string().required(),
  });
  return schema.validate(user);
};
module.exports = Router;
