import React, { useEffect, useState } from 'react';
import apiClient from '../api/api';
import '../style/StudentsPage.css';
import StudentModal from './StudentModal';

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

const fetchStudents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.get('/students/');
      if (!response.data) throw new Error('Không có dữ liệu từ server');
      console.log('API Response:', response.data);
      setStudents(response.data);
    } catch (err) {
      console.error("Chi tiết lỗi:", {
        message: err.response?.data?.detail || err.message,
        status: err.response?.status
      });
      setError("Không thể tải danh sách sinh viên");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAddStudent = async (formData) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);

      const payload = new FormData();
      payload.append('fullname', formData.fullname || '');
      payload.append('firstname', formData.firstname || '');
      payload.append('gender', formData.gender ?? '1');
      payload.append('date_of_birth', formData.date_of_birth || '');
      payload.append('phone', formData.phone || '');
      payload.append('guardian', formData.guardian || '');
      payload.append('guardian_phone', formData.guardian_phone || '');
      payload.append('admission_date', formData.admission_date || '');

      if (formData.image) {
        payload.append('image', formData.image);
      }

      const resp = await apiClient.post('/students/', payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('Add student response:', resp.status, resp.data);

      // only close modal and refresh if success (2xx)
      if (resp.status >= 200 && resp.status < 300) {
        await fetchStudents();
        setIsModalOpen(false);
      } else {
        setSubmitError('Server trả về lỗi: ' + resp.status);
      }
    } catch (err) {
      console.error('Error adding student:', err);
      // try to show useful message
      const msg = err.response?.data?.detail || err.message || 'Lỗi khi gửi dữ liệu';
      setSubmitError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="dashboard-content">
         <div className="header-wrapper">
      <div className="title-section">
        <h1 className="centered-title">Manage Students</h1>
      </div>
      <div className="controls-section">
        <input
          type="text"
          placeholder="Search By Student ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button 
          className="add-button"
          onClick={() => setIsModalOpen(true)}
          >
            Add New Student
          </button>
      </div>
    </div>

      {loading && <div>Loading...</div>}
      {error && <div className="error-message">{error}</div>}

      {!loading && !error && students.length > 0 && (
        <table className="students-table">
          <thead>
            <tr>
              <th>S No</th>
              <th>Name</th>
              <th>Guardian</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.id}>
                <td>{index + 1}</td>
                <td>{student.fullname}</td>
                <td>{student.guardian}</td>
                <td>{student.phone}</td>
                <td className="actions">
                  <button className="view-btn">View</button>
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <StudentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddStudent}
        isSubmitting={isSubmitting}
        submitError={submitError}
      />
    </div>
  );
};

export default StudentsPage;