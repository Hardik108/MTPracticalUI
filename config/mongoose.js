/*
Created By : Hardik Lakhani
*/
var mongoose = require('mongoose');
var config = require('./config.js');
module.exports = function () {
    var db = mongoose.connect(config.connection + config.dbName,{useMongoClient: true});    
    mongoose.connection.on('connected', function () {
        console.log('Mongoose default connection open for: ' + config.dbName);
    });
    mongoose.connection.on('error', function (err) {
        console.log('Mongoose default connection error: ' + err);
    });
    mongoose.connection.on('disconnected', function () {
        console.log('Mongoose default connection disconnected');
    });
    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });
    require('../app/models/users');
    require('../app/models/product');
    require('../app/models/category');
    require('../app/models/subcategory');

    return db;
}
