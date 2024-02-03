

import {Router, response} from 'express';
import { CartManager } from './CartManager';
const router = Router();
const cartManager = new CartManager('carrito.json'); 

router.post('/', async (req, res) => {
    try {
      const response = await cartManager.newCart();
     
      res.json(response);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el carrito.' });
    }
});
  
router.get('/:cid', async (req, res) => {
    try {
      const {cartId} = req.params;
      const response = await cartManager.getCartById(cartId);
  
      res.json(response)
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener productos del carrito.' });
    }
});
  
router.post('/:cid/products/:pid', async (req, res) => {
    try {
      const {cartId} = req.params;
      const {productId} = req.params;
  
      await cartManager.addProductToCart(cartId, productId);
      io.emit('productoAgregadoAlCarrito', { cartId, productId });
    } catch (error) {
      res.status(500).json({ error: 'Error al agregar producto al carrito.' });
    }
});

export  {router}