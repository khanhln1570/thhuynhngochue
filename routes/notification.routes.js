const express = require('express');
const router = express.Router();
const { index, getOne, indexPublic } = require('../controller/notification.controller')

router.get('/', index)
router.get('/cong-khai/', indexPublic)

router.get('/:id', getOne)
module.exports = router