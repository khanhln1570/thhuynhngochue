const express = require('express');
const router = express.Router();
const { index, getOne, chaodonnamhoc } = require('../controller/news-event.controller')

router.get('/', index)
router.get('/:id', getOne)
router.get('/su-kien/chao-don-nam-hoc', chaodonnamhoc)
module.exports = router