var express = require('express');


var router = express.Router();
// const Sequelize = require('sequelize'); //ORM替代直接操作的mysql
var mysql = require('mysql');
var config = require('../config');
var jwt = require('jsonwebtoken');
var auth = require('../middleware/auth');
var Reader = require('../models/reader');


// console.log('database:',config.database);
// console.log('username:',config.connection.user);
// console.log('password:',config.connection.password);
// console.log('host:',config.connection.host);

// var sequelize = new Sequelize(config.database, config.connection.user, config.connection.password, {
//     host: config.connection.host,
//     dialect: 'mysql',
//     pool: {
//         max: 5,
//         min: 0,
//         idle: 30000
//     }
// });


// var Reader = sequelize.define('reader', {
//     readerid: {
//         type: Sequelize.BIGINT,
//         primaryKey: true
//     },
//     username: Sequelize.STRING(64),
//     firstname: Sequelize.STRING(64),
//     lastname: Sequelize.STRING(64),
//     middlename: Sequelize.STRING(64),
//     password: Sequelize.STRING(64),
//     church: Sequelize.STRING(64),
//     groups: Sequelize.STRING(64),
//     email: Sequelize.STRING(64),
//     phonenumber: Sequelize.STRING(64),
//     memo: Sequelize.STRING(64),
//     gender: Sequelize.BOOLEAN,
//     birth: Sequelize.STRING(10),
//     createdAt: Sequelize.BIGINT,
//     updatedAt: Sequelize.BIGINT,
//     version: Sequelize.BIGINT
// }, {
//     timestamps: false
// });





// (async(function testingAsyncAwait() {
//     await (console.log("For Trump's Sake Print me!"));
// }))();

/*
var asyncCreatereader =
    // 	async function (){
    async function() {
        var r1 = await Reader.create({
            Readerid: 4000023;
            username: 'Odie',
            firstname: 'Oo',
            lastname: 'La',
            middlename: '',
            password: 'Odie',
            church: 'CCC',
            groups: 'Pingan1',
            email: 'e@g.c',
            phonenumber: '111',
            memo: '2',
            gender: false,
            birth: '2008-08-08',
            createdAt: now,
            updatedAt: now,
            version: 0
        });
        console.log('created: ' + JSON.stringify(r1));
    };
*/



// router.all('*', function(req, res, next) {
//     console.log('Access-Control-Allow-Origin in readers');
//     res.set('Access-Control-Allow-Origin', 'http://localhost:3000'); //记得在HOSTS文件中加入127.0.0.1 local.host
//     res.set('Access-Control-Allow-Credentials', true);
//     res.set('Access-Control-Allow-Methods', 'GET');
//     res.set('Access-Control-Allow-Headers', 'X-Requested-Width,Content-Type,Authorization');
//     if ('OPTIONS' == req.method) return res.sendStatus(200);
//     next();
// })

router.get('/', function(req, res) {
    /*
    var connection = mysql.createConnection(config.connection);
    connection.query('SELECT * FROM test.readers;',
        function(err, rows) {
            if (err) console.log('Error selecting : s%', err);
            res.send(rows);
        });
    console.log('Success select readers!');
    connection.end();
*/
    // (async (function testingAsyncAwait() {
    //     await (console.log("For Trump's Sake Print me!"));
    // }))();

    try {
        Reader.findAll().then(function(readers) {
            console.log(JSON.stringify(readers));
            res.send(readers);
        });
        // console.log(`find ${pets.length} pets:`);
        // for (let r of readers) {
        //     console.log(JSON.stringify(r));
        // }

    } catch (err) {
        console.log(err);
    }
    // async(function myFunction() {
    //     try {
    //         var readers = await Reader.findAll();
    //         console.log(`find ${pets.length} pets:`);
    //         for (let p of readers) {
    //             console.log(JSON.stringify(p));
    //         }
    //         res.send(readers);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // });
});

router.get('/check-state', auth.verifyToken, (req, res) => {

    let content = {
        success: true,
        message: 'Successfully logged in'
    }
    res.send(content);

});

router.post('/login', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    try {
        Reader.findOne({
            where: {
                username: username,
                password: password
            }
        }).then(function(reader) {
            if (reader) {
                console.log('+++++++', JSON.stringify(reader));
                var token = jwt.sign({
                    id: reader.username,
                    role: reader.role
                }, config.secretToken, {
                    expiresIn: '1d',
                    algorithm: 'HS256'
                })
                res.json({
                    username: username,
                    token: token
                });
            } else {
                return res.sendStatus(401);
            }

        }).catch(function(err) {
            console.log(err);
            return res.sendStatus(401);
        })


    } catch (err) {
        console.log(err);
    }

});


router.put('/', function(req, res) {
    // console.log('body:', req.body);

    var now = Date.now();
    var username = req.body.username;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var middlename = req.body.middlename;
    var role = req.body.role;
    var gender = req.body.gender;
    var birth = req.body.birth;
    var church = req.body.church;
    var groups = req.body.groups;
    var email = req.body.email;
    var phonenumber = req.body.phonenumber;
    var memo = req.body.memo;

    try {
        Reader.findAll({
            where: {
                username: username
            }
        }).then(function(users) {
            console.log('users are:', JSON.stringify(users));
            // r.version++;
            users.forEach(function(u) {
                u.version++;
                // console.log('fff----',firstname,u.version++);
                u.firstname = firstname
                u.lastname = lastname,
                    u.middlename = middlename,
                    u.church = church,
                    u.groups = groups,
                    u.role = role,
                    u.email = email,
                    u.phonenumber = phonenumber,
                    u.memo = memo,
                    u.gender = gender,
                    u.birth = birth,
                    u.updatedAt = now
                u.save();
            })

            res.send('Updated!');
        });

    } catch (err) {
        console.log(err);
    }

    // });
});

/*register new reader*/
router.post('/', function(req, res) {
    // console.log('body:', req.body);

    var now = Date.now();
    var username = req.body.username;
    var password = req.body.password;


    Reader.create({

        username: username,
        password: password,
        createdAt: now,
        version: 0
    }).then(function(p) {
        console.log('created.' + JSON.stringify(p));

        res.status(200).send('Insert new user ok!');
    }).catch(function(err) {
        console.log('failed: ' + err);

        res.render('error', { error: err })
    });

    /*
        var connection = mysql.createConnection(config.connection);
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
        */

});

module.exports = router;