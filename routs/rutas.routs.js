const { Router } = require("express");

const { getProductos, eliminarProducto, insertarProducto, actualizarProducto, verificarExiste,} = require('../controller/productos.controler')


const router = Router();


router.get('/productos',getProductos);

router.post('/productos',insertarProducto);

router.delete('/productos',verificarExiste,eliminarProducto);

router.put('/productos',verificarExiste, actualizarProducto);

//router.get('/productos/Prueva', getProductos);

module.exports = router