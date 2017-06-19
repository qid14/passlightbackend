var express = require('express');
var router = express.Router();
// const Sequelize = require('sequelize'); //ORM替代直接操作的mysql
var mysql = require('mysql');
var config = require('../config');
var jwt = require('jsonwebtoken');
var auth = require('../middleware/auth');
var BookReader = require('../models/bookreadermodel');
var Reader = require('../models/reader');
var moment = require('moment');
// console.log('bookReaders-----------No.1', BookReader);

router.all('*', function(req, res, next) {
    console.log('Access-Control-Allow-Origin in questions');
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000'); //记得在HOSTS文件中加入127.0.0.1 local.host
    res.set('Access-Control-Allow-Credentials', true);
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', 'X-Requested-Width,Content-Type,Authorization');
    if ('OPTIONS' == req.method) return res.sendStatus(200);
    next();
})
router.get('/check-state', auth.verifyToken, (req, res) => {

    let content = {
        success: true,
        message: 'Successfully logged in'
    }
    res.send(content);

});

router.get('/', (req, res) => {
    // console.log('bookreaders:', req);
    // BookReader.findAll().then(function(results) {

    //     if (results.length > 0) {
    //         results.forEach(function(r) {
    //             r.duration = moment(r.startdate, "YYYY-MM-DD").fromNow();
    //             r.save();
    //         })

    //     }
    // })
    BookReader.findAll().then(function(results) {
        if (results.length > 0) {
            results.forEach(function(r) {
                r.duration = moment(r.startdate, "YYYY-MM-DD").fromNow();
                r.save();
            })

        }
        console.log('bookReaders-----------No.2:', JSON.stringify(results));
        res.send(results);
    });

});


//新建传递关系
router.post('/', (req, res) => {
    var bookid = req.body.bookid;
    var username = req.body.username;
    var email = req.body.email;
    var readerid =60001;
    var startdate = req.body.startdate;
    var ss = moment(startdate, "MM/DD/YYYY");
    // console.log(typeof startdate,ee);
    var enddate = ss.add(1, 'months')
    // console.log('startdate bookReaders-----------No.6:', enddate);
    var duration = moment(startdate, "MM/DD/YYYY").fromNow();
    // console.log('duration: bookReaders-----------No.7:', duration);
    var sequence = 1;
    Reader.findAll({
        where: {
            username: username,
            email: email
        }
    }).then(function(users) {
        console.log('bookReaders-----------No.3:', JSON.stringify(users));
        if (users.length > 0) {
            readerid=users[0].readerid;
            console.log('bookReaders-----------No.4:',readerid);

            BookReader.findAll({
                where: {
                    bookid: bookid
                }
            }).then(function(result) {

                if (result.length > 0) {
                    var maxsequence = Math.max.apply(Math, result.map(function(o) {
                        return o.sequence;
                    }))
                    console.log('bookReaders-----------No.5:', maxsequence);


                    BookReader.create({

                        bookid: bookid,
                        readerid: readerid,
                        startdate: startdate,
                        sequence: maxsequence + 1,
                        enddate: enddate,
                        duration: duration

                    }).then(function(p) {
                        console.log('Bookreader created.' + JSON.stringify(p));

                        res.status(200).send('Insert new bookreader record ok!');
                    }).catch(function(err) {
                        console.log('failed: ' + err);

                        res.render('error', {
                            error: err
                        })
                    });
                }
            })
        }
    })

})


//查看借阅关系时要先刷新纪录
router.put('/', (req, res) => {

    // var startdate = req.body.startdate;
    // var ss = moment(startdate, "MM/DD/YYYY");

    // var duration = moment(startdate, "MM/DD/YYYY").fromNow();
    // console.log('duration: bookReaders-----------No.8:', duration);

    BookReader.findAll().then(function(results) {
        // console.log('bookReaders-----------No.9:', JSON.stringify(results));

        if (results.length > 0) {
            results.forEach(function(r) {
                r.duration = moment(r.startdate, "YYYY-MM-DD").fromNow();
                console.log('bookReaders-----------No.10:',
                    r.startdate)
                console.log('bookReaders-----------No.11:',
                    r.duration)

                r.save();
            })

        }
    })

})

