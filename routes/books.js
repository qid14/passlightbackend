var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbconfig = require('../config');
/* GET users listing. */

// router.all('*', function(req, res, next) {
//   console.log('Access-Control-Allow-Origin in books');
//   res.set('Access-Control-Allow-Origin', 'http://localhost:3000'); //记得在HOSTS文件中加入127.0.0.1 local.host
//   res.set('Access-Control-Allow-Credentials', true);
//   res.set('Access-Control-Allow-Methods', 'GET');
//   res.set('Access-Control-Allow-Headers', 'X-Requested-Width,Content-Type,Authorization');
//   if ('OPTIONS' == req.method) return res.send(200);
//   next();
// })
router.get('/', function(req, res) {
  var connection = mysql.createConnection(dbconfig.connection);
  connection.query(
    'SELECT * FROM passinglight.books',
    // 'SELECT a.firstname,a.lastname,a.church,a.groups,a.email,b.startdate,b.enddate,b.duration,c.bookname,c.author'+
    // ' FROM passinglight.readers as a'+
    // ' left join passinglight.bookreader as b'+
    // ' ON a.readerid = b.readerid'+
    // ' left join passinglight.books as c on b.bookid = c.bookid'+
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
    'DELETE FROM passinglight.books WHERE bookid=' + bookid,

    function(err, result) {
      if (err) console.log('Error delete : s%', err);
      console.log("Number of records deleted: " + result.affectedRows);
    });
  console.log('Success delete books!');
  connection.end();
  res.send('Delete Successfully!')
});

router.put('/:bookid', function(req, res) {
  console.log('bookid in reqbody is:    ', req.params.bookid);
  var initiatorid = String(req.body.initiatorid);
  var connection = mysql.createConnection(dbconfig.connection);
  var querystr = 'UPDATE passinglight.books SET initiatorid =' + initiatorid + ' Where bookid = ' + req.params.bookid;
  console.log('NOOOK:query str:',querystr);
  // console.log('arrayofbooks:',arrayofbooks);
  // console.log('query str:', 'INSERT INTO passinglight.books (bookname,author, location, price,version) VALUES ?', [arrayofbooks]);
  connection.query(querystr, function(err, result) {
    if (err) {
      console.log('Error when insert new books.', err);
      throw err;
    }
    console.log(" books updated initiator!");
  });

  // console.log('finished added books!');
  connection.end();
});




router.post('/', function(req, res) {
  console.log('reqbody is    ', req.body);
  var bookname = String(req.body.bookname);
  var author = String(req.body.author);
  var location = String(req.body.location);
  var price = String(req.body.price);
  var version = String(req.body.version);
  var qty = req.body.qty;
  console.log('qty:', qty)
  // console.log('sql str for insert is    ','INSERT INTO passinglight.books (bookname,author, location, price,version) VALUES ('+bookname,author,location,price,version+')');
  var connection = mysql.createConnection(dbconfig.connection);
  if (qty > 1) {
    var arrayofbooks = [];
    for (i = 0; i < qty; i++) {
      var book2insert = [bookname, author, location, price, version]
      // console.log('book2insert:',book2insert);
      arrayofbooks.push(book2insert);

    }
    // console.log('arrayofbooks:',arrayofbooks);
    // console.log('query str:', 'INSERT INTO passinglight.books (bookname,author, location, price,version) VALUES ?', [arrayofbooks]);
    connection.query(

      'INSERT INTO passinglight.books (bookname,author, location, price,version) VALUES ?', [arrayofbooks],
      function(err, result) {
        if (err) {
          console.log('Error when insert new books.', err);
          throw err;
        }
        console.log(qty + " books inserted");
      });
  } else if (qty == 1) {
    connection.query(
      'INSERT INTO passinglight.books (bookname,author, location, price,version) VALUES ("' +
      bookname + '","' + author + '","' + location + '","' + price + '","' + version + '")',

      function(err, result) {
        if (err) {
          console.log('Error when insert new book.', err);
          throw err;
        }
        console.log("1 record inserted");
      });

  }

  console.log('finished added books!');
  connection.end();
});

module.exports = router;
