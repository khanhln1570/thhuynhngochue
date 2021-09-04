const express = require('express');
const router = express.Router();
const { doanthe, vntt, doi, chuyenmon } = require('../controller/activity.controller')


router.get('/doan-the', doanthe)
router.get('/vannghe-thethao', vntt)
router.get('/doi', doi)
router.get('/chuyen-mon', chuyenmon)
module.exports = router