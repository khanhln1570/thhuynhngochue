const express = require('express');
const router = express.Router();
const { index } = require('../controller/home.controller')


router.get('/', index)

module.exports = router