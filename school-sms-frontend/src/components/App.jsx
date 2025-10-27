// // App.jsx
// import React from 'react';
// import { Routes, Route, Link } from 'react-router-dom';
// // import Sidebar from './Sidebar';
// // import TopBar from './TopBar';
// import Dashboard from './Dashboard';
// import NationalityManager from './NationalityManager';
// import '../style/Dashboard.css';

// const Sidebar = () => (
//     <div className="sidebar" style={{ width: '250px', height: '100vh', background: '#333', color: 'white', padding: '20px', position: 'fixed' }}>
//         <h3 style={{ borderBottom: '1px solid #555', paddingBottom: '10px' }}>SMS Menu</h3>
//         <nav>
//             <Link to="/" style={{ color: 'white', display: 'block', margin: '15px 0', textDecoration: 'none' }}>🏠 Dashboard</Link>
//             <Link to="/nationalities" style={{ color: 'white', display: 'block', margin: '15px 0', textDecoration: 'none' }}>🌍 Quản lý Quốc tịch</Link>
//         </nav>
//     </div>
// );

// const TopBar = ({ userName }) => (
//     <header className="topbar" style={{ padding: '10px', background: '#f4f4f4', color: '#333', borderBottom: '1px solid #ddd' }}>
//         Xin chào, <strong>{userName}</strong>!
//     </header>
// );

// const App = () => {
//   return (
//     <div className="app-container" style={{ display: 'flex' }}>
//       <Sidebar />
//       <main className="main-content" style={{ flexGrow: 1, padding: '0 20px', marginLeft: '250px' }}>
//         <TopBar userName="Admin" /> 
//         {/* Định nghĩa các routes */}
//         <Routes>
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/nationalities" element={<NationalityManager />} />
//           {/* Thêm các routes khác tại đây */}
//         </Routes>
//       </main>
//     </div>
//   );
// };

// export default App;

// App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes và Route
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import Dashboard from './Dashboard';
import StudentsPage from './StudentsPage';
import TeachersPage from './TeachersPage';
import ClassesPage from './ClassesPage';
import SemestersPage from './SemestersPage';
import NationalityManager from './NationalityManager'; // Component demo đã có sẵn
import '../style/Dashboard.css';

// Các trang Placeholder đơn giản
const SubjectsPage = () => <div className="dashboard-content"><h2>Subjects Management</h2><p>Content for managing subjects will go here.</p></div>;
const SettingsPage = () => <div className="dashboard-content"><h2>Settings</h2><p>Content for system settings will go here.</p></div>;


const App = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <TopBar userName="Admin" /> 
        <Routes> {/* Định tuyến các trang */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} /> 
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/teachers" element={<TeachersPage />} />
          <Route path="/classes" element={<ClassesPage />} />
          <Route path="/subjects" element={<SubjectsPage />} />
          <Route path="/semesters" element={<SemestersPage />} />
          <Route path="/nationalities" element={<NationalityManager />} /> {/* Sử dụng component demo hiện có */}
          <Route path="/settings" element={<SettingsPage />} />
          {/* Route cho 404 Not Found */}
          <Route path="*" element={<div className="dashboard-content"><h2>404 Not Found</h2><p>The page you are looking for does not exist.</p></div>} />
        </Routes>
      </main>
    </div>
  );
};

export default App;