const express = require('express')
var bodyParser = require('body-parser')
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8000"
};

app.use(cors(corsOptions));

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

var config = require('./config');
const mRouter = require('./app/routes/router')
const mRouteLogin = require('./app/routes/route_login')
// const mRouterOne = require('./routes/route_one')
app.post('/register', mRouteLogin.userRegister);
app.post('/login', mRouteLogin.userLogin);

app.use('/api', mRouter)
// app.use('/api', mRouterLogin)
// app.use('/api', mRouterOne)

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
    const host = server.address().address
    const port = server.address().port
    console.log('Server is now running at http://' + host + ':' + port);
    // console.log(`Server is now running at http://${host}:${port}`);
})