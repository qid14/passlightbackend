var express = require('express');
var router = express.Router();
// var bodyParser = require('body-parser');
var mysql = require('mysql');
var dbconfig = require('../config');
// var app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//   extended: true
// }));
/* GET users listing. */
// console.log(bodyParser);
router.all('*', function(req, res, next) {
    console.log('Access-Control-Allow-Origin in readers');
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000'); //记得在HOSTS文件中加入127.0.0.1 local.host
    res.set('Access-Control-Allow-Credentials', true);
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', 'X-Requested-Width,Content-Type,Authorization');
    if ('OPTIONS' == req.method) return res.sendStatus(200);
    next();
})
router.get('/', function(req, res) {
    var connection = mysql.createConnection(dbconfig.connection);
    connection.query('SELECT * FROM test.readers;',
        function(err, rows) {
            if (err) console.log('Error selecting : s%', err);
            res.send(rows);
        });
    console.log('Success select readers!');
    connection.end();
});


router.post('/', function(req, res) {
    // console.log('body:', req.body);
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var middlename = req.body.middlename;
    var church = req.body.church;
    var groups = req.body.groups;
    var email = req.body.email;
    var phonenumber = req.body.phonenumber;
    var memo = req.body.memo;

    var connection = mysql.createConnection(dbconfig.connection);
    var reader = {

        firstname: firstname,
        lastname: lastname,
        middlename: middlename,
        church: church,
        groups: groups,
        email: email,
        phonenumber: phonenumber,
        memo: memo
    };
    var query = connection.query('INSERT INTO test.readers SET ?', reader, function(error, results, fields) {
        if (error) throw error;
        // Neat!
    });
    console.log(query.sql); // INSERT INTO posts SET `id` = 1, `title` = 'Hello MySQL'


    connection.end();

    res.send('Insert new user ok!');
});

module.exports = router;