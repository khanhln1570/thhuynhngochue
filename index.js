const express = require('express');
// create express app
const app = express();

const cookieParser = require('cookie-parser')


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
app.use(cookieParser())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const { checkToken } = require('./middleware/auth.middleware');

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

const { createUser } = require('./controller/auth.controller')
createUser();

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
app.use('/auth', authRoutes)

// admin routes
const adminRoutes = require('./routes/admin.routes')
app.use('/manager', checkToken, adminRoutes)


// activity routes
const activityRoutes = require('./routes/activity.routes')
app.use('/hoat-dong', activityRoutes)


app.listen(port, function() {
    console.log('Server listening in port: ' + port);
});