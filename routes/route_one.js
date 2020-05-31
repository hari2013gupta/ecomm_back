const express = require('express')

const router = express.Router()
const con = require('../db/db_config')

function executeDBQuery(req, res, strQuery) {
    con.query(strQuery, function (error, results, fields) {
        if (error) throw error;
        console.log(fields);
        res.send(results);
        // Don't use the connection here, it has been returned to the pool.
    })
}

function executeDBQueryArr(res, strQuery, values) {
    con.query(strQuery, [values], function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    })
}

router.get("/StudentList", function (_req, _res) {
    const _query = "SELECT * FROM customers";
    executeDBQuery(_req, _res, _query);
});

module.exports = router;