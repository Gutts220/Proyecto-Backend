
import {Router} from 'express';
import { productManager } from '../dao/fileSystem/ProductManager.js';

 

export class prodRoutes {

  router = Router();
  prodMan = new productManager('productos.json');

  constructor() {

    this.initProdRoutes();

  }
  
  initProdRoutes() {
    this.router.get('/', async (req, res) => {
      try {
        const {limit } = req.query;
        const products = await prodMan.getProducts();
        
        if (limit) {
          const limitedProducts = products.slice(0,   limit);
          return res.json({ products: limitedProducts });
        } else {
          return res.json({ products });
        }
      } catch (error) {
        res.status(500).json({ error: 'Error al obtener   productos.' });
      }
    });
  
    this.router.get('/:pid', async (req, res) => {
      try {
        const {productId} = req.params;
        const product = await prodMan.getProductById  (productId);
    
        if (product) {
          res.json({ product });
        } else {
          res.status(404).json({ error: 'Producto no   encontrado.' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Error al obtener   el producto.' });
      }
    });
  
  
    this.router.post('/', async (req, res) => {
      try {
        const {title, description, price, thumbnail,   code, stock, status=true, category}= req.body;
        const response = await prodMan.addProduct  ({title, description, price, thumbnail, code,   stock, status, category});
        io.emit('productoAgregado', response);
      } catch (error) {
        res.status(500).json({ error: 'Error al agregar   el producto.' });
      }
    });
    
    this.router.put('/:pid', async (req, res) => {
      try {
        const {productId} = req.params;
        const {title, description, price, thumbnail,   code, stock, status=true, category} = req.body;
    
        const response =await prodMan.updateProduct  (productId, {title, description, price,   thumbnail, code, stock, status, category});
        res.json(response);
      } catch (error) {
        res.status(500).json({ error: 'Error al   actualizar el producto.' });
      }
    });
  
    this.router.delete('/:pid', async (req, res) => {
      try {
        const {productId} =req.params;
        await prodMan.deleteProduct(productId);
        res.json({ message: 'Producto eliminado   correctamente.' });
      } catch (error) {
        res.status(500).json({ error: 'Error al eliminar   el producto.' });
      }
    });
  }




}


