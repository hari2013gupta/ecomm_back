const mysql = require("mysql");
const dbConfig = require("../db/db.config.js");

var con = mysql.createPool({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

console.log("--------Database Connection Object Created");
/**
 *  === swadesishop Config Vars
 *  CLEARDB_DATABASE_URL: mysql://b329058594e2bb:a8db1095@us-cdbr-east-02.cleardb.com/heroku_bbb68f029bf74e3?reconnect=true
 *  CLEARDB_ROSE_URL:     mysql://bb49d356d50ebe:ed5a8d43@us-cdbr-east-02.cleardb.com/heroku_22560b6a1611ee1?reconnect=true
 *  DATABASE_URL:        'mysql://b329058594e2bb:a8db1095@us-cdbr-iron-east-02.cleardb.net/heroku_bbb68f029bf74e3?reconnect=true'
 * 
 * heroku config
 »   Warning: heroku update available from 7.39.2 to
 »   7.44.0.
=== swadesishop Config Vars
CLEARDB_DATABASE_URL: mysql://b329058594e2bb:a8db1095@us-cdbr-east-02.cleardb.com/heroku_bbb68f029bf74e3?reconnect=true
CLEARDB_ROSE_URL:     mysql://bb49d356d50ebe:ed5a8d43@us-cdbr-east-02.cleardb.com/heroku_22560b6a1611ee1?reconnect=true
DATABASE_URL:        'mysql://b329058594e2bb:a8db1095@us-cdbr-iron-east-02.cleardb.net/heroku_bbb68f029bf74e3?reconnect=true'

E:\hari\JS\NODE\hari\ecomm_back>heroku config | grep CLEARDB_DATABASE_URL
'grep' is not recognized as an internal or external command,
operable program or batch file.

E:\hari\JS\NODE\hari\ecomm_back>heroku config | findstr CLEARDB_DATABASE_URL
 »   Warning: heroku update available from 7.39.2 to 7.44.0.
CLEARDB_DATABASE_URL: mysql://b329058594e2bb:a8db1095@us-cdbr-east-02.cleardb.com/heroku_bbb68f029bf74e3?reconnect=true

Setting DATABASE_URL and restarting ⬢ swadesishop... done, v11
DATABASE_URL: 'mysql://b329058594e2bb:a8db1095@us-cdbr-east-02.cleardb.com/heroku_bbb68f029bf74e3?reconnect=true'
 »   Warning: heroku update available from 7.39.2 to 7.44.0.
 * */ 

module.exports = con;