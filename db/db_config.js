const mySql = require('mysql')

var con = mySql.createConnection({
    host: 'localhost',//'127.0.0.1'
    user: 'root',
    password: '',
    database: 'ecomm_db',
    debug    :  true,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
});

con.connect(function (err){
    if(err) throw err;
    console.log("Database connected!");
})

module.exports = con;