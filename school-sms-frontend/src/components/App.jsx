// App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import Dashboard from './Dashboard';
import StudentsPage from './StudentsPage';
import TeachersPage from './TeachersPage';
import ClassesPage from './ClassesPage';
import SemestersPage from './SemestersPage';
import '../style/Dashboard.css';

// Các trang Placeholder đơn giản
const SubjectsPage = () => (
  <div className="dashboard-content">
    <h2>Subjects Management</h2>
    <p>Content for managing subjects will go here.</p>
  </div>
);

const SettingsPage = () => (
  <div className="dashboard-content">
    <h2>Settings</h2>
    <p>Content for system settings will go here.</p>
  </div>
);

const App = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <TopBar userName="Admin" />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/teachers" element={<TeachersPage />} />
          <Route path="/classes" element={<ClassesPage />} />
          <Route path="/subjects" element={<SubjectsPage />} />
          <Route path="/semesters" element={<SemestersPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          {/* Route cho 404 Not Found */}
          <Route
            path="*"
            element={
              <div className="dashboard-content">
                <h2>404 Not Found</h2>
                <p>The page you are looking for does not exist.</p>
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
