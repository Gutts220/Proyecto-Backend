
import {Router} from 'express';
import { ProductManager } from '../ProductManager.js';

const ProdRoutes = Router();
const productManager = new ProductManager('productos.json'); 



ProdRoutes.get('/', async (req, res) => {
  try {
    const {limit } = req.query;
    const products = await productManager.getProducts();
    
    if (limit) {
      const limitedProducts = products.slice(0, limit);
      return res.json({ products: limitedProducts });
    } else {
      return res.json({ products });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos.' });
  }
});

ProdRoutes.get('/:pid', async (req, res) => {
  try {
    const {productId} = req.params;
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


ProdRoutes.post('/', async (req, res) => {
  try {
    const {title, description, price, thumbnail, code, stock, status=true, category}= req.body;
    const response = await productManager.addProduct({title, description, price, thumbnail, code, stock, status, category});
    io.emit('productoAgregado', response);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el producto.' });
  }
});

ProdRoutes.put('/:pid', async (req, res) => {
  try {
    const {productId} = req.params;
    const {title, description, price, thumbnail, code, stock, status=true, category} = req.body;

    const response =await productManager.updateProduct(productId, {title, description, price, thumbnail, code, stock, status, category});
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto.' });
  }
});

ProdRoutes.delete('/:pid', async (req, res) => {
  try {
    const {productId} =req.params;
    await productManager.deleteProduct(productId);
    res.json({ message: 'Producto eliminado correctamente.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto.' });
  }
});

export {ProdRoutes};