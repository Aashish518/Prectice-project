const express = require("express");
const {
    getEmployees,
    getEmployee,
    addEmployee,
    editEmployee,
    removeEmployee
} = require("../controllers/EmployeeController");

const router = express.Router();

router.get("/", getEmployees);
router.get("/:id", getEmployee);
router.post("/", addEmployee);
router.put("/:id", editEmployee);
router.delete("/:id", removeEmployee);

module.exports = router;
