const mysql = require("mysql2/promise");
require("dotenv").config();
console.log(process.env.host);

async function createConnection() {
  return mysql.createConnection({
    host: process.env.host,
    user: process.env.dbusername,
    password: process.env.dbpassword,
    database: process.env.database,
  });
}
module.exports = { createConnection };
