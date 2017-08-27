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
router.get('/response', function(req, res) {
	var connection = mysql.createConnection(dbconfig.connection);
	 connection.query(
	 	` SELECT   
SUM( CASE WHEN questionid = '1001' and answer='Yes' THEN 
                      1 ELSE 0 END) as 'Yes_1001',
                       SUM( CASE WHEN questionid = '1001' and answer='No' THEN 
                      1 ELSE 0 END) as 'No_1001', 
                      
                      SUM( CASE WHEN questionid = '1002' and answer='Yes' THEN 
                      1 ELSE 0 END) as 'Yes_1002',
                       SUM( CASE WHEN questionid = '1002' and answer='No' THEN 
                      1 ELSE 0 END) as 'No_1002', 

SUM( CASE WHEN questionid = '1001' and answer='Yes' THEN 
                      1 ELSE 0 END) as 'Yes_1003',
                       SUM( CASE WHEN questionid = '1003' and answer='No' THEN 
                      1 ELSE 0 END) as 'No_1003', 


SUM( CASE WHEN questionid = '1004' and answer='Yes' THEN 
                      1 ELSE 0 END) as 'Yes_1004',
                       SUM( CASE WHEN questionid = '1004' and answer='No' THEN 
                      1 ELSE 0 END) as 'No_1004',
                     
                      SUM( CASE WHEN questionid = '1005' and answer='Yes' THEN 
                      1 ELSE 0 END) as 'Yes_1005',
                       SUM( CASE WHEN questionid = '1005' and answer='No' THEN 
                      1 ELSE 0 END) as 'No_1005', 
SUM( CASE WHEN questionid = '1001' and answer='Yes' THEN 
                      1 ELSE 0 END) as 'Yes_1006',
                       SUM( CASE WHEN questionid = '1006' and answer='No' THEN 
                      1 ELSE 0 END) as 'No_1006', 
SUM( CASE WHEN questionid = '1001' and answer='Yes' THEN 
                      1 ELSE 0 END) as 'Yes_1007',
                       SUM( CASE WHEN questionid = '1007' and answer='No' THEN 
                      1 ELSE 0 END) as 'No_1007', 
SUM( CASE WHEN questionid = '1001' and answer='Yes' THEN 
                      1 ELSE 0 END) as 'Yes_1008',
                       SUM( CASE WHEN questionid = '1008' and answer='No' THEN 
                      1 ELSE 0 END) as 'No_1008', 
SUM( CASE WHEN questionid = '1001' and answer='Yes' THEN 
                      1 ELSE 0 END) as 'Yes_1009',
                       SUM( CASE WHEN questionid = '1009' and answer='No' THEN 
                      1 ELSE 0 END) as 'No_1009' 
                  
                      
                      
FROM  passinglight.response`,
	 	// 'SELECT a.firstname,a.lastname,a.church,a.groups,a.email,b.startdate,b.enddate,b.duration,c.bookname,c.author'+
	 	// ' FROM passinglight.readers as a'+
	 	// ' left join passinglight.bookreader as b'+
	 	// ' ON a.readerid = b.readerid'+
	 	// ' left join passinglight.books as c on b.bookid = c.bookid'+
	 	// ' WHERE startdate is not null;',
	 	function(err,rows){
	 		if (err) console.log('Error selecting : s%',err);
	 		res.send(rows);
	 	});
  console.log('Success select question answers!');
  connection.end();
});

module.exports = router;
