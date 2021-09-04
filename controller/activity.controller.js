const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.doanthe = async(req, res) => {
    const activitis = await prisma.news_event.findMany({ where: { category: 'DOANTHE' } });

    res.render('activity/doanthe', {
        title: 'Hoạt động đoàn thể',
        activitis
    });
}

module.exports.vntt = async(req, res) => {
    const activitis = await prisma.news_event.findMany({ where: { category: 'VNTT' } });

    res.render('activity/vannghe-thethao', {
        title: 'Hoạt động văn nghệ - thể thao',
        activitis
    });
}

module.exports.doi = async(req, res) => {
    const activitis = await prisma.news_event.findMany({ where: { category: 'COMMON' } });

    res.render('activity/doi', {
        title: 'Hoạt động Đội',
        activitis
    });
}


module.exports.chuyenmon = async(req, res) => {
    const activitis = await prisma.news_event.findMany({ where: { category: 'CHUYENMON' } });

    res.render('activity/chuyenmon', {
        title: 'Hoạt động chuyên môn',
        activitis
    });
}