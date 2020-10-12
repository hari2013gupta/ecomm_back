const mysql = require("mysql");
const dbConfig = require("../db/db.config.js");

var con = mysql.createPool({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

console.log("--------Database Connection Object Created");
module.exports = con;