const con = require('../db/db_config')
const bcrypt = require('bcrypt');

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
exports.register = async function (req, res) {
  const password = req.body.password;
  const encryptedPassword = await bcrypt.hash(password, saltRounds);
  var today = new Date();
  var user = {
    "name": req.body.name,
    "mobile": req.body.mobile,
    "email": req.body.email,
    "password": encryptedPassword,
    "created_at": today,
    "updated_at": today
  }

  connection.query('INSERT INTO users SET ?', user, function (error, results, fields) {
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
exports.logout = async function (req, res) {
  //session destroy
  req.session = null;
  res.redirect('/');
}
exports.login = async function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  connection.query('SELECT * FROM users WHERE email = ?', [email], async function (error, results, fields) {
    if (error) {
      res.send({
        "code": 400,
        "status": false,
        "failed": "error ocurred"
      })
    } else {
      if (results.length > 0) {
        const comparision = await bcrypt.compare(password, results[0].password)
        // if(password==results[0].password){
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