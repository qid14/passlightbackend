var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbconfig = require('../config');
/* GET users listing. */

router.all('*', function(req, res, next) {
  console.log('Access-Control-Allow-Origin in books');
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000'); //记得在HOSTS文件中加入127.0.0.1 local.host
  res.set('Access-Control-Allow-Credentials', true);
  res.set('Access-Control-Allow-Methods', 'GET');
  res.set('Access-Control-Allow-Headers', 'X-Requested-Width,Content-Type,Authorization');
  if ('OPTIONS' == req.method) return res.send(200);
  next();
})
router.get('/', function(req, res) {
  var connection = mysql.createConnection(dbconfig.connection);
  connection.query(
    'SELECT * FROM test.books',
    // 'SELECT a.firstname,a.lastname,a.church,a.groups,a.email,b.startdate,b.enddate,b.duration,c.bookname,c.author'+
    // ' FROM test.readers as a'+
    // ' left join test.bookreader as b'+
    // ' ON a.readerid = b.readerid'+
    // ' left join test.books as c on b.bookid = c.bookid'+
    // ' WHERE startdate is not null;',
    function(err, rows) {
      if (err) console.log('Error selecting : s%', err);
      res.send(rows);
    });
  console.log('Success select books!');
  connection.end();
});

router.delete('/', function(req, res) {
  var bookid = req.body.bookid;
  var connection = mysql.createConnection(dbconfig.connection);
  connection.query(
    'DELETE FROM test.books WHERE bookid=' + bookid,

    function(err, result) {
      if (err) console.log('Error delete : s%', err);
      console.log("Number of records deleted: " + result.affectedRows);
    });
  console.log('Success delete books!');
  connection.end();
  res.send('Delete Successfully!')
});

router.post('/', function(req, res) {
  var connection = mysql.createConnection(dbconfig.connection);
  connection.query(

    'INSERT INTO test.books (bookid,bookname,author, version, price,location) VALUES ?', [req.body],
    // 'SELECT a.firstname,a.lastname,a.church,a.groups,a.email,b.startdate,b.enddate,b.duration,c.bookname,c.author'+
    // ' FROM test.readers as a'+
    // ' left join test.bookreader as b'+
    // ' ON a.readerid = b.readerid'+
    // ' left join test.books as c on b.bookid = c.bookid'+
    // ' WHERE startdate is not null;',
    function(err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  console.log('Success select books!');
  connection.end();
});

module.exports = router;
