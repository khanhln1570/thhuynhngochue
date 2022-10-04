const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.index = async(req, res) => {
    const teachers = await prisma.member.findMany({orderBy:{position: 'asc'}});
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
    const bgh = await prisma.member.findMany({ where: { position: { contains: 'trưởng' } } });

    const gvcn1 = await prisma.member.findMany({ where: { position: { contains: 'GVCN LỚP 1/' } }, orderBy:{position: 'asc'} });
    const gvcn2 = await prisma.member.findMany({ where: { position: { contains: 'GVCN LỚP 2/' } }, orderBy:{position: 'asc'}});
    const gvcn3 = await prisma.member.findMany({ where: { position: { contains: 'GVCN LỚP 3/' } }, orderBy:{position: 'asc'} });
    const gvcn4 = await prisma.member.findMany({ where: { position: { contains: 'GVCN LỚP 4/' } }, orderBy:{position: 'asc'} });
    const gvcn5 = await prisma.member.findMany({ where: { position: { contains: 'GVCN LỚP 5/' } }, orderBy:{position: 'asc'} });

    const gvVanhoa = await prisma.member.findMany({ where: { position: 'DẠY VĂN HÓA' } });
    const gvMithuat = await prisma.member.findMany({ where: { position: 'DẠY MĨ THUẬT' } });
    const gvAmnhac = await prisma.member.findMany({ where: { position: 'DẠY ÂM NHẠC' } });
    const gvTheduc = await prisma.member.findMany({ where: { position: 'DẠY THỂ DỤC' } });
    const gvTinhoc = await prisma.member.findMany({ where: { position: 'DẠY TIN HỌC' } });

    const tpt = await prisma.member.findMany({ where: { position: { contains: 'Tổng phụ trách' } } });
    const nv = await prisma.member.findMany({ where: { position: { startsWith: 'NV' } } });

    res.render('abouts/about-cnv', {
        title: 'Giới thiệu giáo viên',
        bgh,
        gvcn1,
        gvcn2,
        gvcn3,
        gvcn4,
        gvcn5,
        gvVanhoa,
        gvMithuat,
        gvAmnhac,
        gvTheduc,
        gvTinhoc,
        tpt,
        nv
    });
}

module.exports.hieutruong = async(req, res) => {
    res.render('abouts/hieu-truong', {
        title: 'Thông điệp Hiệu trưởng'

    });
}