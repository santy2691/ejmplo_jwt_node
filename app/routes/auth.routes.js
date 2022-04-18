const router = require('express').Router()
const authController = require('../controller/authController');


router.post('/signup',[
    authController.signUp
])


router.post('/signin',[
    authController.signIn
])


module.exports = router;