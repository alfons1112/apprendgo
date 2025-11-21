import React from 'react';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
  onClick: (course: Course) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onClick }) => {
  return (
    <div 
      onClick={() => onClick(course)}
      className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-literature-accent/30 transition-all duration-300 cursor-pointer group overflow-hidden"
    >
      <div className="h-3 bg-literature-accent w-full"></div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <span className="inline-block px-2 py-1 text-xs font-semibold tracking-wide text-literature-accent bg-orange-50 rounded-full border border-orange-100">
            {course.category}
          </span>
          <span className="text-xs text-gray-400 font-medium">{course.year}</span>
        </div>
        <h3 className="text-xl font-serif font-bold text-gray-900 mb-2 group-hover:text-literature-accent transition-colors">
          {course.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
          {course.description}
        </p>
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center text-sm text-literature-dark font-medium group-hover:translate-x-1 transition-transform">
          Accéder au cours 
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;