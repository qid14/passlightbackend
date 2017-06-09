var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbconfig = require('../config');
/* GET users listing. */

router.all('*',function(req,res,next){
	console.log('Access-Control-Allow-Origin in questions');
	res.set('Access-Control-Allow-Origin','http://localhost:3000');//记得在HOSTS文件中加入127.0.0.1 local.host
	res.set('Access-Control-Allow-Credentials',true);
	res.set('Access-Control-Allow-Methods','GET');
	res.set('Access-Control-Allow-Headers','X-Requested-Width,Content-Type,Authorization');
	if('OPTIONS'==req.method) return res.sendStatus(200);
	next();
})
router.get('/', function(req, res) {
	var connection = mysql.createConnection(dbconfig.connection);
	var querystr=`
SELECT * from test.questions
	 	
	`;
	 connection.query(querystr,
	 	function(err,rows){
	 		if (err) console.log('Error selecting : s%',err);
	 		res.send(rows);
	 	});
  console.log('Success select questions!');
  connection.end();
});

router.post('/', function(req, res) {
    console.log('body:', req.body);

    var connection = mysql.createConnection(dbconfig.connection);
    var query = connection.query('INSERT INTO test.response (questionid, readerid, answer) VALUES ?', [req.body], function(error, results, fields) {
        if (error) throw error;
    //     // Neat!
    });
    // console.log(query.sql); // INSERT INTO posts SET `id` = 1, `title` = 'Hello MySQL'
    connection.end();
    res.send('Insert question answers ok!');
});


module.exports = router;
