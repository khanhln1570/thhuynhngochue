const express = require('express');
const router = express.Router();
const {
    notiMng,
    deleteNoti,
    createNoti,
    editNoti,
    newsMng,
    deleteNews,
    createNews,
    activityMng,
    createActivity
} = require('../controller/admin.controller')
const upload = require('../ultils/multer');

// noti routes
router.get('/notification', notiMng)
router.post('/notification/delete', deleteNoti)
router.post('/notification/create', upload.array('ImageUpload[]', 20), createNoti)
router.post('/notification/edit', upload.array('ImageUpload_Update[]', 20), editNoti)

// news routes
router.get('/news', newsMng)
router.post('/news/delete', deleteNews)
router.post('/news/create', upload.array('ImageUpload[]', 20), createNews)
    // router.post('/notification/edit', upload.array('ImageUpload_Update[]', 20), editNoti)

// activity routes
router.get('/activity', activityMng)
router.post('/activity/delete', deleteNews)
router.post('/activity/create', upload.array('ImageUpload[]', 20), createNews)

module.exports = router