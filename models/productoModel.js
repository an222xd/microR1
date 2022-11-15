const conexion = require('../database/db');

module.exports = {
    agregarFoto(idProducto, nombreFoto) {
        try {
            return conexion.execute(`insert into fotos_productos
            (id_producto, foto)
            values
            (?, ?)`,
        [idProducto, nombreFoto]);
        } catch (err) {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        }
    }
}