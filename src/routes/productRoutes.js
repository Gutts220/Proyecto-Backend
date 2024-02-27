
import {Router} from 'express';
import { productManager } from '../dao/fileSystem/ProductManager.js';
import { productModel } from '../dao/mongoDB/models/productModel.js';
 

export class prodRoutes {

  router
  prodMan
  prodModel

  constructor() {
    this.router = Router();
    this.prodMan = new productManager('productos.json');
    this.prodModel = new productModel
    this.initProdRoutes();
  }
  
  initProdRoutes() {
    this.router.get('/', async (req, res) => {
      
      try {

        const {limit } = req.query;
        const products = await this.prodMan.getProducts();
        if (limit) {
          const limitedProducts = products.slice(0,   limit);
          return res.json({ products: limitedProducts });

        } else {

          return res.json({ products });
        }
      } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Error al obtener   productos.', error: error });
      }
    });
  
    this.router.get('/:pid', async (req, res) => {
      try {
        const {pid} = req.params;
        const product = await this.prodMan.getProductById(pid);
    
        if (product) {
          res.json({ product });
        } else {
          res.status(404).json({ error: 'Producto no   encontrado.' });
        }
      } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Error al obtener   producto.', error: error });
      }
    });
  
  
    this.router.post('/', async (req, res) => {
      try {
        const prodModel= req.body;
        // const response = await prodMan.addProduct  (prodModel);
        io.emit('productoAgregado', response);
      } catch (error) {
        res.status(500).json({ error: 'Error al agregar   el producto.' });
      }
    });
    
    this.router.put('/:pid', async (req, res) => {
      try {
        const {productId} = req.params;
        const prodModel = req.body;
    
        const response =await prodMan.updateProduct  (productId, prodModel);
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


