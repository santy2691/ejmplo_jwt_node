let mongoose = require('mongoose')
let Schema = mongoose.Schema


let rolesSchema = new Schema({
    name : String,
},{
    versionKey: false
});


module.exports = mongoose.model('Role',rolesSchema);