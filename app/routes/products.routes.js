const router = require('express').Router();
const productController = require('../controller/productsController')
const{auth} = require('../middelware')


// ruta para ver todos los productos
router.get('/',[
    auth.verifyToken,
    productController.getProducts,
]);

// ruta para crear un nuevo producto
router.post('/',[
    auth.verifyToken,
    auth.isModerator,
    productController.createProduct
]);


// ruta para ver un producto por id 
router.get('/:productId',[
    productController.getProductById
]);

// ruta para actualizar producto por id
router.put('/:productId',[
    auth.verifyToken,
    auth.isAdmin,
    productController.updateProductById
])

// ruta para eliminar producto por id 
router.delete('/:productId',[
    auth.verifyToken,
    auth.isAdmin,
    productController.deletePRoductById
])

module.exports = router;