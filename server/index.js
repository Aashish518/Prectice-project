const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");
const EmployeeRoutes = require("./routers/EmployeeRoutes");

app.use(cors());
app.use(bodyParser.json());

app.use("/api/employees", EmployeeRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
