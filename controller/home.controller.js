const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.index = async(req, res) => {
    const teachers = await prisma.member.findMany();
    const notis = await prisma.notification.findMany({ take: 3, orderBy: { createDate: 'desc' } })
        // const newsList = await prisma.news_event.findMany({ take: 3, orderBy: { newsId: 'desc' } })
    const newsList = await prisma.news_event.findMany({
        where: {
            category: 'EVENT'
        },
        orderBy: {
            createDate: 'desc'
        }
    })
    res.render('index', {
        title: 'Ngôi trường đáng tin cậy!',
        teachers,
        notis,
        newsList

    })
}