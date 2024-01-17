import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/CourseDetail.css";
import { connect } from "react-redux";
import { getCourse, enrollCourse } from "../store/actions/coursesAction";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class CourseDetail extends React.Component {
  componentDidMount() {
    const { id } = this.props.params;
    this.props.getCourse(id);
  }

  render() {
    const { course, loading } = this.props.course;

    const syllabusArray = course.syllabus;

    const enroll = async () => {
      try {
        const { id } = this.props.params;
        console.log(id);
        await this.props.enrollCourse(id);
        const { message } = this.props.enrollment.enrollment;
        alert(message);
      } catch (error) {
        alert(error);
      }
    };

    if (!course) {
      return <div>Loading...</div>;
    }

    return (
      <div className="course-detail-container">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className="thumbnail">
              <img src={course.thumbnail} alt={course.courseName} />
              <button className="enroll-button" onClick={enroll}>
                Enroll
              </button>
            </div>
            <div className="course-details">
              <h1>{course.courseName}</h1>
              <p>
                <strong>Instructor:</strong> {course.instructor}
              </p>
              <p>
                <strong>Description:</strong> {course.description}
              </p>
              <p>
                <strong>Enrollment Status:</strong> {course.enrollmentStatus}
              </p>
              <p>
                <strong>Course Duration:</strong> {course.duration}
              </p>
              <p>
                <strong>Schedule:</strong> {course.schedule}
              </p>
              <p>
                <strong>Location:</strong> {course.location}
              </p>
              <p>
                <strong>Pre-requisites:</strong>{" "}
                {course.prerequisites.map((item) => (
                  <li>{item}</li>
                ))}
              </p>
            </div>

            <details>
              <summary>
                <strong>Syllabus</strong>
              </summary>
              <ul>
                {syllabusArray?.map((item, index) => (
                  <li key={index}>
                    <p>Week: {item.week}</p>
                    <strong>Topic: {item.topic}</strong>
                    <p>Content: {item.content}</p>
                  </li>
                ))}
              </ul>
            </details>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  course: state.course,
  user: state.user,
  enrollment: state.enrollment,
});

export default withParams(
  connect(mapStateToProps, { getCourse, enrollCourse })(CourseDetail)
);
