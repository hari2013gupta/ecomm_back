// test route
exports.welcome = async function (req, res) {
    // res.json({
    //     code: 404,
    //     message: '404 Not found!'
    // });
    var today = new Date();
    res.status(404).send('<h1>404 Page Not Found!</h1>' +today);
};