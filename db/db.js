const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

var con = mysql.createPool({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

console.log("Connection Object Created");
con.connect(function (err) {
    if (err) {
        console.log(err);
        throw err;
        return;
    }
    console.log("Database connected!");
})

module.exports = con;