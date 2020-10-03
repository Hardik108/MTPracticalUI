var mongoose = require('mongoose');
var Products = mongoose.model('products');
var multer = require('multer');
var path = require('path');
var fs= require('fs');
var ppectrl = function () { };

let imgdata;

ppectrl.prototype.create = function (req, res) {
    var urole = new Products(req.body);
    urole.save(function (err, dta) {
        if (err) {
            var e = "";
            if (err.code == 11000) {
                e = "EPI already exists with same title";
            } else {
                e = err;
            }
            console.log('error occured..' + err);
            return res.status(400).json({ msg: e });
        }
        else {
            res.json(dta);
        }
    });
}

ppectrl.prototype.list = function (req, res) {
    Products.find(function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

ppectrl.prototype.list2 = function (req, res) {
    let offset = parseInt(req.query.offset);
    let size = parseInt(req.query.size);
    Products.find().skip(offset).limit(size).exec(function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

ppectrl.prototype.list3 = function (req, res) {
    let keyword = req.query.keyword;
    Products.find({ title: { "$regex": keyword, "$options": "i" } }).exec(function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

ppectrl.prototype.upload = function (req, res, next) {
    var storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, path.join(__dirname, '../../uploads/products'));
        },
        filename: function (req, file, callback) {
            var ext = file.originalname.split('.');
            imgdata = Date.now() + '.' + ext[1];
            callback(null, imgdata);
        }
    });

    var upload = multer({ storage: storage }).single('product_img');
    upload(req, res, function (err) {
        if (err) {
            console.log('Error Occured' + err);
            return;
        }
        else {
            res.json(imgdata);
            next();
        }
    });
}

ppectrl.prototype.removeFile=function(req,res,next){
    let filepath=path.join(__dirname, '../../uploads/products/');
    fs.stat(filepath+req.body.filename, function (err, stats) {
        if (err) {
            return console.error(err);
        }
        fs.unlink(filepath+req.body.filename,function(err){
                if(err) return console.log(err);
                console.log('file deleted successfully');
                res.json('removed successfully')
        });  
    });
}

ppectrl.prototype.getbyid = function (req, res) {
    Products.find({ _id: req.params.id }).exec(function (err, usrrs) {
        if (err) console.log('error occured..' + err);
        res.json(usrrs);
    });
}

ppectrl.prototype.update = function (req, res) {
    Products.findByIdAndUpdate({ _id: req.params.id }, req.body, function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

ppectrl.prototype.delete = function (req, res) {
    Products.findByIdAndRemove({ _id: req.params.id }, function (er, dt) {
        if (er) {
            console.log('error occured..' + er);
        }
        else {
            return res.json(dt);
        }
    });
}

module.exports = new ppectrl();