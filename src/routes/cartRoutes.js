import {Router} from 'express';
import { CartManager } from '../dao/fileSystem/CartManajer.js';

export class cartRoutes {
  router = Router();
  cartManager = new CartManager('carrito.json');


  constructor(){

    this.initCartRoutes();

  }

  initCartRoutes(){

    this.router.post('/', async (req, res) => {
      try {
        const response = await cartManager.newCart();
       
        res.json(response);
      } catch (error) {
        res.status(500).json({ error: 'Error al crear el carrito.' });
      }
    });
    
    this.router.get('/:cid', async (req, res) => {
        try {
          const {cartId} = req.params;
          const response = await cartManager.getCartById(cartId);
      
          res.json(response)
        } catch (error) {
          res.status(500).json({ error: 'Error al obtener productos del carrito.' });
        }
    });
    
    this.router.post('/:cid/products/:pid', async (req, res) => {
        try {
          const {cartId} = req.params;
          const {productId} = req.params;
        
          await cartManager.addProductToCart(cartId, productId);
          io.emit('productoAgregadoAlCarrito', { cartId, productId });
        } catch (error) {
          res.status(500).json({ error: 'Error al agregar producto al carrito.' });
        }
    });

  }
}

 



