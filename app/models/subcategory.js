var mongoose = require('mongoose');
Schema = mongoose.Schema;
var subcategorySchema = new Schema({
    title: String,
    category: { type: Schema.Types.ObjectId, ref: 'category' },
    status: { type: String, default: 'active' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('subcategory', subcategorySchema);