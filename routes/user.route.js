const express = require ('express');

const controller = require('../controller/user.controller');
const validate = require('../validate/user.validate');
var authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

// MVC model - view - controller
router.get('/', controller.index);

function middleware(req, res, next) {
    console.log('middleware');
    next(); 
}

function middleware2(req, res, next) {
    console.log('middleware2');
    res.send('Hello');
}

router.get('/cookie', function(req, res, next){
    res.cookie('user-id', 123);
    res.send("Hi!");
});

router.get('/test', middleware, middleware2);

router.get('/search', controller.search);

router.get('/create', controller.create);

router.post('/create', validate.postCreate, controller.postCreate);

router.get('/:id', controller.get);

router.get('/delete/:userId', controller.delete)

router.get('/update', controller.create);
router.post('/update/:userId', controller.postUpdate)

module.exports = router;