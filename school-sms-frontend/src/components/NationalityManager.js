import React, { useState, useEffect } from 'react';
import apiClient from '../api/api'; // Import client đã cấu hình

const NationalityManager = () => {
  const [nationalities, setNationalities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- Logic Fetch Data ---
  const fetchNationalities = async () => {
    setLoading(true);
    setError(null);
    try {
      // Gọi API GET /api/v1/nationalities
      const response = await apiClient.get('/nationalities');
      setNationalities(response.data);
    } catch (err) {
      console.error("Lỗi khi tải quốc tịch:", err.response || err);
      // Hiển thị lỗi nếu không kết nối được với backend
      setError("LỖI KẾT NỐI: Không thể tải dữ liệu. Vui lòng kiểm tra xem server FastAPI có đang chạy trên http://localhost:8000 hay không.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNationalities();
  }, []);

  // --- Giao diện ---
  return (
    <div style={{ padding: '20px' }}>
      <h2>Demo: Quản lý Quốc tịch</h2>
      
      <button onClick={fetchNationalities} disabled={loading}>
        {loading ? 'Đang tải...' : 'Tải lại Dữ liệu'}
      </button>

      {error && <p style={{ color: 'red', marginTop: '15px' }}>{error}</p>}
      {loading && !error && <p>Đang tải danh sách quốc tịch...</p>}
      
      {!loading && !error && (
        <>
          <p>Tìm thấy **{nationalities.length}** mục.</p>
          <table style={tableStyle}>
            <thead>
              <tr style={{ backgroundColor: '#f0f0f0' }}>
                <th style={cellStyle}>ID</th>
                <th style={cellStyle}>Dạng Nam tính</th>
                <th style={cellStyle}>Dạng Nữ tính</th>
              </tr>
            </thead>
            <tbody>
              {nationalities.map((item) => (
                <tr key={item.id}>
                  <td style={cellStyle}>{item.id}</td>
                  <td style={cellStyle}>{item.masculine_form}</td>
                  <td style={cellStyle}>{item.feminine_form}</td>
                </tr>
              ))}
              {nationalities.length === 0 && (
                  <tr><td colSpan="3" style={{ textAlign: 'center', padding: '10px' }}>Database chưa có dữ liệu. Hãy thêm một mục qua Swagger UI hoặc form POST.</td></tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

const tableStyle = { width: '100%', borderCollapse: 'collapse', marginTop: '15px' };
const cellStyle = { border: '1px solid #ddd', padding: '8px', textAlign: 'left' };

export default NationalityManager;