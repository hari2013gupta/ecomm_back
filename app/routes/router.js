var verifyToken = require('../verifyToken');
const mRouteWelcome = require('./route_welcome');
const mRouteLogin = require('./route_login')
const mRouteCommon = require('./route_common')
const mRouteTable = require('./route_table')
// const mRouteApp = require('./route_app')
// const mRouteWeb = require('./route_web')

const express = require('express')
const router = express.Router()

// var verifyToken = require('./middleware/verifyToken');
// var addNewUser = require('./middleware/addNewUser');
// var userLoginCheck = require('./middleware/userLoginCheck');
// var findAllUsers = require('./middleware/findAllUsers');
// var welcome = require('./welcome');

//route middleware to verify a token
router.use(verifyToken);
router.get('/', mRouteWelcome.welcome);
//-------node-mailer started------------
router.get('/index', function (req, res) {
    res.sendfile('index.html');
});
router.get('/verifyMail', mRouteLogin.verifyEmail);
//-------node mailer over--------------
// router.get('/users', findAllUsers);

//route to handle all apis
// router.get('/createTable', mRouteTable.createTable);
//Common apis added
// router.get('/getuserlist', mRouteCommon.getUserList);
// params.table_name = "tbl_customer"
router.get('/commonTableData', mRouteCommon.getCommonTableData);

//Login apis added
router.get('/serverTime', mRouteLogin.getServerTime);
// router.put('/update', mRouteLogin.userLogin);
// router.delete('/delete', mRouteLogin.userLogin);
// router.get('/logout', mRouteLogin.userLogout);

//App apis added
// router.get('/getPopularCategory', mRouteApp.getPopularCategory);
// router.get('/getAllCategory', mRouteApp.getAllCategory);
//Web apis added
// router.get('/getProductList', mRouteWeb.getProductList);

module.exports = router;