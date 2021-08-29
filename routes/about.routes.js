const express = require('express');
const router = express.Router();

const { index, about_danhnhan, about_cnv, hieutruong } = require('../controller/about.controller')

// get about
router.get('/', index);

// get about-danhnhan
router.get('/gioi-thieu-danh-nhan', about_danhnhan)

// get about-cnv
router.get('/gioi-thieu-cnv', about_cnv)

// thongdiep
router.get('/thong-diep-hieu-truong', hieutruong)
module.exports = router