

const{Router} = require('express');
 
const router = Router();
const controller = require('../controller.js');



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