var mongoose = require('mongoose');
var Cat = mongoose.model('category');

var CatCtrl = function () { };


CatCtrl.prototype.create = function (req, res) {
    var urole = new Cat(req.body);
    urole.save(function (err, dta) {
        if (err) {
            console.log('error occured..' + err);
        }
        else {
            res.json(dta);
        }
    });
}

CatCtrl.prototype.list = function (req, res) {
    Cat.find(function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

CatCtrl.prototype.getbyid = function (req, res) {
    Cat.find({ _id: req.params.id }).exec(function (err, usrrs) {
        if (err) console.log('error occured..' + err);
        res.json(usrrs);
    });
}

CatCtrl.prototype.update = function (req, res) {
    Cat.findByIdAndUpdate({ _id: req.params.id }, req.body, function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

CatCtrl.prototype.delete = function (req, res) {
    Cat.findByIdAndRemove({ _id: req.params.id }, function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

module.exports = new CatCtrl();