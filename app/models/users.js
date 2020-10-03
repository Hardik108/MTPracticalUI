var mongoose = require('mongoose');
var bcrypt = require('bcryptjs')
Schema = mongoose.Schema;
var usersSchema = new Schema({
    emailaddress: { type: String, unique: true },
    username: { type: String },
    password: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
usersSchema.pre('save', function (next) {
    let usr = this;
    if (!usr.isModified('password')) return next();
    if (usr.password) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) return next(err);
            bcrypt.hash(usr.password, salt, (er, hash) => {
                if (er) return next(er);
                usr.password = hash;
                console.log(usr);

                next(usr);
            })
        })
    }
})
module.exports = mongoose.model('users', usersSchema);