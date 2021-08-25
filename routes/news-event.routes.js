const express = require('express');
const router = express.Router();
const { index } = require('../controller/news-event.controller')

router.get('/', index)

module.exports = router