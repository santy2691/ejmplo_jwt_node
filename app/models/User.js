let mongoose = require('mongoose');
let bcrypt = require('bcryptjs');

let Schema = mongoose.Schema


let userSchema = new Schema({
  username: {
      type: String,
      unique: true
  },
  email : {
      type: String,
      unique: true
  },
  password: {
      type: String,
      required: true
  },
  roles: [{
      ref : "Role",
      type: Schema.Types.ObjectId
  }]
},{
    timestamps: true,
    versionKey: false
});


userSchema.statics.encryptPassword = async (password) =>{
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);  
    return  hash;
}

userSchema.statics.comparePassword = async (password, recivedPassword) => {
    return await bcrypt.compare(password,recivedPassword);
}

module.exports = mongoose.model('User',userSchema);