var express = require('express');
var Pro = require('../controllers/product');
var Mid = require('../../config/middleware');

module.exports = function (app) {
    var ProRoutes = express.Router();

    ProRoutes.route('/')
        .get(Mid.middleware,Pro.list2)
        .post(Mid.middleware,Pro.create);
    ProRoutes.route('/search')
        .get(Mid.middleware,Pro.list3);
    ProRoutes.route('/upload')
        .post(Mid.middleware,Pro.upload);
    ProRoutes.route('/unlink')
        .post(Mid.middleware,Pro.removeFile);
    ProRoutes.route('/:id')
        .get(Mid.middleware,Pro.getbyid)
        .put(Mid.middleware,Pro.update)
        .delete(Mid.middleware,Pro.delete);
    app.use('/api/products', ProRoutes);
};