const User = require('../models/User');
const jwt = require('jsonwebtoken');

const config = require('../config');
const Role = require('../models/Role');

const signUp = async (req,res)=>{
    const {username, email, password, roles} = req.body;
    
    const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password)
    })

    // verifico si hay roles y si existen 
    if (roles) {
        const foundRoles = await Role.find({name: {$in: roles}});
        newUser.roles = foundRoles.map(role => role._id);
    } else {
        const role = await Role.findOne({name: "user"});
        newUser.roles = [role._id]
    }

    const saveUser = await newUser.save();

    const token = jwt.sign({id: saveUser._id},config.SECRET,{
        expiresIn: 86400
    })
    return res.status(200).json({token: token});

}

const signIn = async (req,res) => {
    const {email, password} = req.body;
    const userFound = await User.findOne({email: email}).populate('roles');
    
    if (!userFound) return res.status(400).json({message: "user not found"});

    const matchPassword = await User.comparePassword(password, userFound.password);
    
    if (matchPassword) {
        const token = jwt.sign({id: userFound._id}, config.SECRET,{
            expiresIn: 86400
        })

        return res.status(200).json({token: token})
    }
    return res.status(401).json({token : null,message: "password incorrect"});
}

module.exports = {
    signUp,
    signIn
}