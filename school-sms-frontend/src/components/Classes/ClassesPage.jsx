import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ thêm dòng này
import "../../style/Classes.css"; // dùng chung CSS

const initialClasses = [
  { id: 1, name: "Grade 1" },
  { id: 2, name: "Grade 2" },
  { id: 3, name: "Grade 3" },
  { id: 4, name: "Grade 4" },
];

const ClassesPage = () => {
  const [classesData, setClassesData] = useState(initialClasses);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const filteredClasses = classesData.filter((cls) =>
    cls.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    navigate("/classes/add");
  };

  const handleEdit = (id) => {
    const cls = classesData.find((c) => c.id === id);
    const newName = prompt("Edit class/grade name:", cls.name);
    if (newName) {
      setClassesData(
        classesData.map((c) => (c.id === id ? { ...c, name: newName } : c))
      );
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this class?")) {
      setClassesData(classesData.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h2>Classes/Grades Management</h2>
        <button className="button-teal" onClick={handleAdd}>
          Add New Class
        </button>
      </div>

      <input
        type="text"
        placeholder="Search By Class/Grade"
        className="input-search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>S No</th>
              <th>Class/Grade</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredClasses.map((cls, index) => (
              <tr key={cls.id}>
                <td>{index + 1}</td>
                <td>{cls.name}</td>
                <td style={{ display: "flex", gap: "8px" }}>
                  <button
                    className="button-green"
                    onClick={() => handleEdit(cls.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="button-red"
                    onClick={() => handleDelete(cls.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <div>
          Rows per page:
          <select>
            <option>10</option>
            <option>20</option>
            <option>50</option>
          </select>
        </div>
        <div>
          1-{filteredClasses.length} of {filteredClasses.length}
        </div>
      </div>
    </div>
  );
};

export default ClassesPage;
