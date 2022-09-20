const express = require('express');
const { addListener } = require('nodemon');
const router = require('./routes/users');
const app = express();
const userRouter = require('./routes/users');
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

/* ========= For Static HTML ========= */
// app.use(express.static("public"));

app.set('view engine', 'ejs');


// Logger can be called with app.use or it can be passed as a callback to `get`
// He called it endpoint; Are routes and endpoints synonymous?
/* ========= Dynamic render with ejs ========= */
app.get('/', logger, logger, (req, res) => {
    res.render('index', { text: "world"});
});

app.use('/users', userRouter);

function logger(req, res, next) {
    console.log(req.originalUrl);
    next();
};


console.log('Server Running Port: 3000');
app.listen(3000);

