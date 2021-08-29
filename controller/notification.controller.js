const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.index = async(req, res) => {
    const notis = await prisma.notification.findMany({
        orderBy: {
            notiId: 'desc'
        }
    });
    res.render('notifications/notification', {
        title: 'Thông Báo',
        notis
    });
}

module.exports.getOne = async(req, res) => {
    var id = parseInt(req.params.id);
    const notis = await prisma.notification.findMany();
    const noti = await prisma.notification.findUnique({
        where: { notiId: id },
        include: {
            image: true
        }

    });

    if (!noti) {
        res.redirect('/page404')
    } else {

        res.render('notifications/notification-detail', {
            title: 'Chi tiết Thông Báo',
            noti,
            notis

        });
    }

}