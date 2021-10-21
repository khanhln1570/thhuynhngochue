module.exports.index = async(req, res) => {
    res.render('contact/contact', {
        title: 'Liên hệ'
    });
}

module.exports.message = async(req, res) => {
    const name = req.body.name.trim();
    const email = req.body.email;
    const content = req.body.message.trim();
    const checkArray = ['đm', 'địt', 'lồn', 'kẹc', 'cặc', 'chim', 'bướm',
        'bím', 'cứt', 'cức', 'lz', 'nhuloz',
        'nhucut', 'nhucuc', 'đụ', 'mày', 'tao', 'ta', 'mi', 'lìn', 'bẹn', 'phân', 'chó', 'bò',
        'gà', 'lợn', 'heo', 'du', 'ma', 'may', 'lon', 'cac', 'kec', 'may', 'cuc', 'cut', 'biến',
        'vú', 'ngực', 'lông', 'lồng', 'mả', 'chết', 'chet', 'cút', 'xéo', 'm', 'ngu', 'dốt', 'lzz', 'lzzz', 'lzzzz', 'lzzzzz', 'lzzzzz',
        'bú', 'liếm', 'bu', 'sex', 'sexy', 'sexx', 'vl', 'porn', 'dâm', 'đãng', 'vc', 'vãi', 'fuckk', 'fuck', 'f.u.c.k',
        'shit', 'stupid', 'suck', 'dick', 'pussy', 'chịch', 'loncac', 'lzcac', 'concac', 'cailz', 'cailoz', 'cailon',
        'loz', 'lozzz', 'lozz', 'nứng', 'nung', 'horny', 'cẹc', 'cec', 'đìu', 'đệt', 'haiz', 'truongnhulon', 'củ', 'máu',
        'tinh', 'trùng', 'bà', 'nội', 'ông', 'già', 'xuẩn', 'ngục', 'tù', 'ma', 'túy', 'ke', 'đá', 'cỏ', 'cần', 'sa',
        'heroin', 'dãi', 'đái', 'ỉa', 'ị', 'đùn', 'tè', 'dai', 'ia', 'chich',
    ]
    const contentCheck = content.split(' ');
    const nameCheck = name.split(' ');
    // console.log(content);
    // console.log(contentCheck);
    for (let index = 0; index < contentCheck.length; index++) {
        const element = contentCheck[index];
        if (checkArray.includes(element)) {

            return res.render('contact/contact', {
                title: 'Liên hệ',
                status: [
                    `Có thể một số ngôn từ chưa phù hợp, vui lòng kiểm tra lại!`
                ]
            });

        }
    }
    for (let index = 0; index < nameCheck.length; index++) {
        const element = nameCheck[index];
        if (checkArray.includes(element)) {

            return res.render('contact/contact', {
                title: 'Liên hệ',
                status: [
                    `Có thể một số ngôn từ chưa phù hợp, vui lòng kiểm tra lại!`
                ]
            });

        }
    }
    // return res.render('contact/contact', {
    //     title: 'Liên hệ',
    //     status: [
    //         'Cảm ơn bạn đã đóng góp ý kiến!'
    //     ]
    // });


}