var mongoose = require('mongoose');
var SubCats = mongoose.model('subcategory');

var SubCatsCtrl = function () { };


SubCatsCtrl.prototype.create = function (req, res) {
    var urole = new SubCats(req.body);
    urole.save(function (err, dta) {
        if (err) {
            console.log('error occured..' + err);
        }
        else {
            res.json(dta);
        }
    });
}

SubCatsCtrl.prototype.list = function (req, res) {
    SubCats.find().populate('category').exec(function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

SubCatsCtrl.prototype.getbyid = function (req, res) {
    SubCats.find({ _id: req.params.id }).populate('category').exec(function (err, usrrs) {
        if (err) console.log('error occured..' + err);
        res.json(usrrs);
    });
}

SubCatsCtrl.prototype.update = function (req, res) {
    SubCats.findByIdAndUpdate({ _id: req.params.id }, req.body, function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

SubCatsCtrl.prototype.delete = function (req, res) {
    SubCats.findByIdAndRemove({ _id: req.params.id }, function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

module.exports = new SubCatsCtrl();