import React from 'react';
import '../../style/StudentView.css'; // Dùng lại CSS cũ

const ClassView = ({ isOpen, onClose, classItem }) => {
    if (!isOpen || !classItem) return null;

    return (
        <div className="student-view-overlay">
            <div className="student-view-content">
                <h2>Class Information</h2>

                <div className="student-view-grid">
                    <div className="student-view-group">
                        <label>Class ID</label>
                        <span>{classItem.id}</span>
                    </div>

                    <div className="student-view-group">
                        <label>Class Name</label>
                        <span>{classItem.name}</span>
                    </div>
                </div>

                <div className="student-view-actions">
                    <button className="close-btn" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ClassView;
