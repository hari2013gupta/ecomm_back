const con = require('../db/db_config')

function executeDBQuery(req, res, strQuery) {
  con.query(strQuery, function (error, results, fields) {
    try {
      if (error) {
        console.log(error);
        //throw error;
        // res.send({
        //   "code": 400,
        //   "message": "Error found"
        // });
        res.json({
          code: 400,
          message: 'Error occured: ',
          data: ''
        });
      } else {
        console.log(fields);
        // res.send(results);
        res.json({
          code: 200,
          message: 'Success',
          data: results
        });
        // Don't use the connection here, it has been returned to the pool.
      }
    } catch (err) {
      res.status(500)
      res.send(err.message)
    }
  });
}

