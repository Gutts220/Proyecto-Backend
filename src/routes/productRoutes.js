
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
        res.status(500).json({ error: 'Error al obtener   productos.- productRouter.get-(/)-59 -'});
      }
    });
  
    this.router.get('/:pid', async (req, res) => {
      try{
        const pid = req.params.pid;
        res.send(await mongoProductManager.getProductById(pid))
      } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error al obtener producto.- productRouter.get-(/:cid)-69 -'});
      }
    });
    
    this.router.post('/', async (req, res) => {
      try {
        res.send(await mongoProductManager.addProduct(req.body))  
      } catch (error) {
        res.status(500).json({ error: 'Error al agregar   el producto.- productRouter.post-(/)-77 -' });
      }
    });

    this.router.post("/many", async (req, res) => {
      
      try {
        res.send(await mongoProductManager.addMany(req.body))
      } catch (error) {
        res.status(500).json({ error: 'Error al agregar   el producto.- productRouter.post-(/many)-86 -' });
      }   
    });
    
    this.router.put('/:pid', async (req, res) => {
      try {
        const { pid } = req.params;
        res.send(await mongoProductManager.updateProduct(pid, req.body))
      } catch (error) {
        res.status(500).json({ error: 'Error al   actualizar el producto.- productRouter.put-(/:pid)-95 -' });
      }
    });
  
    this.router.delete('/:pid', async (req, res) => {
      try {
        const { pid } = req.params;
        res.send(await mongoProductManager.deleteProduct(pid))
        res.json({ message: 'Producto eliminado correctamente.' });
      } catch (error) {
        res.status(500).json({ error: 'Error al eliminar   el producto.- productRouter.delete-(/:pid)-95 -' });
      }
    });

    this.router.get("/sort/many", async (req, res) =>{
      try {
        const sorting = await productModel.aggregate([
          {
            $sort:
              {
                price: 1,
              },
          },
        ])
    
        return res.json({ mesagge: "Producto encontrado correctamente ", sorting})
    
      } catch (error) {
        return res.json({error: "Error al buscar el producto.- productRouter.get-(/sort/many)-123 -"})
      }
    })
  }
}



