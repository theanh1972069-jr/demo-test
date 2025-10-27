// Dashboard.jsx
import { useState, useEffect } from 'react';
import OverviewCard from './OverviewCard';
import DetailCard from './DetailCard';
// import { fetchDashboardData } from '../api/mockApi'; 
import apiClient from '../api/api';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Thực hiện gọi API thực tế đến FastAPI backend tại đây
    // Ví dụ: axios.get('/api/v1/dashboard/summary')
    // fetchDashboardData().then(res => {
    //   setData(res);
    //   setLoading(false);
    // });
    const fetchDashboardData = async () => {
        try {
            // Gọi API Dashboard Summary mới
            const response = await apiClient.get('/dashboard/summary');
            setData(response.data);
            setError(null);
        } catch (err) {
            console.error("Lỗi khi tải dữ liệu Dashboard:", err.response || err);
            // Cập nhật thông báo lỗi rõ ràng cho người dùng
            setError("LỖI KẾT NỐI: Không thể tải dữ liệu Dashboard. Vui lòng kiểm tra server FastAPI.");
        } finally {
            setLoading(false);
        }
    };
    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="dashboard-content">Loading...</div>;
  }

  if (error) {
    return <div className="dashboard-content" style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <section className="dashboard-content">
      <h2>Tổng quan Dashboard</h2>

      {/* -------------------- Overview Cards -------------------- */}
      <div className="overview-cards">
        <OverviewCard
          title="Tổng số Học sinh"
          value={data.totalStudents} // <--- Dữ liệu thực
          iconClass="fas fa-graduation-cap"
          bgColorClass="bg-teal"
        />
        <OverviewCard
          title="Tổng số Lớp"
          value={data.totalGrades} // <--- Dữ liệu thực
          iconClass="fas fa-school"
          bgColorClass="bg-yellow"
        />
        <OverviewCard
          title="Năm học Hiện tại"
          value={data.activeSchoolYear} // <--- Dữ liệu thực
          iconClass="fas fa-calendar-check"
          bgColorClass="bg-red"
        />
      </div>

      {/* -------------------- Registration Details Section -------------------- */}
      <h3>Chi tiết Đăng ký (Dữ liệu giả từ API)</h3>
      <div className="leave-details-cards">
        <DetailCard
          title="Đăng ký Đã nộp"
          value={data.registrationsApplied}
          iconClass="fas fa-file-alt"
          bgColorClass="bg-green-light"
        />
        <DetailCard
          title="Đăng ký Hoàn thành"
          value={data.registrationsCompleted}
          iconClass="fas fa-check-circle"
          bgColorClass="bg-green"
        />
        <DetailCard
          title="Đăng ký Đang chờ"
          value={data.registrationsPending}
          iconClass="fas fa-hourglass-half"
          bgColorClass="bg-yellow-light"
        />
        <DetailCard
          title="Đăng ký Bị từ chối"
          value={data.registrationsRejected}
          iconClass="fas fa-times-circle"
          bgColorClass="bg-red-light"
        />
      </div>
    </section>
  );
};

export default Dashboard;