const express = require('express');
const router = express.Router();
const { index, login } = require('../controller/auth.controller')


router.get('/', index)
router.post('/', login)

module.exports = router