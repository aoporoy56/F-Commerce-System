const { createProduct, allProduct, getProduct, updateProduct, deleteProduct } = require('../Controller/ProductController');

const ProductRouter = require('express').Router();


ProductRouter.post('/create', createProduct);
ProductRouter.get('/', allProduct);
ProductRouter.get('/:id', getProduct);
ProductRouter.put('/:id', updateProduct);
ProductRouter.delete('/:id', deleteProduct);

module.exports = ProductRouter;