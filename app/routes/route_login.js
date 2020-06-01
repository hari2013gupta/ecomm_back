const con = require('../../db/db_config');
const bcrypt = require('bcryptjs');

function executeDBQuery(req, res, strQuery) {
  con.query(strQuery, function (error, results, fields) {
    try {
      if (error) {
        console.log(error);
        //throw error;
        // res.send({
        //   "code": 400,
        //   "status": false,
        //   "message": "Error found"
        // });
        res.json({
          code: 400,
          status: false,
          message: 'Error occured',
          data: ''
        });
      } else {
        console.log(fields);
        // res.send(results);
        res.json({
          code: 200,
          status: true,
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

function executeDBQueryArr(res, strQuery, values) {
  con.query(strQuery, [values], function (error, results, fields) {
    if (error) throw error;
    res.send(results);
  })
}

exports.getServerTime = async function (req, res) {
  var today = new Date();
  res.json({
      code: 200,
      message: 'Success',
      data: today
  });
}
exports.userRegister = async function (req, res) {
  const password = req.body.password;
  const encryptedPassword = bcrypt.hashSync(password, 8);
  var today = new Date();
  var user = {
    "user_name": req.body.name,
    "user_mobile": req.body.mobile,
    "user_email": req.body.email,
    "user_password": encryptedPassword,
    "created_at": today,
    "updated_at": today
  }

  con.query('INSERT INTO tbl_user SET ?', user, function (error, results, fields) {
    if (error) {
      res.send({
        "code": 400,
        "status": false,
        "failed": "error ocurred"
      })
    } else {
      res.send({
        "code": 200,
        "status": true,
        "success": "User registered sucessfully!"
      });
    }
  });
}
exports.userLogin = async function (req, res) {
  var mobile = req.body.mobile;
  var email = req.body.email;
  var password = req.body.password;
  con.query('SELECT * FROM tbl_user WHERE user_mobile = ?', [mobile], async function (error, results, fields) {
    if (error) {
      res.send({
        "code": 400,
        "status": false,
        "failed": "error ocurred"
      })
    } else {
      if (results.length > 0) {
        const comparision = bcrypt.compare(password, results[0].user_password)
        // const comparision = password === results[0].user_password;
        if (comparision) {
          res.send({
            "code": 200,
            "status": true,
            "success": "Login sucessful!"
          })
        } else {
          res.send({
            "code": 204,
            "status": false,
            "success": "Email and password does not match"
          })
        }
      } else {
        res.send({
          "code": 206,
          "success": "Email does not exits"
        });
      }
    }
  });
}