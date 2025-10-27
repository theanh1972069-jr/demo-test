// Sidebar.jsx
import React from 'react';

const navItems = [
  { name: 'Dashboard', icon: 'fas fa-tachometer-alt', active: true, link: '#' },
  { name: 'Students', icon: 'fas fa-graduation-cap', active: false, link: '/students' },
  { name: 'Grades', icon: 'fas fa-school', active: false, link: '/grades' },
  { name: 'Subjects', icon: 'fas fa-book', active: false, link: '/subjects' },
  { name: 'School Years', icon: 'fas fa-calendar-alt', active: false, link: '/school-years' },
  // Thêm các chức năng khác theo mô hình API của bạn
  { name: 'Settings', icon: 'fas fa-cog', active: false, link: '/settings' },
];

const Sidebar = () => (
  <aside className="sidebar">
    <header className="sidebar-header">
      <h1 className="logo">SMS API</h1>
    </header>
    <nav className="sidebar-nav">
      <ul>
        {navItems.map((item) => (
          <li key={item.name} className={item.active ? 'active' : ''}>
            <a href={item.link}>
              <i className={item.icon}></i> {item.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  </aside>
);

export default Sidebar;