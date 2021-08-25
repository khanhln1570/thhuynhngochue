const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


module.exports.index = async(req, res) => {
    const newsList = await prisma.news_event.findMany({ orderBy: { newsId: 'desc' } })
    res.render('news-events/news-event', {
        title: 'HNH | Tin tức & Sự kiện',
        newsList
    });
}