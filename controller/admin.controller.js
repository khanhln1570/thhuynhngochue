const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.notiMng = async(req, res) => {
    var page = parseInt(req.query.page) || 1;
    var limit = parseInt(req.query.limit) || 5;

    const notis = await prisma.notification.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { notiId: 'desc' }
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