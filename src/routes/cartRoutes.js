import {Router} from 'express';
import { CartManager } from '../dao/fileSystem/CartManajer.js';
import { mongoCartManager } from '../dao/mongoDB/cartDao.js';

export class cartRoutes {
  router;
  cartManager;
  

  constructor(){
    this.router = Router();
    this.cartManager = new CartManager('carrito.json');
    this.initCartRoutes();
  }

  initCartRoutes(){

    this.router.post('/', async (req, res) => {
      try {
        res.send(await mongoCartManager.createCart());
      } catch (error) {
        res.status(500).json({ error: 'Error al crear el carrito. - cartRouter.post-(/)-22 -' });
      }
    });
    
    this.router.get('/:cid', async (req, res) => {
        try {
          const cid = req.params.cid
          res.send(await mongoCartManager.getCarrito(cid))
        } catch (error) {
          res.status(500).json({ error: 'Error al obtener productos del carrito. - cartRouter.get-(/:cid)-32 -' });
        }
    });
    
    this.router.post('/:cid/products/:pid', async (req, res) => {
        try {
          const cid = req.params.cid
          const pid = req.params.pid;
          const quantity = req.body.quantity;
          res.send(await mongoCartManager.addAndUpdateCart(cid,pid, quantity));

        } catch (error) {
          res.status(500).json({ error: 'Error al agregar producto al carrito.- cartRouter.post-(/:cid/products/:pid)-44 -' });
        }
    });

  }
}

 



