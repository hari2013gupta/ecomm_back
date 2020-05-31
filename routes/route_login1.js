const con = require('../db/db_config')

function executeDBQuery(req, res, strQuery) {
  con.query(strQuery, function (error, results, fields) {
      if (error) throw error;
      console.log(fields);
      res.send(results);
      // Don't use the connection here, it has been returned to the pool.
  })
}

exports.getUserList = async function(req,res){
    const _query = "SELECT * FROM customers";
    con.query(_query, function (error, results, fields) {
        if (error) {
          res.send({
            "code":400,
            "failed":"error ocurred"
          })
        } else {
          res.send({
            "code":200,
            "success":"user registered sucessfully"
              });
          }
      });
  }