// router.get('/username/:username', function(req, res) {
//     var username = req.params.username;
//     console.log('username get:',username);
//     try {
//         BookReader.findAll({
//             attributes: ['finishquestion', 'BookReaderid'],
//             where: {
//                 username: username
//             }
//         }).then(function(BookReaders) {
//             console.log(JSON.stringify(BookReaders));
//             res.send(BookReaders);
//         });

//     } catch (err) {
//         console.log(err);
//     }
// });

// router.post('/login', function(req, res) {
//     var username = req.body.username;
//     var password = req.body.password;
//     try {
//         BookReader.findOne({
//             where: {
//                 username: username,
//                 password: password
//             }
//         }).then(function(BookReader) {
//             if (BookReader) {
//                 console.log('+++++++', JSON.stringify(BookReader));
//                 var token = jwt.sign({
//                     id: BookReader.username,
//                     role: BookReader.role
//                 }, config.secretToken, {
//                     expiresIn: '1d',
//                     algorithm: 'HS256'
//                 })
//                 res.json({
//                     username: username,
//                     token: token
//                 });
//             } else {
//                 return res.sendStatus(401);
//             }

//         }).catch(function(err) {
//             console.log(err);
//             return res.sendStatus(401);
//         })


//     } catch (err) {
//         console.log(err);
//     }

// });


// router.put('/', function(req, res) {
//     console.log('PUT: body:', req.body);

//     var now = Date.now();
//     var username = req.body.username;
//     var firstname = req.body.firstname;
//     var lastname = req.body.lastname;
//     var middlename = req.body.middlename;
//     var role = req.body.role;
//     var gender = req.body.gender;
//     var birth = req.body.birth;
//     var church = req.body.church;
//     var groups = req.body.groups;
//     var email = req.body.email;
//     var phonenumber = req.body.phonenumber;
//     var memo = req.body.memo;
//     var password = req.body.password;

//     try {
//         BookReader.findAll({
//             where: {
//                 username: username
//             }
//         }).then(function(users) {
//             console.log('users are:', JSON.stringify(users));
//             // r.version++;
//             users.forEach(function(u) {
//                 u.version++;
//                 // console.log('fff----',firstname,u.version++);
//                 u.password = password;
//                 u.firstname = firstname,
//                     u.lastname = lastname,
//                     u.middlename = middlename,
//                     u.church = church,
//                     u.groups = groups,
//                     u.role = role,
//                     u.email = email,
//                     u.phonenumber = phonenumber,
//                     u.memo = memo,
//                     u.gender = gender,
//                     u.birth = birth,
//                     u.updatedAt = now
//                 u.save();
//             })

//             res.send('Updated!');
//         });

//     } catch (err) {
//         console.log(err);
//     }

//     // });
// });
// bookreaderid: {
//     type: Sequelize.BIGINT,
//     primaryKey: true
// },
// bookid: Sequelize.BIGINT,
// readerid: Sequelize.BIGINT,
// sequence: Sequelize.INT,
// startdate: Sequelize.DATE,
// enddate: Sequelize.DATE,
// duration:Sequelize.DECIMAL
/*register new BookReader*/
/*
router.post('/', function(req, res) {
    console.log('body:', req.body);

    var now = Date.now();
    var bookid = req.body.bookid;
    var readerid = req.body.readerid;
    var startdate = req.body.startdate;


    BookReader.create({

        bookid: bookid,
        readerid: readerid,
        startdate: startdate,

    }).then(function(p) {
        console.log('created.' + JSON.stringify(p));

        res.status(200).send('Insert new bookreader record ok!');
    }).catch(function(err) {
        console.log('failed: ' + err);

        res.render('error', {
            error: err
        })
    });

});
*/

module.exports = router;