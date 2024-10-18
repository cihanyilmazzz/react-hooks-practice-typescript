import React from 'react';
import { Link } from 'react-router-dom';
import { Course } from '../types';

// Props interface for CourseList component
interface CourseListProps {
  courses: Course[];
}

const CourseList: React.FC<CourseListProps> = ({ courses }) => {
  return (
    <div className="course-list">
      {/* Map through the courses and render each course */}
      {courses.map((course) => (
        <div key={course.id} className="course-item">
          <h2>{course.title}</h2>
          <p>{course.description}</p>
          {/* Link to the course detail page */}
          <Link to={`/course/${course.id}`} className="view-course-btn">View Course</Link>
        </div>
      ))}
    </div>
  );
};

export default CourseList;