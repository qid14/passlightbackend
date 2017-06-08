var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbconfig = require('../config');
/* GET users listing. */

router.all('*',function(req,res,next){
	console.log('Access-Control-Allow-Origin in books');
	res.set('Access-Control-Allow-Origin','http://local.host:3000');//记得在HOSTS文件中加入127.0.0.1 local.host
	res.set('Access-Control-Allow-Credentials',true);
	res.set('Access-Control-Allow-Methods','GET');
	res.set('Access-Control-Allow-Headers','X-Requested-Width,Content-Type,Authorization');
	if('OPTIONS'==req.method) return res.send(200);
	next();
})
router.get('/', function(req, res) {
	var connection = mysql.createConnection(dbconfig.connection);
	 connection.query('SELECT * FROM test.readers;',
	 	function(err,rows){
	 		if (err) console.log('Error selecting : s%',err);
	 		res.send(rows);
	 	});
  console.log('Success select readers!');
  connection.end();
});

module.exports = router;
