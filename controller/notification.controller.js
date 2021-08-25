const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.index = async(req, res) => {
    const notis = await prisma.notification.findMany({
        orderBy: {
            notiId: 'desc'
        }
    });
    res.render('notifications/notification', {
        title: 'HNH | Thông Báo',
        notis
    });
}