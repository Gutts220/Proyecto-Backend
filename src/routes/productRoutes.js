
import {Router} from 'express';
import { productManager } from '../dao/fileSystem/ProductManager.js';
import { productModel } from '../dao/mongoDB/models/productModel.js';
import { mongoProductManager } from '../dao/mongoDB/productDao.js';

export class prodRoutes {

  router;
  prodMan;
  prodModel;

  constructor() {
    this.router = Router();
    this.prodMan = new productManager('productos.json');
    this.prodModel = new productModel
    this.initProdRoutes();
  }
  
  initProdRoutes() {
    this.router.get('/', async (req, res) => {
      const { limit = 7, page = 1, category, sort = 1 } = req.query;

      const options = {
        limit: limit,
        page: page,
        category: category,
        sort: {
          price: sort,
        }
      }
      
      try {
        const {
          docs,
          totalDocs,
          limit: limitPag,
          totalPages,
          hasPrevPage,
          hasNextPage,
          nextPage,
          prevPage,
        } = await productModel.paginate({title: filter}, {options})

        return res.json({
          Status: 'success',
          mensaje: 'Busqueda exitosa',
          Payload: docs,
          totalPages: totalDocs,
          nextPage: nextPage,
          prevPage: prevPage,
          page: page,
          totalPages: totalPages,
          hasPrevPage: hasPrevPage,
          hasNextPage: hasNextPage,
        })
      } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Error al obtener   productos.- productRouter.get-(/)-59 -', error: error });
      }
    });
  
    this.router.get('/:pid', async (req, res) => {
      try{
        const pid = req.params.pid;
        res.send(await mongoProductManager.getProductById(pid))
      } catch (error) {
        console.log(error)
        res.status(500).json({ msg: 'Error al obtener producto.- productRouter.get-(/:cid)-69 -', error: error });
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


