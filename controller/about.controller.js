const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.index = async(req, res) => {
    res.render('abouts/about', {
        title: 'HNH | Giới thiệu chung'
    });
}

module.exports.about_danhnhan = async(req, res) => {
    res.render('abouts/about-danhnhan', {
        title: 'HNH | Giới thiệu Danh nhân'
    });
}

module.exports.about_cnv = async(req, res) => {
    const teachers = await prisma.member.findMany();
    res.render('abouts/about-cnv', {
        title: 'HNH | Giới thiệu giáo viên',
        teachers
    });
}