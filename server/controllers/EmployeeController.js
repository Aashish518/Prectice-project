const {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
} = require("../models/EmployeeModel");

const getEmployees = (req, res) => {
    getAllEmployees((err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

const getEmployee = (req, res) => {
    getEmployeeById(req.params.id, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result[0]);
    });
};

const addEmployee = (req, res) => {
    createEmployee(req.body, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Employee added", id: result.insertId });
    });
};

const editEmployee = (req, res) => {
    updateEmployee(req.params.id, req.body, (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Employee updated" });
    });
};

const removeEmployee = (req, res) => {
    deleteEmployee(req.params.id, (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Employee deleted" });
    });
};

module.exports = {
    getEmployees,
    getEmployee,
    addEmployee,
    editEmployee,
    removeEmployee
};
