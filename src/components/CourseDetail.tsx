import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Course, Module, Lesson, Content } from '../types';

// Props interface for CourseDetail component
interface CourseDetailProps {
  courses: Course[];
}

const CourseDetail: React.FC<CourseDetailProps> = ({ courses }) => {
  // Get the course id from the URL parameters
  const { id } = useParams<{ id: string }>();
  // State to keep track of the selected module and lesson
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);

  // Find the course with the matching id
  const course = courses.find((c) => c.id === Number(id));

  if (!course) {
    return <div>Course not found</div>;
  }

  // Function to render different types of content
  const renderContent = (content: Content) => {
    switch (content.type) {
      case 'text':
        return <p>{content.data}</p>;
      case 'video':
        return <video src={content.data} controls />;
      case 'audio':
      case 'podcast':
        return <audio src={content.data} controls />;
      default:
        return null;
    }
  };

  // Function to render a lesson
  const renderLesson = (lesson: Lesson) => (
    <div className="lesson">
      <h4>{lesson.title}</h4>
      <p>{lesson.description}</p>
      <ul>
        {lesson.topics.map((topic, index) => (
          <li key={index}>{topic}</li>
        ))}
      </ul>
      {/* Render each content item in the lesson */}
      {lesson.content.map((content, index) => (
        <div key={index}>{renderContent(content)}</div>
      ))}
    </div>
  );

  return (
    <div className="course-detail">
      {/* Back button to return to the course list */}
      <Link to="/" className="back-btn">
        Back to Courses
      </Link>
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      <div className="modules">
        {/* Render each module in the course */}
        {course.modules.map((module: Module, moduleIndex: number) => (
          <div key={moduleIndex} className="module">
            {/* Module title (clickable to expand/collapse) */}

            <h3
              onClick={() =>
                setSelectedModule(
                  moduleIndex === selectedModule ? null : moduleIndex
                )
              }
            >
              {module.title}
            </h3>

            {/* Render lessons if the module is selected */}
            {selectedModule === moduleIndex && (
              <div className="lessons">
                {module.lessons.map((lesson: Lesson, lessonIndex: number) => (
                  <div key={lessonIndex}>
                    {/* Lesson title (clickable to expand/collapse) */}
                    <a href="#">
                      <h4
                        onClick={() =>
                          setSelectedLesson(
                            lessonIndex === selectedLesson ? null : lessonIndex
                          )
                        }
                      >
                        {lesson.title}
                      </h4>
                    </a>

                    {/* Render lesson content if the lesson is selected */}
                    {selectedLesson === lessonIndex && renderLesson(lesson)}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseDetail;
