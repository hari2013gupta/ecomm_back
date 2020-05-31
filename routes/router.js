const express = require('express')
const mRouterLogin = require('../routes/route_login1')


const router = express.Router()

// test route
router.get('/', function (req, res) {
    res.json({
        code: 500,
        message: 'Access denied!'
    });
});

//route to handle user registration
router.get('/getuserlist', mRouterLogin.getUserList);


module.exports = router;