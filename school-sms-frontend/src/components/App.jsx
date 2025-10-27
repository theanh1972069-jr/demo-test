// App.jsx
import React from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import Dashboard from './Dashboard';
import '../style/Dashboard.css';

const App = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <TopBar userName="Admin" /> 
        <Dashboard />
      </main>
    </div>
  );
};

export default App;