var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbconfig = require('../config');
/* GET users listing. */

router.all('*',function(req,res,next){
	console.log('Access-Control-Allow-Origin in books');
	res.set('Access-Control-Allow-Origin','http://localhost:3000');//记得在HOSTS文件中加入127.0.0.1 local.host
	res.set('Access-Control-Allow-Credentials',true);
	res.set('Access-Control-Allow-Methods','GET');
	res.set('Access-Control-Allow-Headers','X-Requested-Width,Content-Type,Authorization');
	if('OPTIONS'==req.method) return res.send(200);
	next();
})
router.get('/', function(req, res) {
	var connection = mysql.createConnection(dbconfig.connection);
	var querystr=`
SELECT b.bookid,a.firstname,a.lastname,a.church,a.groups,a.email,b.startdate,b.enddate,b.duration,c.bookname,c.author
	 	FROM test.readers as a
	 	left join test.bookreaders as b
	 	ON a.readerid = b.readerid
	 	left join test.books as c on b.bookid = c.bookid
	 	WHERE startdate is not null;
	`;
	 connection.query(querystr,
	 	function(err,rows){
	 		if (err) console.log('Error selecting : s%',err);
	 		res.send(rows);
	 	});
  console.log('Success select borrows!');
  connection.end();
});

module.exports = router;
