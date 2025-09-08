const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "companydb"
});

db.connect((err) => {
    if (err) console.error("DB connection failed:", err);
    else console.log("MySQL connected");
});

module.exports = db;
