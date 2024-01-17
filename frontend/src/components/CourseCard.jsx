import React from "react";
import "../styles/Course.css";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const goto = () => {
    navigate(`/courses/${course._id}`);
  };
  return (
    <div className="course-card" onClick={goto}>
      <img src={course.thumbnail} alt={course.title} />
      <div className="card-content">
        <h3>{course.name}</h3>
        <span>{course.instructor}</span>
      </div>
    </div>
  );
};

export default CourseCard;
