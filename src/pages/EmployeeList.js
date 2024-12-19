import React, { useState, useEffect } from "react";

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("https://emp-backend-3jkq.onrender.com/");
            const data = await res.json();
            setEmployees(data);
        };
        fetchData();
    }, []);
    const filteredEmployees = employees.filter((emp) =>
        emp.name.toLowerCase().includes(search.toLowerCase()) ||
        emp.department.toLowerCase().includes(search.toLowerCase()) ||
        emp.employee_id.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <h1>Employee List</h1>
            <input
                type="text"
                placeholder="Search by Name, Department or ID"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <table>
                <thead>
                    <tr>

                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Department</th>
                        <th>Date of Joining</th>
                        <th>Role</th>
                        <th>Age</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEmployees.map((emp) => (
                        <tr key={emp.id}>
                            <td>{emp.name}</td>
                            <td>{emp.email}</td>
                            <td>{emp.phone}</td>
                            <td>{emp.department}</td>
                            <td>{emp.date_of_joining}</td>
                            <td>{emp.role}</td>
                            <td>{emp.age}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;
