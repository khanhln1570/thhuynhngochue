const express = require('express');
const router = express.Router();
const { index, getOne } = require('../controller/library.controller')


router.get('/', index)
router.get('/bai-dang/:id', getOne)
module.exports = router