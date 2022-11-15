const pool = require('../database/db');

/**
 * Metodo obtener producto por id
 * 
 * @param {params.id} req atrapar el id del producto que fue seleccionado
 * @param {result} res Regresa el resultado de la consulta
 * @param {err} next Error
 */
exports.obtenerProductosId = async (req, res, next) => {
    id_producto = req.params.id;
    try {
        const result = await pool.execute(`SELECT id_producto, nomProducto, desProducto, cantidad,
         precio, id_usuario, id_Estatus, id_catProducto FROM productos 
         WHERE id_producto = ?`, [id_producto]);
        res.status(200).json(result[0][0]);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

/**
 * Metodo obtener img por id
 * 
 * @param {params.id} req atrapar el id del producto que fue seleccionado
 * @param {result} res Regresa el resultado de la consulta
 * @param {err} next Error
 */
 exports.obtenerImgId = async (req, res, next) => {
    id_producto = req.params.id;
    try {
        const result = await pool.execute(`SELECT imgProducto FROM productos 
         WHERE id_producto = ?`, [id_producto]);
        res.status(200).json(result);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}


/**
 * Metodo obtener productos
 * 
 * @param {result} res resultado de la consulta
 * @param {err} next Error
 */
exports.obtenerProductos = async (req, res, next) => {

    try {
        const result = await pool.execute(`SELECT id_producto, nomProducto, desProducto, cantidad,
         precio, id_usuario, id_Estatus, id_catProducto FROM productos`);
        res.status(200).json(result[0]);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

/**
 * Metodo obtener categoria
 * 
 * @param {result} res resultado de la consulta
 * @param {err} next Error
 */
exports.obtenerCategoriaPro = async (req, res, next) => {

    try {
        const result = await pool.execute(`SELECT id_catProducto, nomCategoria FROM catproducto`);
        res.status(200).json(result[0]);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

/**
 * Metodo obtener categoria
 * 
 * @param {result} res resultado de la consulta
 * @param {err} next Error
 */
exports.obtenerRol = async (req, res, next) => {

    try {
        const result = await pool.execute(`SELECT id_rol, nombre_rol FROM rol`);
        res.status(200).json(result[0]);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

/**
 * 
 * Metodo para agregar producto
 * 
 * @param {body} req Traer todos los datos del producto para agregar un nuevo producto
 * @param {status(200)} res Se agrego exitosamente
 * @param {err} next Error
 */
exports.crearProductos = async (req, res, next) => {

    nomProducto = req.body.nomProducto;
    desProducto = req.body.desProducto;
    cantidad = req.body.cantidad;
    precio = req.body.precio;
    id_usuario = req.body.id_usuario;
    id_Estatus = req.body.id_Estatus;
    id_catProducto = req.body.id_catProducto;
    try {
        const result = await pool.execute(`INSERT INTO productos(id_producto, nomProducto,
            desProducto, cantidad, precio, id_usuario, id_Estatus, id_catProducto)
            VALUES ( "", ?, ?, ?, ?, ?, ?, ?)`,
            [nomProducto, desProducto, cantidad, precio, id_usuario, id_Estatus, id_catProducto]);

        const idProNew = await pool.execute(`SELECT LAST_INSERT_ID() as id;`);
            res.status(200).json(idProNew[0]);
        } catch (err) {
            console.log(err);
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

/**
 * 
 * Metodo para editar producto
 * 
 * @param {body} req Traer datos a editar
 * @param {status(200)} res Respuesta de exito
 * @param {*} next Error
 */
exports.editarProductos = async (req, res, next) => {

    id_producto = req.body.id_producto;
    nomProducto = req.body.nomProducto;
    desProducto = req.body.desProducto;
    cantidad = req.body.cantidad;
    precio = req.body.precio;
    id_usuario = req.body.id_usuario;
    id_Estatus = req.body.id_Estatus;
    id_catProducto = req.body.id_catProducto;
    try {
        const result = await pool.execute(`UPDATE productos SET nomProducto = ?, desProducto = ? ,
        cantidad = ?, precio = ? , id_usuario = ? , id_Estatus = ? , id_catProducto = ?  
        WHERE id_producto = ?`,
            [nomProducto, desProducto, cantidad, precio, id_usuario, id_Estatus,
                id_catProducto, id_producto]);
        res.status(200).json({message: "Editado correctamente"});
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

/**
 * 
 * Metodo para editar img
 * 
 * @param {body} req Traer datos a editar
 * @param {status(200)} res Respuesta de exito
 * @param {*} next Error
 */
 exports.addImg = async (req, res, next) => {

    id_producto = req.body.id_producto;
    imgProducto = req.body.imgProducto;
    try {
        const result = await pool.execute(`UPDATE productos SET imgProducto = ? 
        WHERE id_producto = ?`,
            [imgProducto, id_producto]);
        res.status(200).json(result);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

/**
 * Metodo eliminar producto por id
 * 
 * @param {params.id} req Traer id
 * @param {status(200)} res Eliminado correctamente
 * @param {err} next Error 
 */
exports.eliminarProductos = async (req, res, next) => {
    id_producto = req.params.id;
    try {
        const result = await pool.execute(`DELETE FROM productos WHERE id_producto = ?`, [id_producto]);
        res.status(200).json(result);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

/**
 * Metodo optener Usuarios
 * 
 * @param {result} res Enviar todos los usuarios de la base de datos
 * @param {err} next Error
 */
exports.obtenerUsuario = async (req, res, next) => {
    try {
        const result = await pool.execute(`SELECT id_usuario, nombre, apellido_paterno,
         apellido_materno, password,correo, usuario, id_rol, id_Estatus FROM usuarios`);
        res.status(200).json(result);

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

/**
 * Metodo obtener usuario por id
 * 
 * @param {params.id} req Traer id del usuario
 * @param {result} res Datos del usuario seleccionado
 * @param {err} next Error
 */
exports.obtenerUsuarioId = async (req, res, next) => {
    id_usuario = req.params.id;
    try {
        const result = await pool.execute(`SELECT CONCAT(nombre," ",apellido_paterno," ",apellido_materno) nombre, id_rol, id_Estatus FROM usuarios WHERE id_usuario = ?`, [id_usuario]);
        
        res.status(200).json(result[0][0]);

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

/**
 * 
 * Metodo editar usuario
 * 
 * @param {body} req Traer los datos a editar
 * @param {status(200)} res Editado correctamente
 * @param {err} next Error 
 */
exports.editarUsuario = async (req, res, next) => {

    id_usuario = req.body.id_usuario;
    nombre = req.body.nombre;
    apellido_paterno = req.body.apellido_paterno;
    apellido_materno = req.body.apellido_materno;
    id_rol = req.body.id_rol;
    id_Estatus = req.body.id_Estatus;
    try {
        const result = await pool.execute(`UPDATE usuarios SET nombre = ? , apellido_paterno = ? , 
        apellido_materno = ? , id_rol = ? , id_Estatus = ? 
        WHERE id_usuario = ?`,
            [nombre, apellido_paterno, apellido_materno,
                id_rol, id_Estatus, id_usuario]);
        res.status(200).json(result);
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

/**
 * 
 * Metodo eliminar usuario
 * 
 * @param {params.id} req Traer id del usuario a eliminar
 * @param {status(200)} res Eliminado correctamente
 * @param {err} next Error
 */
exports.eliminarUsuario = async (req, res, next) => {
    id_usuario = req.params.id;
    try {
        const result = await pool.execute(`DELETE FROM usuarios WHERE id_usuario = ?`, [id_usuario]);
        res.status(200).json(result);

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

/**
 * 
 * Metodo obter Ventas
 * 
 * @param {result} res Enviar ventas
 * @param {err} next Error
 */
exports.obtenerVentas = async (req, res, next) => {
    try {
        const result = await pool.execute(`SELECT ven.id_venta, ven.nomVenta, ven.desVenta, ven.canVenta,
        ven.id_producto, pro.nomProducto, ven.id_usuario, 
        CONCAT(usu.nombre," ",usu.apellido_paterno," ",usu.apellido_materno) nombre, 
        ven.totalVenta FROM ventas ven INNER JOIN productos pro ON pro.id_producto = ven.id_producto 
        INNER JOIN usuarios usu ON usu.id_usuario = ven.id_usuario`);
        res.status(200).json(result[0]);

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

/**
 * 
 * Metodo obtener detalle venta
 * 
 * @param {params.id} req Traer id de la venta seleccionada
 * @param {result} res Enviar venta seleccionada
 * @param {err} next Error
 */
exports.obtenerDetalleVenta = async (req, res, next) => {
    id_venta = req.params.id;
    try {
        const result = await pool.execute(`SELECT ven.nomVenta, ven.desVenta, ven.canVenta,
         ven.id_producto, pro.nomProducto, ven.id_usuario, 
         CONCAT(usu.nombre," ",usu.apellido_paterno," ",usu.apellido_materno) nombre, 
         ven.totalVenta FROM ventas ven INNER JOIN productos pro ON pro.id_producto = ven.id_producto 
         INNER JOIN usuarios usu ON usu.id_usuario = ven.id_usuario WHERE ven.id_venta = ?`, [id_venta]);
        res.status(200).json(result[0][0]);

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

/**
 * 
 * Metodo eliminar Venta
 * 
 * @param {params.id} req Traer id del usuario a eliminar
 * @param {status(200)} res Eliminado correctamente
 * @param {err} next Error
 */
exports.eliminarVenta = async (req, res, next) => {
    id_venta = req.params.id;
    try {
        const result = await pool.execute(`DELETE FROM ventas WHERE id_venta = ?`, [id_venta]);
        res.status(200).json({message: 'Eliminado correctamente'});

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}