import React, { useState, useEffect } from "react";
import "../styles/StudentDashboard.css";
import { getMe, getMyCourses } from "../store/actions/usersAction";
import { markComplete } from "../store/actions/coursesAction";
import { connect } from "react-redux";

class StudentDashboard extends React.Component {
  componentDidMount() {
    this.props.getMe();
    this.props.getMyCourses();
  }

  render() {
    const { user, loading } = this.props.user.res;
    const { courses } = this.props.user.myCourses;

    const handleMarkAsCompleted = async (courseId) => {
      try {
        await this.props.markComplete(courseId);
        const { message } = this.props.marking.marking;
        alert(message);
        this.props.getMyCourses();
      } catch (error) {
        console.error("Error marking course as completed:", error);
      }
    };

    return (
      <div className="home-student-dashboard-container">
        <h1>
          Welcome,
          {loading ? <div>Loading...</div> : <>{user?.name}!</>}
        </h1>
        <h2>My Enrolled Courses</h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            {courses?.length === 0 ? (
              <p>No courses enrolled yet.</p>
            ) : (
              <ul className="home-course-list">
                {courses?.map((course) => (
                  <li key={course._id} className="home-course-item">
                    <img
                      src={course.thumbnail}
                      alt={course.name}
                      className="home-course-thumbnail"
                    />
                    <div className="home-course-details">
                      <h3>{course.name}</h3>
                      <p>Instructor: {course.instructor}</p>
                      <p>Due Date: {course.duration}</p>
                      <div
                        className="home-progress-bar"
                        style={{ width: `${course.progress}%` }}
                      >
                        {course.progress}%
                      </div>
                      <button
                        className="home-mark-complete-button"
                        onClick={() => handleMarkAsCompleted(course._id)}
                      >
                        Mark as Completed
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  marking: state.marking,
});
export default connect(mapStateToProps, { getMe, getMyCourses, markComplete })(
  StudentDashboard
);
