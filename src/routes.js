const express = require('express');
const router = express.Router();
const controller = require('./controller.js');

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

router.post('/', async (req, res) => {
  try {
    const newCart = req.body;
    newCart.id = uuidv4();
    await fs.writeFile('carrito.json', JSON.stringify(newCart, null, 2), 'utf-8');
    res.json({ message: 'Carrito creado correctamente.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el carrito.' });
  }
});

router.get('/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = await controller.getCartById(cartId);

    if (cart) {
      res.json({ products: cart.products });
    } else {
      res.status(404).json({ error: 'Carrito no encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos del carrito.' });
  }
});

router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity || 1;

    const cart = await controller.getCartById(cartId);

    if (!cart) {
      res.status(404).json({ error: 'Carrito no encontrado.' });
      return;
    }

    const productToAdd = { product: productId, quantity };
    const existingProductIndex = cart.products.findIndex(p => p.product === productId);

    if (existingProductIndex !== -1) {
      cart.products[existingProductIndex].quantity += quantity;
    } else {
      cart.products.push(productToAdd);
    }

    await fs.writeFile('carrito.json', JSON.stringify(cart, null, 2), 'utf-8');
    res.json({ message: 'Producto agregado al carrito correctamente.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar producto al carrito.' });
  }
});

module.exports = router;