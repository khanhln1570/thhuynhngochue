const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.index = async(req, res) => {
    const teachers = await prisma.member.findMany();
    const notis = await prisma.notification.findMany({ orderBy: { notiId: 'desc' } })
    const newsList = await prisma.news_event.findMany({ orderBy: { newsId: 'desc' } })
    res.render('index', {
        title: 'HNH | Trang chủ',
        teachers,
        notis,
        newsList

    })
}