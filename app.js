const express = require('express')
var bodyParser = require('body-parser')
// const cors = require("cors");

const app = express();
// var corsOptions = {
//   origin: "http://localhost:3000"
// };
// app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

const mRouteLogin = require('./app/routes/route_login')
const mRouteTable = require('./app/routes/route_table')
const mCommon = require('./app/routes/route_common')
app.post('/register', mRouteLogin.userRegister);
app.post('/login', mRouteLogin.userLogin);
app.post('/verifyotp', mRouteLogin.verifyOTP);
app.get('/createTable', mRouteTable.createTable);

app.get('/commonTableData', mCommon.getCommonTableData1);
const mRouter = require('./app/routes/router')
app.use('/api', mRouter)

const PORT = process.env.PORT || 3306;
const server = app.listen(PORT, () => {
    const host = server.address().host
    const port = server.address().port
    console.log(`Server is now running at http://${host}:${port}`);
})