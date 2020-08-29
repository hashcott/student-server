const mongoose = require("mongoose");
const timeTableSchema = new mongoose.Schema({
  term: {
    type: String,
    required: true,
  },
  timeTable: {
    type: Object,
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
});

module.exports = mongoose.model("TimeTable", timeTableSchema);
