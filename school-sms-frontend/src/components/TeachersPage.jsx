import React, { useEffect, useState } from 'react';
import apiClient from '../api/api';
import '../style/TeachersPage.css';

const TeachersPage = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiClient.get('/teachers/');
      
      if (!response.data) {
        throw new Error('Không có dữ liệu từ server');
      }

      console.log('API Response:', response.data);
      setTeachers(response.data);
      
    } catch (err) {
      console.error("Chi tiết lỗi:", {
        message: err.response?.data?.detail || err.message,
        status: err.response?.status
      });
      setError("Không thể tải danh sách giảng viên");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  return (
    <div className="dashboard-content">
      <div className="header-wrapper">
      <div className="title-section">
        <h1 className="centered-title">Information Teachers</h1>
      </div>
      <div className="controls-section">
        <input
          type="text"
          placeholder="Search By Teacher ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button className="add-button">Add New Teacher</button>
      </div>
    </div>

      {loading && <div>Loading...</div>}
      {error && <div className="error-message">{error}</div>}

      {!loading && !error && teachers.length > 0 && (
        <table className="teachers-table">
          <thead>
            <tr>
              <th>S No</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher, index) => (
              <tr key={teacher.id}>
                <td>{index + 1}</td>
                <td>
                  <img 
                    src={teacher.image || '/default-avatar.png'} 
                    alt={teacher.fullname}
                    className="teacher-image"
                  />
                </td>
                <td>{teacher.fullname}</td>
                <td>{teacher.email}</td>
                <td>{teacher.phone}</td>
                <td>
                  <div className="action-buttons">
                    <button className="view-btn">View</button>
                    <button className="edit-btn">Edit</button>
                    <button className="salary-btn">Salary</button>
                    <button className="leave-btn">Leave</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TeachersPage;