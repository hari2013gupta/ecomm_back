const mySql = require('mysql')

var con = mySql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ecomm_db'
});

con.connect(function (err){
    if(err) throw err;
    console.log("Database connected!");
})

module.exports = con;