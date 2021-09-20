const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { cloudinary } = require("../ultils/cloudinary");
const upload = require('../ultils/multer');

// list noti
module.exports.notiMng = async(req, res) => {
    var page = parseInt(req.query.page) || 1;
    var limit = parseInt(req.query.limit) || 3;

    const notis = await prisma.notification.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createDate: 'desc' },
        include: {
            image: true
        }
    })
    const count = await prisma.notification.count({
        skip: (page - 1) * limit,
        take: limit

    })
    const countAll = await prisma.notification.count()
    res.render('manager/notiManager', {
        title: 'Quản lý thông báo',
        notis,
        countAll,
        count,
        page,
        pages: Math.ceil(countAll / limit) // đếm có bao nhiêu trang
    });
}

// delete noti
module.exports.deleteNoti = async(req, res) => {
    try {
        const body = req.body.idItem;
        const notiId = body[0].split(',')
        let deleteNoti;
        for (let index = 0; index < notiId.length; index++) {
            const element = notiId[index];
            deleteNoti = await prisma.notification.delete({ where: { notiId: parseInt(element) } });
        }
        if (deleteNoti) {
            return res.redirect('/manager/notification')
        }
        return res.send('<h3>Thất bại! Vui lòng thử lại hoặc liên hệ ADMIN</h3>')
    } catch (error) {
        console.log(error)
        return res.send('<h1>SOMETHING WRONG</h1><br/><h3>Vui lòng thử lại hoặc liên hệ ADMIN</h3>')
    }
}

// create noti
module.exports.createNoti = async(req, res) => {
    try {
        const title = req.body.title;
        const content = req.body.content;
        const images = req.files;
        // console.log(images.length);
        var listImagesUpload = [];
        let notiCreate;
        for (let index = 0; index < images.length; index++) {
            const element = images[index];
            var uploadResponse = await cloudinary.uploader.upload(element.path, {
                upload_preset: 'thhuynhngochue_preset'
            });
            if (!uploadResponse) {
                return res.send(`<h1>Thêm ảnh thất bại!</h1><br/><h3>Vui lòng thử lại hoặc liên hệ ADMIN</h3><br/>`)
            } else {
                listImagesUpload.push(uploadResponse);
            }
        }
        // thêm vào db
        // console.log(listImagesUpload.length)
        var i = 0;
        let urlsPrisma = Array.from({ length: listImagesUpload.length }).map(() => ({
            link: listImagesUpload[i++].url,
            typeImage: 'NOTI'
        }));
        // console.log(urlsPrisma);
        // get first image
        const linkFirst = urlsPrisma[0].link;
        if (listImagesUpload.length > 0) {

            notiCreate = await prisma.notification.create({
                data: {
                    title: title,
                    content: content,
                    link: linkFirst,
                    image: {
                        create: urlsPrisma
                    }
                }
            })


            return res.redirect('/manager/notification')

        } else {

            return res.send(`<h1>Thêm ảnh thất bại</h1><br/><h3>Vui lòng thử lại hoặc liên hệ ADMIN</h3>`)

        }

    } catch (error) {
        console.log(error)
        return res.send(`<h1>SOMETHING WRONG</h1><br/><h3>Vui lòng thử lại hoặc liên hệ ADMIN</h3><br/><p>${error}</p>`)
    }
}

// edit noti
module.exports.editNoti = async(req, res) => {
    try {
        console.log(req.body);
        console.log(req.files);
    } catch (error) {
        console.log(error)
        return res.send(`<h1>SOMETHING WRONG</h1><br/><h3>Vui lòng thử lại hoặc liên hệ ADMIN</h3><br/><p>${error}</p>`)
    }
}

// news manager
module.exports.newsMng = async(req, res) => {
    var page = parseInt(req.query.page) || 1;
    var limit = parseInt(req.query.limit) || 3;

    const newss = await prisma.news_event.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: {
            category: 'EVENT'
        },
        orderBy: { createDate: 'desc' },
        include: {
            image: true
        }

    })
    const count = await prisma.news_event.count({
        skip: (page - 1) * limit,
        take: limit,
        where: {
            category: 'EVENT'
        },

    })
    const countAll = await prisma.news_event.count({
        where: {
            category: 'EVENT'
        },
    })
    res.render('manager/newsManager', {
        title: 'Quản lý tin tức-sự kiện',
        newss,
        countAll,
        count,
        page,
        pages: Math.ceil(countAll / limit) // đếm có bao nhiêu trang
    });
}

// create news
module.exports.createNews = async(req, res) => {
    try {
        const title = req.body.title;
        const content = req.body.content;
        const images = req.files;
        // console.log(images.length);
        var listImagesUpload = [];

        for (let index = 0; index < images.length; index++) {
            const element = images[index];
            var uploadResponse = await cloudinary.uploader.upload(element.path, {
                upload_preset: 'thhuynhngochue_preset'
            });
            if (!uploadResponse) {
                return res.send(`<h1>Thêm ảnh thất bại!</h1><br/><h3>Vui lòng thử lại hoặc liên hệ ADMIN</h3><br/>`)
            } else {
                listImagesUpload.push(uploadResponse);
            }
        }
        // thêm vào db
        // console.log(listImagesUpload.length)
        var i = 0;
        let urlsPrisma = Array.from({ length: listImagesUpload.length }).map(() => ({
            link: listImagesUpload[i++].url,
            typeImage: 'EVENT'
        }));
        // console.log(urlsPrisma);
        // get first image
        const linkFirst = urlsPrisma[0].link;
        if (listImagesUpload.length > 0) {

            notiCreate = await prisma.news_event.create({
                data: {
                    title: title,
                    content: content,
                    link: linkFirst,
                    image: {
                        create: urlsPrisma
                    },
                    category: 'EVENT'
                }
            })


            return res.redirect('/manager/news')

        } else {

            return res.send(`<h1>Thêm ảnh thất bại</h1><br/><h3>Vui lòng thử lại hoặc liên hệ ADMIN</h3>`)

        }

    } catch (error) {
        console.log(error)
        return res.send(`<h1>SOMETHING WRONG</h1><br/><h3>Vui lòng thử lại hoặc liên hệ ADMIN</h3><br/><p>${error}</p>`)
    }
}

// delete news
module.exports.deleteNews = async(req, res) => {
    try {
        const body = req.body.idItem;
        const newsId = body[0].split(',')
        let deleteNews;
        for (let index = 0; index < newsId.length; index++) {
            const element = newsId[index];
            deleteNews = await prisma.news_event.delete({ where: { newsId: parseInt(element) } });
        }
        if (deleteNews) {
            return res.redirect('/manager/news')
        }
        return res.send('<h3>Thất bại! Vui lòng thử lại hoặc liên hệ ADMIN</h3>')
    } catch (error) {
        console.log(error)
        return res.send('<h1>SOMETHING WRONG</h1><br/><h3>Vui lòng thử lại hoặc liên hệ ADMIN</h3>')
    }
}