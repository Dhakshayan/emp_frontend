import React, { useState } from "react";

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
            [name]: name === "age" ? Number(value) : value, // Convert age to number
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        // Basic validation
        if (!form.name || !form.email || !form.phone || !form.department || !form.date_of_joining || !form.role || !form.age) {
            setMessage("All fields are required.");
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

    return (
        <div>
            <h1>Add Employee</h1>
            <form onSubmit={handleSubmit}>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
                <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />
                <input name="department" value={form.department} onChange={handleChange} placeholder="Department" />
                <input name="date_of_joining" value={form.date_of_joining} onChange={handleChange} type="date" />
                <input name="role" value={form.role} onChange={handleChange} placeholder="Role" />
                <input name="age" value={form.age} onChange={handleChange} placeholder="Age" type="number" />
                <button type="submit">Submit</button>
                <button type="reset" onClick={() => setForm({
                    name: "",
                    email: "",
                    phone: "",
                    department: "",
                    date_of_joining: "",
                    role: "",
                    age: ""
                })}>
                    Reset
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddEmployee;
