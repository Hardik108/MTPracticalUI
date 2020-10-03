var mongoose = require('mongoose');
var Users = mongoose.model('users');
var settings = require('../../config/config.js');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

var usersCtrl = function () { };
usersCtrl.prototype.create = function (req, res) {
    if (req.body.emailaddress && req.body.password) {
        var userdata = new Users(req.body);
        userdata.save(function (err, dta) {
            if (err) {
                var e = "";
                if (err.code == 11000) {
                    e = "User already exists with same emailaddress";
                } else {
                    e = err;
                }
                console.log('error occured..' + err);
                return res.status(400).json({ msg: e });
            }
            else {
                res.status(201).json({ msg: 'User Registered Successfully.', data: dta });
            }
        });
    } else {
        res.status(422).json({ msg: 'Invalid Inputs.' });
    }
}

usersCtrl.prototype.list = function (req, res) {
    Users.find().exec(function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

usersCtrl.prototype.auth = function (req, res) {
    Users.find({ emailaddress: req.body.emailaddress }).exec(function (err, usrrs) {
        if (err) {
            console.log('error occured..' + err);
            return res.status(404).json({ msg: 'Unknown User.' });
        }
        else if (usrrs.length <= 0) {
            return res.status(401).json({ msg: 'Incorrect Creadentials' });
        }
        else {
            bcrypt.compare(req.body.password, usrrs[0].password, function (err, resp) {
                if (resp === true) {
                    let token = jwt.sign({ data: usrrs[0] },
                        settings.secret,
                        {
                            expiresIn: '2400h' // expires in 24 hours
                        }
                    );
                    return res.status(200).json({ data: token, msg: 'User Logged-In Successfully.', fdata: usrrs[0] });
                } else {
                    return res.status(401).json({ msg: 'Incorrect Creadentials' });
                }

            });
        }
    });
}


usersCtrl.prototype.update = function (req, res) {
    Users.findByIdAndUpdate({ _id: req.params.id }, req.body, function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json({ data: dt, msg: 'User Updated Successfully.' });
        }
    });
}

usersCtrl.prototype.delete = function (req, res) {
    Users.findByIdAndRemove({ _id: req.params.id }, function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json({ data: dt, msg: 'User Deleted Successfully.' });
        }
    });
}

usersCtrl.prototype.patcher = function (req, res) {
    var updateObject = req.body;
    Users.update({ _id: req.params.id }, { $set: updateObject }, function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json({ data: dt, msg: 'User Updated Successfully.' });
        }
    });
}

module.exports = new usersCtrl();
