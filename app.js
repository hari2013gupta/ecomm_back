const express = require('express')
var bodyParser = require('body-parser')

const mRouter = require('./routes/router')
// const mRouterLogin = require('./routes/route_login')
// const mRouterOne = require('./routes/route_one')

const app = express()

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

app.use('/api', mRouter)
// app.use('/api', mRouterLogin)
// app.use('/api', mRouterOne)

const server = app.listen(process.env.PORT || 8000, () => {
    const host = server.address().address
    const port = server.address().port
    console.log(`Server is now running at http://${host}:${port}`);
})