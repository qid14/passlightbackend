// var express = require('express');
// var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res) {
//   res.send('respond with a resource from post');
// });


// router.post('/', function(req, res) {
// 	console.log('body:',req.body);
// 	console.log('INSERT passinglight.posts(readername,content,createdAt ) '+
// 	 	'VALUES '+','+req.body+');');
// 	var connection = mysql.createConnection(dbconfig.connection);
// 	 connection.query('INSERT passinglight.readers(firstname,lastname,middlename,church,groups,email,phonenumber,memo) '+
// 	 	'VALUES '+','+req.body+');',
// 	 	function(err){
// 	 		if (err) console.log('Error INSERT : s%',err);
// 	 		res.status(500).send('Error INSERT data');
// 	 	});
//   console.log('Success Insert a reader!');
//   connection.end();

// });
var express = require('express');
var router = express.Router();
// const Sequelize = require('sequelize'); //ORM替代直接操作的mysql
var mysql = require('mysql');
var config = require('../config');
var jwt = require('jsonwebtoken');
var auth = require('../middleware/auth');
// var BookReader = require('../models/bookreadermodel');
var Post = require('../models/postmodel');
var moment = require('moment');

router.post('/', function(req, res) {
    // var username = req.body.username;
    var now = Date.now();
    var username = req.body.username;
    var content = req.body.content;


    Post.create({

        username: username,
        content: content,
        createdAt: now,
        version: 0
    }).then(function(p) {
        console.log('created.' + JSON.stringify(p));

        res.status(200).send('Insert new post ok!');
    }).catch(function(err) {
        console.log('failed: ' + err);

        res.render('error', {
            error: err
        })
    });



});

router.get('/', function(req, res) {
    // var username = req.body.username;

   Post.findAll({
            attributes: ['username', 'content', 'createdAt']
           
        }).then(function(posts) {
            console.log(JSON.stringify(posts));
            res.send(posts);
        });


});


module.exports = router;