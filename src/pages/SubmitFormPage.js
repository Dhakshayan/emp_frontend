import React, { useState } from "react";
import { Link } from "react-router-dom";

const AddEmployee = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        department: "",
        date_of_joining: "",
        role: "",
        age: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: name === "age" ? Number(value) : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        if (!form.name || !form.email || !form.phone || !form.department || !form.date_of_joining || !form.role || !form.age) {
            setMessage("All fields are required.");
            return;
        }
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(form.phone)) {
            setMessage("Phone number must be a 10-digit number.");
            return;
        }
        if (form.age < 18) {
            setMessage("Age must be 18 or above.");
            return;
        }
        const today = new Date().toISOString().split("T")[0];
        if (form.date_of_joining > today) {
            setMessage("Date of joining cannot be in the future.");
            return;
        }

        try {
            const res = await fetch("http://localhost:5000/employees", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || "Failed to submit form");
            }

            setMessage("Employee added successfully!");

            setForm({
                name: "",
                email: "",
                phone: "",
                department: "",
                date_of_joining: "",
                role: "",
                age: ""
            });
        } catch (err) {
            setMessage(err.message || "Submission Failed!");
        }
    };

    const maxDate = new Date().toISOString().split("T")[0];

    return (
        <div style={{ width: "300px", margin: "auto", textAlign: "center" }}>
            <h1>Add Employee</h1>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Name"
                    style={{ padding: "8px" }}
                />
                <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    style={{ padding: "8px" }}
                />
                <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    style={{ padding: "8px" }}
                />
                <input
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                    placeholder="Department"
                    style={{ padding: "8px" }}
                />
                <input
                    name="date_of_joining"
                    value={form.date_of_joining}
                    onChange={handleChange}
                    type="date"
                    max={maxDate}
                    style={{ padding: "8px" }}
                />
                <input
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    placeholder="Role"
                    style={{ padding: "8px" }}
                />
                <input
                    name="age"
                    value={form.age}
                    onChange={handleChange}
                    placeholder="Age"
                    type="number"
                    style={{ padding: "8px" }}
                />
                <button type="submit" style={{ padding: "10px", backgroundColor: "#4CAF50", color: "white", border: "none", cursor: "pointer" }}>
                    Submit
                </button>
                <button
                    type="reset"
                    onClick={() =>
                        setForm({
                            name: "",
                            email: "",
                            phone: "",
                            department: "",
                            date_of_joining: "",
                            role: "",
                            age: ""
                        })
                    }
                    style={{ padding: "10px", backgroundColor: "#f44336", color: "white", border: "none", cursor: "pointer" }}
                >
                    Reset
                </button>
            </form>
            {message && <p style={{ color:"red", marginTop:"10px" }}>{message}</p>}
            <Link to="/employees">
                <button style={{ marginTop:"10px", padding: "10px", backgroundColor:"#008CBA", color: "white", border: "none", cursor: "pointer" }}>
                    View Employees
                </button>
            </Link>
        </div>
    );
};

export default AddEmployee;
