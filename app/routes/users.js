var express = require('express');
var users = require('../controllers/users');
module.exports = function (app) {
    var usersRoute = express.Router();

    usersRoute.route('/')
        .get(users.list)
        .post(users.create);
    usersRoute.route('/auth')
        .post(users.auth);
    usersRoute.route('/:id')
        .put(users.update)
        .patch(users.patcher)
        .delete(users.delete);
    app.use('/api/users', usersRoute);
};