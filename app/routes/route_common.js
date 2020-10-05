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
        //   "message": "Error found"
        // });
        res.json({
          code: 500,
          status: false,
          message: config.MSG_INTERNAL_ERR,
          data: results
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

// exports.getCustomerList = async function (req, res) {
//   const sqlquery = "SELECT customers.name AS CusName, employees.name AS EmpName FROM customers JOIN employees ON customers.address = employees.address";
//   // const sqlquery = "SELECT * FROM customers";
//   executeDBQuery(req, res, sqlquery);
// }

exports.getCommonTableData = async function (req, res) {
  var params = {
    table_name: req.body.table_name,
    column_item1: "",
    column_item2: "",
  };
  var table = [config.getTasble(params)];
  query = mysql.format(config.q_select, table);
  executeDBQuery(req, res, query);
}
exports.getCommonTableData1 = async function (req, res) {
  var params = {
    table_name: req.body.table_name,
    column_item1: "",
    column_item2: "",
  };
  var table = ['tbl_product'];//[config.getTable(params)];
  query = mysql.format(config.q_select, table);
  executeDBQuery(req, res, query);
}
