const express = require('express');
const router = express.Router();
const productoCotroller = require('../controllers/cliente.controller');

router.get('/', productoCotroller.obtenerProductos);

module.exports = router;