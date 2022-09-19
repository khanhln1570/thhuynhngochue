const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.index = async(req, res) => {
    const notis = await prisma.notification.findMany({
        orderBy: {
            createDate: 'desc'
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
            image: true,
            video: true
        }

    });

    if (!noti) {
        return res.redirect('/page404')
    } else {
        var content = noti.content.split(" ");
        // console.log(content)
        var links = [];
        content.forEach(element => {
            if (element.startsWith('http') || element.startsWith(' http') ||
                element.startsWith('\nhttp') || element.startsWith('\rhttp') || element.startsWith('(http') ||
                element.startsWith('[http') ||
                element.startsWith('{http')) {
                var link = element.replace(/[{()}\[\]]/g, '')

                links.push(link)
            }
        });
        // console.log(links);
        return res.render('notifications/notification-detail', {
            title: 'Chi tiết Thông Báo',
            noti,
            notis,
            links

        });
    }

}

module.exports.indexPublic = async(req, res) => {
    const notis = await prisma.notification.findMany({
        orderBy: {
            createDate: 'desc'
        },
        where:{
            OR:[
                {
                    title:{
                        startsWith: 'Công khai'
                    }
                },
                {
                    title:{
                        startsWith: 'CÔNG KHAI'
                    }
                },
            ]
        }
    });
    res.render('notifications/notification-public', {
        title: 'Công Khai',
        notis
    });
}