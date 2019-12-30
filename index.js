const express = require('express');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var authRoute = require('./routes/auth.route');

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/express-demo')

const userRoute = require('./routes/user.route');

var apiProductRoute = require('./api/routes/product.route')

var authMiddleware = require('./middlewares/auth.middleware')

const app = express();

require('./routes/product.route')(app)

var port = 3000;


app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser('dhsdfhjsdrfj2213'));

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.render('index', {
        name: 'AAA'
    });
});

app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);

app.use('/api/products', apiProductRoute)

app.listen(port, function() {
    console.log('Server listening on port' + port);
});