import React, { useState, useEffect } from "react";

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]); 
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("http://localhost:5000/");
                if (!res.ok) throw new Error("Failed to fetch employees");
                const data = await res.json();
                setEmployees(data || []);
            } catch (error) {
                console.error("Error fetching data:", error);
                setEmployees([]);
            }
        };
        fetchData();
    }, []);


    const filteredEmployees = employees.filter((emp) => {
        const name = emp.name || "";
        const department = emp.department || "";
        const employeeId = emp.employee_id || "";
        return (
            name.toLowerCase().includes(search.toLowerCase()) ||
            department.toLowerCase().includes(search.toLowerCase()) ||
            employeeId.toLowerCase().includes(search.toLowerCase())
        );
    });

    return (
        <div style={{ padding: "20px" }}>
            <h1>Employee List</h1>
            <input
                type="text"
                placeholder="Search by name, department, or ID"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                    marginBottom: "20px",
                    padding: "10px",
                    fontSize: "16px",
                    width: "300px",
                }}
            />
            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginTop: "20px",
                }}
            >
                <thead>
                    <tr>
                        <th style={tableHeaderStyle}>Name</th>
                        <th style={tableHeaderStyle}>Email</th>
                        <th style={tableHeaderStyle}>Phone</th>
                        <th style={tableHeaderStyle}>Department</th>
                        <th style={tableHeaderStyle}>Date of Joining</th>
                        <th style={tableHeaderStyle}>Role</th>
                        <th style={tableHeaderStyle}>Age</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEmployees.length > 0 ? (
                        filteredEmployees.map((emp) => (
                            <tr key={emp.id}>
                                <td style={tableCellStyle}>{emp.name || "N/A"}</td>
                                <td style={tableCellStyle}>{emp.email || "N/A"}</td>
                                <td style={tableCellStyle}>{emp.phone || "N/A"}</td>
                                <td style={tableCellStyle}>{emp.department || "N/A"}</td>
                                <td style={tableCellStyle}>{emp.date_of_joining || "N/A"}</td>
                                <td style={tableCellStyle}>{emp.role || "N/A"}</td>
                                <td style={tableCellStyle}>{emp.age || "N/A"}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" style={noDataStyle}>
                                No employees found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
const tableHeaderStyle = {
    backgroundColor: "#f4f4f4",
    padding: "10px",
    textAlign: "left",
    borderBottom: "2px solid #ddd",
    fontWeight: "bold",
};

const tableCellStyle = {
    padding: "10px",
    textAlign: "left",
    borderBottom: "1px solid #ddd",
};

const noDataStyle = {
    padding: "20px",
    textAlign: "center",
    fontStyle: "italic",
    color: "#999",
};

export default EmployeeList;
