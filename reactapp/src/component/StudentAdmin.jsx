import React, { useState } from "react";

function StudentAdmin() {
  const [studentData, setStudentData] = useState([]);

  async function showData(e) {
    e.preventDefault();
    const sid = e.target.sid.value;

    if (sid == "*") {
      const response = await fetch("http://localhost:3008/admin/show");
      const res = await response.json();
      console.log(res.msg);
      setStudentData(res.msg);
    } else {
      const response = await fetch(
       ` http://localhost:3008/admin/showByEmailid/${sid}`
      );
      const res = await response.json();
      console.log(res.msg);
      setStudentData(Array.isArray(res.msg) ? res.msg : [res.msg]);
    }
  }

  async function deleteStudent(email) {
    console.log(email);
    
    const response = await fetch(
      `http://localhost:3008/admin/deleteByEmailid/${email}`,
      { method: "DELETE" }
    );
    const res = await response.json();
    alert(res.msg); 
    
  }

  function updateStudent(email) {
    alert(email);
  }

  return (
    <div>
      <div
        style={{
          backgroundColor: "brown",
          color: "white",
          fontSize: "28px",
          fontWeight: "700",
          fontFamily: "Verdana",
          marginBottom: "20px",
          padding: "10px",
        }}
      >
        Student Admin
      </div>
      <form onSubmit={showData}>
        <div>
          <input type="text" name="sid" placeholder="Enter Student ID" />
        </div>
        <div style={{ marginTop: "5px" }}>
          <button>Search</button>
        </div>
      </form>
      <div>
        {studentData && studentData.length > 0 ? (
          <table
            style={{
              border: "1px solid black",
              borderCollapse: "collapse",
              width: "100%",
            }}
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid black", padding: "8px" }}>
                  Name
                </th>
                <th style={{ border: "1px solid black", padding: "8px" }}>
                  Email
                </th>
              </tr>
            </thead>
            <tbody>
              {studentData.map((student, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {student.name}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {student.email}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    <button onClick={() => deleteStudent(student.email)}>
                      Delete
                    </button>
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    <button onClick={() => updateStudent(student.email)}>Update</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h2>No Student Available</h2>
        )}
      </div>
    </div>
  );
}

export default StudentAdmin;