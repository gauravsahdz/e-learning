import React, { Component } from "react";
import CourseCard from "./CourseCard";
import "../styles/Course.css";
import { connect } from "react-redux";
import { getCourses, searchCourse } from "../store/actions/coursesAction";

class Courses extends Component {
  state = {
    search: "",
  };

  componentDidMount() {
    this.props.getCourses();
  }
  render() {
    const { courses, loading } = this.props.courses;

    const handleSearch = async () => {
      const { search } = this.state;
      await this.props.searchCourse(search);
      console.log(this.props.courses);
    };

    return (
      <div className="course-list-page">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search Courses or instructor"
            onChange={(e) => this.setState({ search: e.target.value })}
          />
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>
        <div className="course-list-section">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <>
              {courses?.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ courses: state.courses });

export default connect(mapStateToProps, { getCourses, searchCourse })(Courses);
