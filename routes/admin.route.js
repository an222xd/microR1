const express = require('express');
const router = express.Router();
const productoCotroller = require('../controllers/admin.controller');
const productoModel = require('../models/productoModel');
const path = require("path"),
formidable = require("formidable");

const DIRECTORIO_FOTOS = path.join(__dirname, "../fotos_productos");


router.get('/pro', productoCotroller.obtenerProductos);
router.get('/pro/:id', productoCotroller.obtenerProductosId);
router.get('/pro/img/:id', productoCotroller.obtenerImgId);
router.post('/pro/add', productoCotroller.crearProductos);
router.put('/pro/edi', productoCotroller.editarProductos);
router.put('/pro/img', productoCotroller.addImg);
router.delete('/pro/:id', productoCotroller.eliminarProductos);

router.post('/pro/fotosProducto', (req, res) => {
    const form = formidable({
        multiples: true,
        uploadDir: DIRECTORIO_FOTOS,
    });
    
    form.parse(req, async (err, fields, files) => {
        console.log(files);
        const idProducto = fields.idProducto;
        for (let clave in files) {
            const file = files[clave];
            const nombreArchivo = file.name;
            await productoModel.agregarFoto(idProducto, nombreArchivo)
        }
    });

    form.on("fileBegin", (name, file) => {
        const extension = path.extname(file.name);
        const nuevoNombre = uuidv4().concat(extension);
        file.path = path.join(DIRECTORIO_FOTOS, nuevoNombre);
        file.name = nuevoNombre;
    })

    form.on("end", () => {
        res.json({
            respuesta: true,
        })
    })

});

router.get('/catPro', productoCotroller.obtenerCategoriaPro);

router.get('/usu', productoCotroller.obtenerUsuario);
router.get('/usu/:id', productoCotroller.obtenerUsuarioId);
router.post('/usu/edi', productoCotroller.editarUsuario);
router.delete('/usu/:id', productoCotroller.eliminarUsuario);

router.get('/ven', productoCotroller.obtenerVentas);
router.get('/ven/:id', productoCotroller.obtenerDetalleVenta);
router.delete('/ven/:id', productoCotroller.eliminarVenta);

module.exports = router;