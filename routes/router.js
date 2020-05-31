// const mRouteLogin = require('./route_login')
// const mRouteCommon = require('./route_common')
const mRouteTable = require('./route_table')
// const mRouteApp = require('./route_app')
// const mRouteWeb = require('./route_web')

const {
    body,
    validationResult
} = require('express-validator');
const express = require('express')
const router = express.Router()

// test route
router.get('/', function (req, res) {
    // res.json({
    //     code: 404,
    //     message: '404 Not found!'
    // });
    var today = new Date();
    res.status(404).send('<h1>404 Page Not Found!</h1>' +today);
});

//route to handle all apis
router.get('/createTable', mRouteTable.createTable);
//Common apis added
// router.get('/getuserlist', mRouteCommon.getUserList);
// router.get('/getcustomerlist', mRouteCommon.getCustomerList);

//Login apis added
// router.post('/serverTime', mRouteLogin.getServerTime);
// router.post('/register', mRouteLogin.userRegister);
// router.post('/login', mRouteLogin.userLogin);
// router.put('/update', mRouteLogin.userLogin);
// router.delete('/delete', mRouteLogin.userLogin);
// router.get('/logout', mRouteLogin.userLogout);

//App apis added
// router.get('/getPopularCategory', mRouteApp.getPopularCategory);
// router.get('/getAllCategory', mRouteApp.getAllCategory);
//Web apis added
// router.get('/getProductList', mRouteWeb.getProductList);

module.exports = router;