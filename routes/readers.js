var express = require('express');


var router = express.Router();
// const Sequelize = require('sequelize'); //ORM替代直接操作的mysql
var mysql = require('mysql');
var config = require('../config');
var jwt = require('jsonwebtoken');
var auth = require('../middleware/auth');
var Reader = require('../models/reader');

router.get('/check-state', auth.verifyToken, (req, res) => {

  let content = {
    success: true,
    message: 'Successfully logged in'
  }
  res.send(content);

});

router.get('/', function(req, res) {

  Reader.findAll({
    attributes: ['username', 'firstname', 'lastname', 'middlename', 'email', 'phonenumber', 'church', 'groups', 'finishquestion', 'readerid', 'role'],
    where: {
      $or: [{
          role: 'initiator'

        },
        {
          role: null

        },
         {
          role: 'null'

        }
      ]

    },
    order: [
      // Will escape username and validate DESC against a list of valid direction parameters
      ['role', 'DESC'],
    ]
  }).then(function(readers) {
    console.log(JSON.stringify(readers));
    res.send(readers);
  });


  // }) 

});

router.get('/username/:username', function(req, res) {

  var username = req.params.username;
  console.log('username get:', username);
  try {
    Reader.findAll({
      attributes: ['firstname', 'lastname', 'middlename', 'email', 'phonenumber', 'church', 'groups', 'finishquestion', 'readerid'],
      where: {
        username: username
      }
    }).then(function(readers) {
      console.log(JSON.stringify(readers));
      res.send(readers);
    });


  } catch (err) {
    console.log(err);
  }

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
        console.log('++++++++++', JSON.stringify(reader));
        console.log('---------------', reader.readerid);
        var token = jwt.sign({
          id: reader.username,
          role: reader.role
        }, config.secretToken, {
          expiresIn: '1d',
          algorithm: 'HS256'
        });
        res.json({
          readerid: reader.readerid,
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


router.put('/authorize', function(req, res) {
  console.log('PUT: body:', req.body);
  // var now = Date.now();
  var readerid = req.body.readerid;
  var role = null;
  if (req.body.role == 'initiator') {
    role = 'initiator'
  }

  try {
    Reader.findAll({
      where: {
        readerid: readerid
      }
    }).then(function(users) {
      console.log('users are:', JSON.stringify(users));
      // r.version++;
      users.forEach(function(u) {
        // u.version++;
        // console.log('fff----',firstname,u.version++);

        u.role = role,
          u.save();
      })

      res.send('Authorized!');
    });

  } catch (err) {
    console.log(err);
  }

  // });
});


router.put('/', function(req, res) {
  console.log('PUT: body:', req.body);

  var now = Date.now();
  var username = req.body.username;
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var middlename = req.body.middlename;
  // var role = req.body.role;
  var gender = req.body.gender;
  var birth = req.body.birth;
  var church = req.body.church;
  var groups = req.body.groups;
  var email = req.body.email;
  var phonenumber = req.body.phonenumber;
  var memo = req.body.memo;
  var password = req.body.password;

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
        u.password = password;
        u.firstname = firstname,
          u.lastname = lastname,
          u.middlename = middlename,
          u.church = church,
          u.groups = groups,
          // u.role = role,
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
  var email = req.body.email


  Reader.create({

    username: username,
    password: password,
    email: email,
    createdAt: now,
    version: 0
  }).then(function(p) {
    console.log('created.' + JSON.stringify(p));

    res.status(200).send('Insert new user ok!');
  }).catch(function(err) {
    console.log('failed: ' + err);

    res.render('error', {
      error: err
    })
  });

});



module.exports = router;
