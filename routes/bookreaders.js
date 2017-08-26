var express = require('express');
var router = express.Router();
// const Sequelize = require('sequelize'); //ORM替代直接操作的mysql
var mysql = require('mysql');

var config = require('../config');
var jwt = require('jsonwebtoken');
var auth = require('../middleware/auth');
var BookReader = require('../models/bookreadermodel');
var Reader = require('../models/reader');
var Book = require('../models/book');
var _ = require('underscore');

//关联表查询
// Reader.hasMany(BookReader);
// BookReader.belongsTo(Reader);
// console.log('Reader     ', Reader);
// console.log('BookReader     ', BookReader);
// , { foreignKey: 'readerid' });


// BookReader.hasMany(Reader);
// Reader.belongsTo(BookReader);

// Book.hasMany(BookReader);
// BookReader.belongsTo(Book);

var moment = require('moment');
const nodemailer = require('nodemailer');

// var lolex = require("lolex");
// var clock = lolex.install();
// console.log('clock is :',lolex,clock);
/*
var sinon = require("https://cdnjs.cloudflare.com/ajax/libs/sinon.js/1.15.4/sinon.min.js");
var clock = sinon.useFakeTimers();
*/

// clock.uninstall();


// console.log('bookReaders-----------No.1', BookReader);
var schedule = require('node-schedule');
var counter = 0,
  taskSchedule = new schedule.RecurrenceRule(); //for Update duration records in database
// var taskSchedule2 = new schedule.RecurrenceRule();

taskSchedule.minute = 2;

function reportOnSchdeule() {
  //increment the counter
  counter++;

  //report that the scheduled task ran
  console.log('The scheduled task ran. This is iteration #: ' + counter);

  BookReader.findAll({
    // include: [{
    //     model:Reader
    // }],
    where: {
      enddate: null
    }
  }).then(function(bookreaders) {
    var maillist = [];
    console.log('bookReaders-----------No.3:', JSON.stringify(bookreaders));
    if (bookreaders.length > 0) {
      bookreaders.forEach(function(bookreader) {
        // console.log('bookreader.startdate No.8', bookreader);

        b = moment(bookreader.startdate);
        a = moment(new Date());


        // console.log('bookreader.startdate No.9', a.diff(b, 'days'));
        bookreader.duration = a.diff(b, 'days');

        // bookreader.duration = Math.floor(( moment.now()-bookreader.startdate  ) / 86400000);
        console.log('bookReaders-----------No.10:', bookreader.duration);
        bookreader.save();
      })

      var connection = mysql.createConnection(config.connection);
      var querystr = `
        SELECT a.email,b.duration,c.bookname
        FROM test.readers as a
        left join test.bookreaders as b
        ON a.readerid = b.readerid
        left join test.books as c on b.bookid = c.bookid
        WHERE startdate is not null;
            `;
      connection.query(querystr,
        function(err, rows) {
          if (err) console.log('Error selecting : s%', err);
          console.log('result in bookreader 1:', rows);

          if (typeof rows !== "undefined" && rows.length > 0) {
            rows.forEach(function(reader) {
              // console.log('bookreader.startdate No.8', bookreader);

              if (reader.duration > 30) {
                maillist.push(reader.email)

              }
            })
          } else {
            console.log('Rows is undefined!');
            return;
          }
          console.log('maillist: BookReader 2:', maillist);
          var mailListstr = _.uniq(maillist).toString();
          console.log('maillist: BookReader 3:', mailListstr);
          ///////send email 
          // create reusable transporter object using the default SMTP transport

          let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // secure:true for port 465, secure:false for port 587
            auth: {
              user: 'passinglightministry@gmail.com',
              pass: 'Goodluck'
            }
          });

          // setup email data with unicode symbols
          let mailOptions = {
            from: '"Passing Light Ministry👻" <passinglightministry@gmail.com>', // sender address
            to: mailListstr, // list of receivers
            subject: 'A message from Passing Light Ministry', // Subject line
            text: 'YOUR COURTESY DUE DATE MESSAGE', // plain text body
            html: '<b>YOUR COURTESY DUE DATE MESSAGE: The book Queen of the Dark Chamber is due. Please pass it to another friend and log in to your account to verify it.</b>' // html body
          };

          // send mail with defined transport object
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
          });


        });

      connection.end();


    }

  })

}

