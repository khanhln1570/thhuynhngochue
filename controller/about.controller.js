const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.index = async(req, res) => {
    const teachers = await prisma.member.findMany();
    res.render('abouts/about', {
        title: 'Giới thiệu chung',
        teachers
    });
}

module.exports.about_danhnhan = async(req, res) => {
    res.render('abouts/about-danhnhan', {
        title: 'Giới thiệu Danh nhân'
    });
}

module.exports.about_cnv = async(req, res) => {
    const teachers = await prisma.member.findMany();
    res.render('abouts/about-cnv', {
        title: 'Giới thiệu giáo viên',
        teachers
    });
}

module.exports.hieutruong = async(req, res) => {
    res.render('abouts/hieu-truong', {
        title: 'Thông điệp Hiệu trưởng'

    });
}