module.exports.index = async(req, res) => {
    res.render('contact/contact', {
        title: 'Liên hệ'
    });
}

module.exports.message = async(req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const content = req.body.message;
    return res.render('contact/contact', {
        title: 'Liên hệ',
        status: [
            'Cảm ơn bạn đã đóng góp ý kiến!'
        ]
    });
    console.log(req.body)

}