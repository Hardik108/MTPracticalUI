var express = require('express');
var subcats = require('../controllers/subcategory');
module.exports = function (app) {
    var subcatsRoutes = express.Router();

    subcatsRoutes.route('/')
        .get(subcats.list)
        .post(subcats.create);
    subcatsRoutes.route('/:id')
        .get(subcats.getbyid)
        .put(subcats.update)
        .delete(subcats.delete);
    app.use('/api/subcategories', subcatsRoutes);
};