/*用于快速测试reportOnSchdeule函数是否更新了数据库*/
// var myInterval = setInterval(reportOnSchdeule, 5000, "Interval");

// function stopInterval() {
//     clearTimeout(myInterval);
//     //myInterval.unref();
// }
// setTimeout(stopInterval, 31000);
// */


schedule.scheduleJob(taskSchedule, reportOnSchdeule);
console.log('The schdule has been initialzed');



// var date = new Date("2017-07-7");
//         var clock = lolex.install(date);
//         clock.setTimeout(schedule.scheduleJob(taskSchedule, reportOnSchdeule),3800);
//         console.log(moment(clock.now));
// console.log('--------xxxxxxxx')

//     clock.uninstall();
// ,15);
// console.log('setTimeout is :',setTimeout);
// clock.next()
// setTimeout(fn, 15); // Schedules with clock.setTimeout

// var rule = new schedule.RecurrenceRule();
// rule.minute = 1;
// console.log('rule is:',rule);
// var j = schedule.scheduleJob(rule, function(){
//   console.log('The answer to life, the universe, and everything!');
// });
// console.log('j is',j);

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


router.get('/countreading', (req, res) => {
  BookReader.findAndCountAll({
      where: {
        enddate: null
      }
    })
    .then(result => {
      console.log('count:', result.count);

      res.send(result.count.toString());
    });
});

router.get('/countall', (req, res) => {
  BookReader.findAndCountAll({

    })
    .then(result => {
      console.log('count:', result.count);

      res.send(result.count.toString());
    });
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

//query sequence
router.post('/sequence', (req, res) => {

  // var bookid = req.body.bookid;
  var readerid = req.body.readerid;
  // console.log('bookid:', bookid,readerid);
  // res.send('ok');
  var connection = mysql.createConnection(config.connection);
  var qstr = 'SELECT bookid from test.bookreaders where readerid=' + readerid;
  // var result = [];
  // console.log(connection);
  connection.query(qstr,
    function(err, rows) {
      if (err) console.log('Error selecting : s%', err);
      rows.forEach(function(result1) {

        var querystr =
          'SELECT b.bookid,a.username,b.sequence from test.readers AS a left join test.bookreaders as b' +
          ' ON a.readerid = b.readerid where bookid=' + result1.bookid
        // + ' AND a.readerid='+readerid;
        console.log('99999:', querystr);;
        connection.query(querystr,
          function(err, rows2) {
            if (err) console.log('Error selecting : s%', err);


            // result = rows2;
            // console.log('mmmmmmm:', result);
            res.send(rows2);
          });
        // console.log('dddddddd', result);
        
        // console.log('Success select bookid!',result1.bookid);    
        // res.send(result1.bookid)
      });
      connection.end();


    });


  // connection.end();






  /*
    BookReader.find({ 
      where: { bookid: bookid },
       order: [
          'sequence'
        ],
      include: [Reader] })


      .then(function(results) {
        if (results.length > 0) {
          results.forEach(function(r) {
            // console.log('sequence-----------No.2:', r);
          })

        }
        console.log('sequence-----------No.3:', JSON.stringify(results));
        res.send(results);
      });
      */
});



//新建传递关系
router.post('/', (req, res) => {
  var bookid = req.body.bookid;
  var username = req.body.username;
  var email = req.body.email;
  var readerid = 60001;
  var startdate = req.body.startdate;
  var ss = moment(startdate, "MM/DD/YYYY");
  // console.log(typeof startdate,ee);
  // var enddate = ss.add(1, 'months')
  // console.log('startdate bookReaders-----------No.6:', enddate);
  var duration = enddate - startdate;
  // moment(startdate, "MM/DD/YYYY").fromNow();
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
      readerid = users[0].readerid;
      console.log('bookReaders-----------No.4:', readerid);

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
