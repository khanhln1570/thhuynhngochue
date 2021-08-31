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
    var content = news.content.split(" ");
    console.log(content)
    var links = [];
    content.forEach(element => {
        if (element.startsWith('http') || element.startsWith(' http') ||
            element.startsWith('\nhttp') || element.startsWith('\rhttp')) {
            element.replace(/\r?\n|\r|\n|\n*$/, "")
            links.push(element)
        }
    });

    console.log(links)
    if (!news) {
        res.redirect('/page404')
    } else {

        res.render('news-events/news-event-detail', {
            title: 'Chi tiết Tin tức - Sự kiện',
            newss,
            news,
            links

        });
    }

}