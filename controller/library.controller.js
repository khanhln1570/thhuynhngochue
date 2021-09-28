const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const path = require('path');
module.exports.index = async(req, res) => {
    const album = await prisma.image.findMany({ where: { typeImage: 'ALBUM' } });
    const newsList = await prisma.post.findMany();
    res.render('library/library', {

            title: 'Thư viện xanh',
            album,
            newsList
        }

    );
}

module.exports.getOne = async(req, res) => {
    var id = parseInt(req.params.id);
    // console.log(id);
    const post = await prisma.post.findUnique({
        where: {
            id: id
        },
        include: {
            image_post: true
        }
    })

    if (!post) {
        return res.redirect('/page404')
    } else {
        if (post.link && post.link.endsWith('.html')) {
            return res.sendFile(path.join(__dirname, '../views/library', post.link));
        } else {
            return res.render('library/post', {
                title: 'Thư viện xanh',
                post
            })
        }

    }


}