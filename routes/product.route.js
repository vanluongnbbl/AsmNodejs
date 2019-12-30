const express = require ('express')
const router = express.Router();

const controller = require('../controller/product.controller');

module.exports = (app) => {
    app.use('/products', router)

    router.get('/', controller.index)
}


