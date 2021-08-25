const express = require('express');
const router = express.Router();
const { index } = require('../controller/contact.controller')


router.get('/', index)
module.exports = router