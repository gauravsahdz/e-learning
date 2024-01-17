const Course = require("../models/courseModel");
const Users = require("../models/userModel");

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({
      status: "success",
      results: courses.length,
      courses,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    res.status(200).json({
      status: "success",
      course,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.enrollCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const user = await Users.findOne({ email: req.user.email });
    console.log(user);
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        status: "fail",
        message: "Course not found.",
      });
    }

    const isStudentEnrolled = course.students.some(
      (student) => student.email === user.email
    );

    if (user.enrolledCourses.includes(courseId) || isStudentEnrolled) {
      return res.status(400).json({
        status: "fail",
        message: "You have already enrolled in this course.",
      });
    }

    course.students.push({
      name: user.name,
      email: user.email,
    });

    user.enrolledCourses.push(courseId);

    await course.save();
    await user.save();

    res.status(200).json({
      status: "success",
      message: "You have successfully enrolled in this course.",
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Internal server error.",
    });
  }
};

exports.getMyCourses = async (req, res) => {
  try {
    console.log(req.user);
    const user = await Users.findOne({ email: req.user.email });
    const coursesIds = user.enrolledCourses.map((course) => course._id);
    const courses = await Course.aggregate([
      {
        $match: {
          _id: {
            $in: coursesIds,
          },
        },
      },
      {
        $addFields: {
          __order: { $indexOfArray: [coursesIds, "$_id"] },
        },
      },
      {
        $sort: {
          __order: 1,
        },
      },
    ]);

    // Add progress to courses array
    courses.forEach((course) => {
      const enrolledCourse = user.enrolledCourses.find(
        (enrolledCourse) =>
          enrolledCourse._id.toString() === course._id.toString()
      );
      if (enrolledCourse) {
        course.progress = enrolledCourse.progress;
      }
    });

    res.status(200).json({
      status: "success",
      results: courses.length,
      courses,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Internal server error.",
    });
  }
};

exports.markCourseAsCompleted = async (req, res) => {
  //update the progress of the course in the user.enrolledCourses array as 100
  const courseId = req.params.id;
  const user = await Users.findOne({ email: req.user.email });
  const course = await Course.findById(courseId);
  const enrolledCourse = user.enrolledCourses.find(
    (enrolledCourse) => enrolledCourse._id.toString() === course._id.toString()
  );

  if (!enrolledCourse) {
    return res.status(400).json({
      status: "fail",
      message: "You are not enrolled in this course.",
    });
  }

  enrolledCourse.progress = 100;

  await user.save();

  res.status(200).json({
    status: "success",
    message: "Course marked as completed.",
    user,
  });
};

exports.searchCourses = async (req, res) => {
  try {
    console.log(req.query.q);
    const courses = await Course.find({
      $or: [
        { name: { $regex: req.query.q, $options: "i" } },
        { instructor: { $regex: req.query.q, $options: "i" } },
      ],
    });
    res.status(200).json({
      status: "success",
      results: courses.length,
      courses,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
