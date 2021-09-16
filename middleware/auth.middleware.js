const { verify } = require('jsonwebtoken');
require('dotenv').config();

module.exports.checkToken = async(req, res, next) => {
    let token = req.get("authentication");
    console.log(token)
    console.log(req.headers['authentication']);
    console.log(res.getHeader('authentication'));
    if (token) {

        verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                res.json({
                    ok: false,
                    message: "Invalid token"
                });
            } else {
                next();
            }
        })
    } else {
        res.status(404).json({
            ok: false,
            message: "Access denied!"
        });
    }
}