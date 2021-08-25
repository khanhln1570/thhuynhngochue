const express = require('express');
const router = express.Router();

const { index, about_danhnhan, about_cnv } = require('../controller/about.controller')

// get about
router.get('/', index);

// get about-danhnhan
router.get('/gioi-thieu-danh-nhan', about_danhnhan)

// get about-cnv
router.get('/gioi-thieu-cnv', about_cnv)
module.exports = router