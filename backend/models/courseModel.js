const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  instructor: { type: String, required: true },
  description: { type: String, required: true },
  enrollmentStatus: { type: String, enum: ["Open", "Closed", "In Progress"], default: "Open" },
  thumbnail: { type: String },
  duration: { type: String },
  schedule: { type: String },
  location: { type: String },
  prerequisites: { type: [String] },
  syllabus: [
    {
      week: { type: Number, required: true },
      topic: { type: String, required: true },
      content: { type: String, required: true },
    },
  ],
  students: [
    {
      name: { type: String },
      email: { type: String },
    },
  ],
});

const Course = mongoose.model("Courses", courseSchema);

module.exports = Course;
