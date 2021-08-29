const express = require('express');
const router = express.Router();
const { index, getOne } = require('../controller/news-event.controller')

router.get('/', index)
router.get('/:id', getOne)
module.exports = router