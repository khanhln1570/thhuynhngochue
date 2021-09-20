const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { verify } = require('jsonwebtoken');
require('dotenv').config();

module.exports.checkToken = async(req, res, next) => {
    try {
        let token = req.cookies.token;
        if (!token) {
            res.redirect('/auth/login');
            return;
        }
        var tokenResult = verify(token, process.env.SECRET_KEY);
        // console.log(tokenResult)
        const user = await prisma.account.findUnique({ where: { id: tokenResult.id } });
        if (!user) {
            res.redirect('/auth/login');
            return;
        }
        next()
    } catch (error) {
        console.log(error)
        res.status(403).json({ error: "UnAuthorized" })
    }


}