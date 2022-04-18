let mongoose = require('mongoose')
let Schema = mongoose.Schema


let productSchema = new Schema({
    name : String,
    category: String,
    price: Number,
    imgURL : String
},{
    timestamps: true,
    versionKey: false
});


module.exports = mongoose.model('Product',productSchema);