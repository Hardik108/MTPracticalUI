var mongoose = require('mongoose');
Schema = mongoose.Schema;
var categorySchema = new Schema({
    title: String,
    status: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('category', categorySchema);