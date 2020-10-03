var mongoose = require('mongoose');
Schema = mongoose.Schema;
var ProductSchema = new Schema({
    title: { type: String, unique: true },
    product_img: String,
    price:Number,
    discount:Number,
    category: { type: Schema.Types.ObjectId, ref: 'category' },
    subcategory: { type: Schema.Types.ObjectId, ref: 'subcategory' },
    status: { type: String, default: 'active' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('products', ProductSchema);