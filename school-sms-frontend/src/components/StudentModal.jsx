import React, { useState } from 'react';
import '../style/StudentModal.css';

const StudentModal = ({ isOpen, onClose, onSubmit, isSubmitting = false, submitError = null }) => {
  const [formData, setFormData] = useState({
    fullname: '',
    firstname: '',
    gender: '1',
    date_of_birth: '',
    phone: '',
    guardian: '',
    guardian_phone: '',
    admission_date: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      image: e.target.files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Student</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="1">Male</option>
                <option value="0">Female</option>
              </select>
            </div>

            <div className="form-group">
              <label>Guardian</label>
              <input
                type="text"
                name="guardian"
                value={formData.guardian}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Guardian Phone</label>
              <input
                type="text"
                name="guardian_phone"
                value={formData.guardian_phone}
                onChange={handleChange}
              />
            </div>

          <div className="form-group">
              <label>Admission Date</label>
              <input
                type="date"
                name="admission_date"
                value={formData.admission_date}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Upload Image</label>
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel-btn" disabled={isSubmitting}>Cancel</button>
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Add Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentModal;