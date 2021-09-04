const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.index = async(req, res) => {
    const album = await prisma.image.findMany({ where: { typeImage: 'ALBUM' } })
    res.render('library/library', {

            title: 'Thư viện xanh',
            album
        }

    );
}