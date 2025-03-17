const express = require('express');
const { login, register, myInfo, logOut } = require('../controller/userController');
const { isAuthenticateUser } = require('../middleware/isAuthenticate');
const router = express.Router();

router.route('/user/login').post(login);
router.route('/user/logout').get(isAuthenticateUser,logOut);
router.route('/user/register').post(register)
router.route('/user/myInfo').get(isAuthenticateUser,myInfo)

module.exports = router;