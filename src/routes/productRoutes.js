
const{Router} = require('express');
 
const router = Router();

const controller = require('../controller.js');

router.get('/', async (req, res) => {
  try {
    const limit = req.query.limit;
    const products = await controller.getProducts();
    
    if (limit) {
      const limitedProducts = products.slice(0, parseInt(limit, 10));
      res.json({ products: limitedProducts });
    } else {
      res.json({ products });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener productos.' });
  }
});

router.get('/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid, 10);
    const product = await controller.getProductById(productId);

    if (product) {
      res.json({ product });
    } else {
      res.status(404).json({ error: 'Producto no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newProduct = req.body;
    await controller.addProduct(newProduct);
    res.json({ message: 'Producto agregado correctamente.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el producto.' });
  }
});

router.put('/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid, 10);
    const updatedProductData = req.body;
    await controller.updateProduct(productId, updatedProductData);
    res.json({ message: 'Producto actualizado correctamente.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto.' });
  }
});

router.delete('/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid, 10);
    await controller.deleteProduct(productId);
    res.json({ message: 'Producto eliminado correctamente.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto.' });
  }
});

module.exports = router;