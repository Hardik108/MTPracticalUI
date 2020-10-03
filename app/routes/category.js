var express = require('express');
var cats = require('../controllers/category');
module.exports = function (app) {
    var ltypeRoute = express.Router();

    ltypeRoute.route('/')
        .get(cats.list)
        .post(cats.create);
    ltypeRoute.route('/:id')
        .get(cats.getbyid)
        .put(cats.update)
        .delete(cats.delete);
    app.use('/api/categories', ltypeRoute);
};