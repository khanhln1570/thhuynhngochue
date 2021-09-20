const express = require('express');
const router = express.Router();
const { index, message } = require('../controller/contact.controller')


router.get('/', index)
router.post('/', message)
module.exports = router