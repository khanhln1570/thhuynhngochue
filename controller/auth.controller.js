const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');
require('dotenv').config();

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
                expiresIn: 3600
            });
            res.setHeader("authentication", jsontoken);
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

// login: (req, res) => {
//     var email = req.body.email;

//     getUserByEmail(email, (err, results) => {
//         if (err) {
//             console.log(err);
//             return res.status(500).json({
//                 ok: false,
//                 data: results,
//                 message: "Database connection error"
//             });
//         }
//         if (!results) {
//             return res.status(400).json({
//                 ok: false,
//                 data: results,
//                 message: "Invalid email or password"
//             });
//         }

//         const result = compareSync(req.body.password, results.password);

//         if (result) {
//             results.password = undefined;
//             const jsontoken = sign({ result: results }, "3efdsdsdf@#$", {
//                 expiresIn: "1h"
//             });
//             return res.status(200).json({
//                 ok: true,
//                 message: "Login success!",
//                 token: jsontoken
//             });
//         } else {
//             return res.json({
//                 ok: false,
//                 message: "Invalid email or password"
//             })
//         }

//     });
// }