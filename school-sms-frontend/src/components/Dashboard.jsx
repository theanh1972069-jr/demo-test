// Dashboard.jsx
import { useState, useEffect } from 'react';
import OverviewCard from './OverviewCard';
import DetailCard from './DetailCard';
import { fetchDashboardData } from '../api/mockApi'; 

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Thực hiện gọi API thực tế đến FastAPI backend tại đây
    // Ví dụ: axios.get('/api/v1/dashboard/summary')
    fetchDashboardData().then(res => {
      setData(res);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="dashboard-content">Loading...</div>;
  }

  return (
    <section className="dashboard-content">
      <h2>Dashboard Overview</h2>

      {/* -------------------- Overview Cards -------------------- */}
      <div className="overview-cards">
        <OverviewCard
          title="Total Students"
          value={data.totalStudents}
          iconClass="fas fa-graduation-cap"
          bgColorClass="bg-teal"
        />
        <OverviewCard
          title="Total Grades"
          value={data.totalGrades}
          iconClass="fas fa-school"
          bgColorClass="bg-yellow"
        />
        <OverviewCard
          title="Active School Year"
          value={data.activeSchoolYear}
          iconClass="fas fa-calendar-check"
          bgColorClass="bg-red"
        />
      </div>

      {/* -------------------- Registration Details Section -------------------- */}
      <h3>Registration Details</h3>
      <div className="leave-details-cards">
        <DetailCard
          title="Registrations Applied"
          value={data.registrationsApplied}
          iconClass="fas fa-file-alt"
          bgColorClass="bg-green-light"
        />
        <DetailCard
          title="Registrations Completed"
          value={data.registrationsCompleted}
          iconClass="fas fa-check-circle"
          bgColorClass="bg-green"
        />
        <DetailCard
          title="Registrations Pending"
          value={data.registrationsPending}
          iconClass="fas fa-hourglass-half"
          bgColorClass="bg-yellow-light"
        />
        <DetailCard
          title="Registrations Rejected"
          value={data.registrationsRejected}
          iconClass="fas fa-times-circle"
          bgColorClass="bg-red-light"
        />
      </div>
    </section>
  );
};

export default Dashboard;