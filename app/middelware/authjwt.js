const jwt = require('jsonwebtoken');
const config = require('../config');
const Role = require('../models/Role');
const User = require('../models/User');

const verifyToken = async (req,res,next) => {

try {
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader === undefined) return res.status(403).json({messagess: "token not found"});

    const token = bearerHeader.split(' ')[1];
    
    let decoded = jwt.verify(token,config.SECRET);
    req.userId = decoded.id;
    const user = await User.findById(req.userId,{password: 0});

    if (!user) {
        return res.status(404).json({message: "not user found"});
    }

    next();    
} catch (error) {
    return res.status(401).json({message: "Unauthorized"})
}

    
}


const isModerator = async (req,res,next) => {
    let user = await User.findById(req.userId,{password: 0}).populate('roles');
    const isRole = user.roles.find(function(role){
        return role.name === 'moderador';
    });
    if (!isRole) return res.json({message: "Unauthorized"})

    next();
}

const isAdmin = async (req,res,next) => {
    let user = await User.findById(req.userId,{password: 0}).populate('roles');
    const isRole = user.roles.find(function(role){
        return role.name === 'admin';
    });
    if (!isRole) return res.json({message: "Unauthorized"})

    next();

}

module.exports = {
    verifyToken,
    isModerator,
    isAdmin
}