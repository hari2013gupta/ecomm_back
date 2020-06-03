const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var mysql = require("mysql");

const con = require('../../db/db_config');
var config = require('../../config');

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
  var post = {
    password: req.body.password,
    mobile: req.body.mobile,
    email: req.body.email //|| req.query.email
  }
  // var query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
  // var table = ["tbl_user","password",  md5(post.password), "user_mobile", post.mobile];
  var query = "SELECT * FROM ?? WHERE ??=?";
  var table = ["tbl_user", "user_mobile", post.mobile];
  query = mysql.format(query, table);

  con.query(query, async function (error, results) {
    if (error) {
      res.send({
        "code": 400,
        "status": false,
        "failed": "error ocurred"
      })
    } else {
      if (results.length > 0) {
        var token = jwt.sign(results, config.secret, {
          expiresIn: 1440
        });
        const comparision = bcrypt.compare(post.password, results[0].user_password)
        // const comparision = password === results[0].user_password;
        if (comparision) {
          var data = {
            user_id: results[0].user_id,
            device_type: "zzzzzzzzzz",//results[0].device_type,
            access_token: token,
            device_token: results[0].device_token,
            ip_address: results[0].ip_address
          }
          var query = "INSERT INTO  ?? SET  ?";
          var table = ["tbl_access_token"];
          query = mysql.format(query, table);
          con.query(query, data, function (err, rows) {
            if (err) {
              res.json({
                "Error": true,
                "Message": "Error executing MySQL query"
              });
            } else {
              res.json({
                status: true,
                message: 'Token generated',
                token: token,
                currUser: results[0].user_id
              });
            } // return info including token
          });
          // res.send({
          //   "code": 200,
          //   "status": true,
          //   "message": "Login sucessful!"
          // })
        } else {
          res.send({
            "code": 204,
            "status": false,
            "message": "Email and password does not match"
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