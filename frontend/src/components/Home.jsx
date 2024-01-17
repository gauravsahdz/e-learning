import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Homepage.css";
import CourseCard from "./CourseCard";
import { connect } from "react-redux";
import { getCourses } from "../store/actions/coursesAction";

class HomePage extends React.Component {
  componentDidMount() {
    this.props.getCourses();
  }
  render() {
    const { courses, loading } = this.props.courses;

    return (
      <div className="home-page-container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1>Learn Anywhere, Anytime</h1>
            <p>
              Unlock your potential with our diverse range of online courses.
            </p>
            <Link to="/courses" className="explore-button">
              Explore Courses
            </Link>
          </div>
        </section>

        {/* Featured Courses Section */}
        <section className="featured-courses">
          <h2>Featured Courses</h2>
          <div className="course-list">
            <div className="course-list">
              {loading ? (
                <div>Loading...</div>
              ) : (
                <>
                  {courses?.slice(0, 3).map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </>
              )}
            </div>
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section className="cta-section">
          <h2>Ready to Start Learning?</h2>
          <p>Join thousands of learners on our platform today.</p>
          <Link to="/login" className="get-started-button">
            Get Started
          </Link>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ courses: state.courses });

export default connect(mapStateToProps, { getCourses })(HomePage);
