const express = require("express");
const router = express.Router();

const courseController = require("../controllers/courseController");
const { verifyToken } = require("../middleware/authToken");

// search course by req.query
router.route("/search").get(courseController.searchCourses);

router.route("/").get(courseController.getAllCourses);
router.route("/my-courses").get(verifyToken, courseController.getMyCourses);
router
  .route("/:id")
  .get(courseController.getCourse)
  .post(verifyToken, courseController.enrollCourse)
  .patch(verifyToken, courseController.markCourseAsCompleted);



module.exports = router;
