const express = require('express');
// create express app
const app = express();

const cors = require('cors');
require('dotenv').config();
// Setup server port
const port = process.env.PORT;
// CORS
app.use(cors());
// config pug
app.set('view engine', 'pug')
app.set('views', './views')
    // config public
app.use(express.static('public'));

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// const role = async(req, res) => {
//     var f = await prisma.member.findMany()
//     console.log(f)
// }

// role()

app.use(function(err, req, res, next) {
    // error handling logic
    console.error(err.stack);
    res.status(500).json({ msg: "something wrong" });

});

// 404
app.get('/page404', (req, res) => {
    res.render('page404', {
        title: '404'
    })
})
app.get('/', (req, res) => {
    res.render('welcome')
})

// routes trang chủ
const homeRoutes = require('./routes/home.routes')
app.use('/trang-chu', homeRoutes)

// routes library
const libraryRoutes = require('./routes/library.routes')
app.use('/thu-vien-xanh', libraryRoutes)

// about routes
const aboutRoutes = require('./routes/about.routes')
app.use('/gioi-thieu', aboutRoutes)

// noti routes
const notiRoutes = require('./routes/notification.routes')
app.use('/thong-bao', notiRoutes)

// news-event  routes
const newsEventRoutes = require('./routes/news-event.routes')
app.use('/tintuc-sukien', newsEventRoutes)

// contact  routes
const contactRoutes = require('./routes/contact.routes')
app.use('/lien-he', contactRoutes)


// auth routes
const authRoutes = require('./routes/auth.routes')
app.use('/login', authRoutes)

// admin routes
const adminRoutes = require('./routes/admin.routes')
app.use('/manager', adminRoutes)


// activity routes
const activityRoutes = require('./routes/activity.routes')
app.use('/hoat-dong', activityRoutes)


app.listen(port, function() {
    console.log('Server listening in port: ' + port);
});