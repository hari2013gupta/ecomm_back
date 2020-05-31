const mySql = require('mysql')

var con = mySql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'school_db'
});

con.connect(function (err){
    if(err) throw err;
    console.log("Database connected!");
})

module.exports = con;