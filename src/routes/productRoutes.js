
const{Router} = require('express');
const { ProductManager } = require('./ProductManager');
const router = Router();
const productManager = new ProductManager('productos.json'); 

router.use(express.json());

router.get('/products', async (req, res) => {
  try {
    const limit = req.query.limit;
    const products = await productManager.getProducts();
    
    if (limit) {
      const limitedProducts = products.slice(0, parseInt(limit, 10));
      res.json({ products: limitedProducts });
    } else {
      res.json({ products });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos.' });
  }
});

router.get('/products/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid, 10);
    const product = await productManager.getProductById(productId);

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
    await productManager.addProduct(newProduct);
    res.json({ message: 'Producto agregado correctamente.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el producto.' });
  }
});

router.put('/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid, 10);
    const updatedProductData = req.body;
    await productManager.updateProduct(productId, updatedProductData);
    res.json({ message: 'Producto actualizado correctamente.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto.' });
  }
});

router.delete('/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid, 10);
    await productManager.deleteProduct(productId);
    res.json({ message: 'Producto eliminado correctamente.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto.' });
  }
});

module.exports = router;