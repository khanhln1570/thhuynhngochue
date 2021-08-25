const express = require('express');
const router = express.Router();
const { index } = require('../controller/notification.controller')

router.get('/', index)
module.exports = router