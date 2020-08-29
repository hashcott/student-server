const express = require("express");
const router = express.Router();
const TimeTable = require("../models/TimeTable");
const Student = require("../models/Student");
const authMiddleware = require("../middlewares/auth");

router.get("/", authMiddleware, async (req, res) => {
  const student = await Student.findOne({ id: req.user.id }).select(
    "-_password"
  );
  const timeTable = await TimeTable.findOne({ student: student._id });
  res.send(timeTable);
});

module.exports = router;
