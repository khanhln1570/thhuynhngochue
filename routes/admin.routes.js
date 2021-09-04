const express = require('express');
const router = express.Router();
const { notiMng } = require('../controller/admin.controller')

// noti routes
router.get('/notification', notiMng)

module.exports = router