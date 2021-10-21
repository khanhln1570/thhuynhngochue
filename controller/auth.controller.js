const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');
require('dotenv').config();
const http = require('http');


module.exports.createUser = async(req, res) => {
    var password = process.env.ADMINPASSWORD;
    const salt = genSaltSync(10);
    password = hashSync(password, salt);
    const user = await prisma.account.create({
        data: {
            username: 'thhuynhngochue',
            password: password,
            accRole: 'SCHOOl'
        }
    })
    console.log(user);
}


module.exports.index = async(req, res) => {
    res.render('auth/login', {
        title: 'Đăng nhập'
    });
}

module.exports.login = async(req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;
        if (!username || !password) {
            res.render('auth/login', {
                messages: [
                    'Vui lòng điền đầy đủ thông tin!'
                ],
                values: req.body
            });
            return;
        }
        const user = await prisma.account.findFirst({ where: { username: username } })
            // console.log(user)
        if (!user) {
            res.render('auth/login', {
                messages: [
                    'Tài khoản không tồn tại!'
                ],
                values: req.body
            });
            return;
        }
        // check passwword bcrypt
        const result = compareSync(password, user.password);
        // console.log(result)
        if (result) {
            const jsontoken = sign({ id: user.id }, process.env.SECRET_KEY, {
                expiresIn: '7200s'
            });
            // res.setHeader("authentication", jsontoken);
            res.cookie('token', jsontoken, { maxAge: 7200000 });

            res.redirect('/manager/notification');

        } else {
            res.render('auth/login', {
                messages: [
                    'Sai mật khẩu!'
                ],
                values: req.body
            });
            return;
        }
    } catch (error) {
        console.log(error)
        return res.send(`<h1>SOMETHING WRONG</h1><br/><h3>Vui lòng thử lại hoặc liên hệ ADMIN</h3><br/><p>${error}</p>`)
    }

}

module.exports.logout = async(req, res) => {
    res.clearCookie('token');
    return res.redirect('/trang-chu');
}