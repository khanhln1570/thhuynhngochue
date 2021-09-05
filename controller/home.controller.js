const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.index = async(req, res) => {
    const teachers = await prisma.member.findMany();
    const notis = await prisma.notification.findMany({ take: 3, orderBy: { notiId: 'desc' } })
        // const newsList = await prisma.news_event.findMany({ take: 3, orderBy: { newsId: 'desc' } })
    const newsList = await prisma.news_event.findMany({
        where: {
            OR: [{
                newsId: 5
            }]
        }
    })
    res.render('index', {
        title: 'Ngôi trường đáng tin cậy!',
        teachers,
        notis,
        newsList

    })
}