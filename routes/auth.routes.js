const express = require('express');
const router = express.Router();
const { index, login, logout } = require('../controller/auth.controller')


router.get('/login', index)
router.post('/login', login)
router.get('/logout', logout)

module.exports = router