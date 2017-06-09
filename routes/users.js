var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});


router.post('/', function(req, res) {
	console.log('body:',req.body);
	console.log('INSERT test.readers(firstname,lastname,middlename,church,groups,email,phonenumber,memo) '+
	 	'VALUES '+','+req.body+');');
	var connection = mysql.createConnection(dbconfig.connection);
	 connection.query('INSERT test.readers(firstname,lastname,middlename,church,groups,email,phonenumber,memo) '+
	 	'VALUES '+','+req.body+');',
	 	function(err){
	 		if (err) console.log('Error INSERT : s%',err);
	 		res.status(500).send('Error INSERT data');
	 	});
  console.log('Success Insert a reader!');
  connection.end();
  
});

module.exports = router;
