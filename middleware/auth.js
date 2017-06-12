var config = require('../config');
var jwt = require('jsonwebtoken');

module.exports = {

    verifyToken: ( (req, res, next) => {
        console.log('----------------');
        console.log('--1',req.body.token );
        console.log('--3',req.headers['x-access-token']);
        console.log('--2',req.query.token);
        console.log('--4-------------',req.headers['authorization']);
        let token = req.body.token || req.query.token || req.headers['x-access-token'] ||  req.headers['authorization'];

        if( token ) {
            console.log('5:',typeof token);
            var tok= token.substr(7).trim();
            console.log('6:',tok);
            jwt.verify(tok, config.secretToken, (err, decoded) => {

                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });    
                } else {
                    // all good, continue
                    req.decoded = decoded; 
                    next();
                }
            });

        }  else {
            console.log('no token');
            res.send({ success: false, message: 'No token exists.' });
            
        }
    })

}