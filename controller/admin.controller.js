const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { cloudinary } = require("../ultils/cloudinary");


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
        let deleteImageRelate;
        let deleteVideoRelate;
        for (let index = 0; index < notiId.length; index++) {
            const element = notiId[index];
            deleteImageRelate = await prisma.image.findMany({ where: { notificatioId: parseInt(element) } });
            deleteVideoRelate = await prisma.video.findMany({ where: { notificatioId: parseInt(element) } });
            if (deleteImageRelate) {
                for (let index = 0; index < deleteImageRelate.length; index++) {
                    const element = deleteImageRelate[index];
                    if (element.public_id) {
                        cloudinary.uploader.destroy(element.public_id, async(err, result) => {
                            if (err) throw err;
                        })
                    }
                }
                await prisma.image.deleteMany({ where: { notificatioId: parseInt(element) } });
            }
            if (deleteVideoRelate) {
                await prisma.video.deleteMany({ where: { notificatioId: parseInt(element) } });
            }
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
        const videoLinkInput = req.body.youtubeLink;
        // console.log(videoLinkInput)
        if (videoLinkInput) {
            var idVideo = videoLinkInput.split('watch?v=');
            var videoLinkEmbed = "https://www.youtube.com/embed/" + idVideo[1];
        }
        
        if (images.length > 0) {
            var listImagesUpload = [];
            var notiCreate;
            for (let index = 0; index < images.length; index++) {
                const element = images[index];
                var uploadResponse = await cloudinary.uploader.upload(element.path, {
                    upload_preset: 'thhuynhngochue_thongbao'
                });
                if (!uploadResponse) {
                    return res.send(`<h1>Thêm ảnh thất bại!</h1><br/><h3>Vui lòng thử lại hoặc liên hệ ADMIN</h3><br/>`)
                } else {
                    listImagesUpload.push(uploadResponse);
                }
            }
            // thêm vào db
            // console.log(uploadResponse)
            var i = 0;
            let urlsPrisma = Array.from({ length: listImagesUpload.length }).map(() => ({
                link: listImagesUpload[i].url,
                typeImage: 'NOTI',
                public_id: listImagesUpload[i++].public_id
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




            } else {

                return res.send(`<h1>Thêm ảnh thất bại</h1><br/><h3>Vui lòng thử lại hoặc liên hệ ADMIN</h3>`)

            }
        } else {
            notiCreate = await prisma.notification.create({
                data: {
                    title: title,
                    content: content,
                }
            })
        }
        if (notiCreate) {
            return res.redirect('/manager/notification')
        } else {
            return res.send(`<h1>Thất bại</h1><br/><h3>Vui lòng thử lại hoặc liên hệ ADMIN</h3>`)
        }




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
        var category = req.body.category;
        const videoLinkInput = req.body.youtubeLink;
        // console.log(videoLinkInput)
        var idVideo = [];
        var videoLinkEmbed = null;
        if (videoLinkInput) {
            idVideo = videoLinkInput.split('watch?v=');
            videoLinkEmbed = "https://www.youtube.com/embed/" + idVideo[1]; // ex: [ 'https://www.youtube.com/watch?', 'tVotPIa4E2g' ]
        } else {
            idVideo.length = 0
        }
        // console.log(idVideo)
        // console.log(videoLinkEmbed)
        let notiCreate;
        var upload_preset = "";
        if (category) {
            upload_preset = "thhuynhngochue_hoatdong";
        } else {
            upload_preset = "thhuynhngochue_tintuc-sukien";
        }
        // console.log(upload_preset);

        // Nếu bài viết có thêm ảnh
        if (images.length > 0) {
            var listImagesUpload = [];
            for (let index = 0; index < images.length; index++) {
                const element = images[index];
                var uploadResponse = await cloudinary.uploader.upload(element.path, {
                    upload_preset: upload_preset
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
                link: listImagesUpload[i].url,
                typeImage: 'EVENT',
                public_id: listImagesUpload[i++].public_id
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
                        video: {
                            create: {
                                link: idVideo.length != 0 ? videoLinkEmbed : undefined,
                            }
                        },
                        category: category = (category) ? category : 'EVENT'
                    }
                });

            } else {

                return res.send(`<h1>Thêm ảnh thất bại</h1><br/><h3>Vui lòng thử lại hoặc liên hệ ADMIN</h3>`)

            }
        }
        // Nếu bài viết không thêm ảnh
        else {
            notiCreate = await prisma.news_event.create({
                data: {
                    title: title,
                    content: content,
                    video: {
                        create: {
                            link: idVideo.length != 0 ? videoLinkEmbed : undefined,
                        }
                    },
                    category: category = (category) ? category : 'EVENT'
                }
            });
        }

        if (notiCreate && notiCreate.category !== "EVENT") {
            return res.redirect('/manager/activity')
        } else if (notiCreate && notiCreate.category === "EVENT") {
            return res.redirect('/manager/news')
        } else {
            return res.send(`<h1>SOMETHING WRONG</h1><br/><h3>Vui lòng thử lại hoặc liên hệ ADMIN</h3><br/>`)
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
            // console.log(body)
        let deleteNews;
        let deleteImageRelate;
        let deleteVideoRelate;
        for (let index = 0; index < newsId.length; index++) {
            const element = newsId[index];
            deleteImageRelate = await prisma.image.findMany({ where: { newId: parseInt(element) } });
            deleteVideoRelate = await prisma.video.findMany({ where: { newId: parseInt(element) } });
            // console.log(deleteImageRelate);
            if (deleteImageRelate) {
                for (let index = 0; index < deleteImageRelate.length; index++) {
                    const element = deleteImageRelate[index];
                    if (element.public_id) {
                        cloudinary.uploader.destroy(element.public_id, async(err, result) => {
                            if (err) throw err;
                        })
                    }
                }
                await prisma.image.deleteMany({ where: { newId: parseInt(element) } });
            }
            if (deleteVideoRelate) {
                await prisma.video.deleteMany({ where: { newId: parseInt(element) } });
            }
            deleteNews = await prisma.news_event.delete({ where: { newsId: parseInt(element) } });
        }
        if (deleteNews.category === "EVENT") {
            return res.redirect('/manager/news')
        } else {
            return res.redirect('/manager/activity')
        }

    } catch (error) {
        console.log(error)
        return res.send('<h1>SOMETHING WRONG</h1><br/><h3>Vui lòng thử lại hoặc liên hệ ADMIN</h3>')
    }
}


// activity  manager
module.exports.activityMng = async(req, res) => {
    var page = parseInt(req.query.page) || 1;
    var limit = parseInt(req.query.limit) || 3;

    const activities = await prisma.news_event.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: {
            OR: [{
                    category: 'CHUYENMON'
                },
                {
                    category: 'VNTT'
                },
                {
                    category: 'COMMON'
                },
                {
                    category: 'DOANTHE'
                },
            ]

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
            OR: [{
                    category: 'CHUYENMON'
                },
                {
                    category: 'VNTT'
                },
                {
                    category: 'COMMON'
                },
                {
                    category: 'DOANTHE'
                },
            ]
        },

    })
    const countAll = await prisma.news_event.count({
        where: {
            OR: [{
                    category: 'CHUYENMON'
                },
                {
                    category: 'VNTT'
                },
                {
                    category: 'COMMON'
                },
                {
                    category: 'DOANTHE'
                },
            ]
        },
    })
    res.render('manager/activityManager', {
        title: 'Quản lý Hoạt động',
        activities,
        countAll,
        count,
        page,
        pages: Math.ceil(countAll / limit) // đếm có bao nhiêu trang
    });
}

// edit noti
module.exports.editNoti = async(req, res) => {
    try {
        const titleUpdate = req.body.title;
        const contentUpdate = req.body.content;
        const idItem = req.body.id;
        // console.log(req.body)
        var imagedList = req.body.imagedList;
        const images = req.files;
        var notiUpdate = await prisma.notification.findUnique({ where: { notiId: parseInt(idItem) } });
        if (!notiUpdate) {
            return res.send(`<h1>Không tìm thấy!</h1><br/><h3>Vui lòng thử lại hoặc liên hệ ADMIN</h3>`)
        }
        await prisma.notification.update({
            where: {
                notiId: notiUpdate.notiId
            },
            data: {
                title: titleUpdate,
                content: contentUpdate
            }
        });
        console.log(imagedList)
    } catch (error) {
        console.log(error)
        return res.send(`<h1>SOMETHING WRONG</h1><br/><h3>Vui lòng thử lại hoặc liên hệ ADMIN</h3><br/><p>${error}</p>`)
    }
}