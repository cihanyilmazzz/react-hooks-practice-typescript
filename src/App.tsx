import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CourseList from './components/CourseList';
import CourseDetail from './components/CourseDetail';
import { Course } from './types';
import './App.css';

const App: React.FC = () => {
  // State to store the courses data
  const [courses, setCourses] = useState<Course[]>([]);
  // State to store the search term
  const [searchTerm, setSearchTerm] = useState('');

  // Effect to load courses data when the component mounts
  useEffect(() => {
    const loadCourses = async () => {
      try {
        const coursesModule = await import('./data/courses.json');
        setCourses(coursesModule.default as Course[]);
      } catch (error) {
        console.error('Error loading courses:', error);
      }
    };

    loadCourses();
  }, []);

  // Filter courses based on the search term
  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Router>
      <div className="App">
        <h1>Online Course Catalogue</h1>
        {/* Search input field */}
        <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        {/* Routes for navigation */}
        <Routes>
          {/* Home route showing the list of courses */}
          <Route path="/" element={<CourseList courses={filteredCourses} />} />
          {/* Course detail route */}
          <Route path="/course/:id" element={<CourseDetail courses={courses} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;