const express = require('express');
const router = express.Router();
const { notiMng, deleteNoti, createNoti, editNoti } = require('../controller/admin.controller')
const upload = require('../ultils/multer');
const { checkToken } = require('../middleware/auth.middleware');
// noti routes
router.get('/notification', notiMng)
router.post('/notification/delete', deleteNoti)
router.post('/notification/create', upload.array('ImageUpload[]', 20), createNoti)
router.post('/notification/edit', upload.array('ImageUpload_Update[]', 20), editNoti)


module.exports = router