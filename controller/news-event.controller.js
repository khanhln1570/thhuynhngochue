const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


module.exports.index = async(req, res) => {
    const newsList = await prisma.news_event.findMany({ orderBy: { newsId: 'desc' } })
    res.render('news-events/news-event', {
        title: 'Tin tức & Sự kiện',
        newsList
    });
}

module.exports.getOne = async(req, res) => {
    var id = parseInt(req.params.id);
    const newss = await prisma.news_event.findMany();
    const news = await prisma.news_event.findUnique({
        where: { newsId: id },
        include: {
            image: true
        }

    });

    if (!news) {
        res.redirect('/page404')
    } else {

        res.render('news-events/news-event-detail', {
            title: 'Chi tiết Tin tức - Sự kiện',
            newss,
            news

        });
    }

}