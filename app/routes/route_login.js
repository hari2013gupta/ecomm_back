const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var mysql = require("mysql");
const SendOtp = require('sendotp');
var nodemailer = require("nodemailer");

const con = require('../../db/db_config');
var config = require('../../config');

var smtpTransport = nodemailer.createTransport({
  service: "gmail", //in place of service use host...
  // host: 'smtp.gmail.com',
  secure: false,
  port: 25, //465,
  auth: {
    user: config.mailer,
    pass: config.pass
  },
  tls: {
    rejectUnauthorized: false
  }
});
// var tempMessage = 'Otp for SwadesiShop Login is {{otp}}, please do not share it with anybody.';
var rand, mailOptions, host, link;
/*------------------SMTP Over-----------------------------*/
exports.sendEmail = function (params) {
  return new Promise((resolved, reject) => {
    // rand = Math.floor((Math.random() * 100) * 54);
    // host = req.get('host');
    // link = "http://" + req.get('host') + "/verify?id=" + rand;
    mailOptions = {
      to: params.to_email,
      subject: params.subject,
      html: params.bodyHTML,
      // html: "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log("Message sent: " + info.response);
        // res.end("OTP mailed successfully!");
        resolved(info.response);
      }
    });
  });
}

exports.verifyEmail = async function (req, res) {
  console.log(req.protocol + ":/" + req.get('host'));
  if ((req.protocol + "://" + req.get('host')) == ("http://" + host)) {
    console.log("Domain is matched. Information is from Authentic email");
    if (req.query.id == rand) {
      console.log("email is verified");
      res.end("<h1>Email " + mailOptions.to + " is been Successfully verified");
    } else {
      console.log("email is not verified");
      res.end("<h1>Bad Request</h1>");
    }
  } else {
    res.end("<h1>Request is from unknown source");
  }
}

exports.sendOTP = function (params) {
  return new Promise((resolved, reject) => {
    const sendOtp = new SendOtp('AuthKey');
    var count = 0;
    sendOtp.send(params.to_mobile, "SWDESI", params.otp, function (error, data) {
      console.log(data);
      if (data.type == 'success') {
        console.log('OTP verified successfully - ' + params.otp);
      }
      if (data.type == 'error') {
        console.log('OTP verification failed')
        if (count < 3) {
          sendOtp.retry(params.to_mobile, false, function (error, data) {
            console.log(data);
          });
        }
        count++;
      }
      // sendOtp.retry(contactNumber, retryVoice, callback);
      // sendOtp.verify(contactNumber, otpToVerify, callback);
    });
    sendOtp.setOtpExpiry('10'); //in minutes
  });
}
/*--------------------OTP Module Over----------------------------*/

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

function generateOTP() {
  var digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < 4; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}
exports.userRegister = async function (req, res) {
  const password = req.body.password;
  const encryptedPassword = bcrypt.hashSync(password, 8);
  var today = new Date();
  var user = {
    "user_name": req.body.name,
    "user_mobile": req.body.mobile,
    "user_email": req.body.email,
    "user_otp": generateOTP(),
    "user_password": encryptedPassword,
    "created_at": today,
    "updated_at": today
  }
  console.log(user);
  var query = "SELECT user_mobile FROM ?? WHERE ??=?";
  var table = ["tbl_user", "user_mobile", user.user_mobile];
  query = mysql.format(query, table);

  con.query(query, function (err, rows) {
    if (err) {
      res.json({
        "code": 500,
        "status": false,
        "message": "Internal server error!"
      });
    } else {
      if (rows.length == 0) {
        var query = "INSERT INTO  ?? SET  ?";
        var table = ["tbl_user"];
        query = mysql.format(query, table);
        con.query(query, user, function (err, results, fields) {
          if (err) {
            res.send({
              "code": 500,
              "status": false,
              "message": "Internal server error"
            })
          } else {
            res.send({
              "code": 200,
              "status": true,
              "message": "User registered sucessfully!",
              "data": results
            });
            var params = {
              to_email: user.user_email,
              to_mobile: user.user_mobile,
              otp: user.user_otp,
              subject: config.app_name + ' - Login Verification',
              message: user.user_otp + " is your otp for " + config.app_name + " Login",
              bodyHTML: "Hi,<br\><b>" + user.user_otp + "</b> is your one time password for <u>" + config.app_name + "</u> login.<br\><br\>Thank you.",
            }
            exports.sendEmail(params);
            exports.sendOTP(params);
          }
        });
      } else {
        res.json({
          "code": 400,
          "status": true,
          "message": "This mobile no is already registered, please login"
        });
      }
    }
  });
}

exports.verifyOTP = async function (req, res) {
  var post = {
    otp: req.body.otp,
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
        "message": "error ocurred"
      })
    } else {
      if (results.length > 0) {
        const comparision = bcrypt.compare(post.otp, results[0].user_otp)
        // const comparision = password === results[0].user_password;
        if (comparision) {
          res.send({
            "code": 200,
            "status": true,
            "message": "User verified sucessfully, please login!",
            "data": results
          });
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
          "status": false,
          "message": "Mobile number does not exits"
        });
      }
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
            device_type: "zzzzzzzzzz", //results[0].device_type,
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
                "code": 200,
                "status": false,
                "Message": "Internal server error"
              });
            } else {
              res.json({
                code: 200,
                status: true,
                message: 'Token generated',
                data: token,
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
          "status": false,
          "success": "Email does not exits"
        });
      }
    }
  });
}