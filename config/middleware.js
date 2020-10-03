var mongoose = require('mongoose');
var Users = mongoose.model('users');
var settings = require('./config.js');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

var middleware = function () { };


middleware.prototype.middleware = function (req, res, next) {
    let authToken=req.headers.authorization;
    if(authToken){
        jwt.verify(authToken, settings.secret, function(err, decoded) {
            if(err){
                console.log(err);
                return res.json({ msg: 'Unauthorized Access..' });                
            }
        next();
        });
    }else{
        return res.json({ msg: 'Unauthorized Access..' });
    }
}

module.exports = new middleware();