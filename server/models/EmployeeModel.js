const db = require("../db");

const getAllEmployees = (callback) => {
    db.query("SELECT * FROM employees", callback);
};

const getEmployeeById = (id, callback) => {
    db.query("SELECT * FROM employees WHERE id = ?", [id], callback);
};

const createEmployee = (data, callback) => {
    db.query(
        "INSERT INTO employees (name, email, department, salary) VALUES (?, ?, ?, ?)",
        [data.name, data.email, data.department, data.salary],
        callback
    );
};

const updateEmployee = (id, data, callback) => {
    db.query(
        "UPDATE employees SET name=?, email=?, department=?, salary=? WHERE id=?",
        [data.name, data.email, data.department, data.salary, id],
        callback
    );
};

const deleteEmployee = (id, callback) => {
    db.query("DELETE FROM employees WHERE id = ?", [id], callback);
};

module.exports = {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
};
