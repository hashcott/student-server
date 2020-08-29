const express = require("express");
const router = express.Router();
const Joi = require("joi");
const bcrypt = require("bcrypt");
const Student = require("../models/Student");
const TimeTable = require("../models/TimeTable");

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
    const timeTable = await TimeTable.findOne({ student: student._id });
    await api.login({ idUser: id, passwordUser: password });
    const term = await api.studyRegister();
    if (timeTable.term != term) {
      timeTable.term = term;
      timeTable.timeTable = api.timeLineByDay;
      timeTable.save();
    }
    const token = student.generateAuthToken();
    res.send(token);
  } else {
    await api.login({ idUser: id, passwordUser: password });
    const isLogin = await api.isAuthenticated;
    if (!isLogin) {
      res.status(400).send("Invalid email or password.");
    }
    const newStudent = new Student(api.user);
    const token = newStudent.generateAuthToken();
    await newStudent.save();
    const term = await api.studyRegister();
    let timeTable = api.timeLineByDay;
    const newTimeTable = new TimeTable({
      term,
      timeTable,
      student: newStudent._id,
    });
    await newTimeTable.save();
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
