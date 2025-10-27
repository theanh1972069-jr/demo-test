// Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import Link và useLocation

const navItems = [
  { name: 'Dashboard', icon: 'fas fa-tachometer-alt', link: '/' },
  { name: 'Students', icon: 'fas fa-graduation-cap', link: '/students' },
  { name: 'Teachers', icon: 'fas fa-chalkboard-teacher', link: '/teachers' }, // Thêm Teachers
  { name: 'Classes/Grades', icon: 'fas fa-school', link: '/classes' }, // Đổi tên Grades
  { name: 'Subjects', icon: 'fas fa-book', link: '/subjects' },
  { name: 'School Years/Semesters', icon: 'fas fa-calendar-alt', link: '/semesters' }, // Đổi tên School Years
  // Sử dụng NationalityManager.js làm demo quản lý dữ liệu API
  { name: 'Nationalities (Demo)', icon: 'fas fa-globe-americas', link: '/nationalities' }, 
  { name: 'Settings', icon: 'fas fa-cog', link: '/settings' },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <header className="sidebar-header">
        <h1 className="logo">SMS API</h1>
      </header>
      <nav className="sidebar-nav">
        <ul>
          {navItems.map((item) => (
            // Dùng location.pathname để kiểm tra và áp dụng class 'active'
            <li key={item.name} className={location.pathname === item.link || (item.link === '/' && location.pathname === '/dashboard') ? 'active' : ''}>
              <Link to={item.link}>
                <i className={item.icon}></i> {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;