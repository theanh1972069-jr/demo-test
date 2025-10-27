// mockApi.js
// Giả lập dữ liệu trả về từ FastAPI Backend của bạn
const mockData = {
    totalStudents: 420,
    totalGrades: 12, // Dựa trên file app/models/grade.py
    activeSchoolYear: "2024-2025", // Dựa trên app/crud/crud_school_year.py
    
    // Giả lập các chỉ số về Đăng ký học (Registration)
    registrationsApplied: 50,
    registrationsCompleted: 40,
    registrationsPending: 10,
    registrationsRejected: 0, 
};

// Hàm giả lập fetching data
export const fetchDashboardData = () => {
    return new Promise(resolve => {
        // Mô phỏng độ trễ mạng
        setTimeout(() => {
            resolve(mockData);
        }, 500);
    });
};