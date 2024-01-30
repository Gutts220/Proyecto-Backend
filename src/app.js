const express = require('express');
// const { ProductManager } = require('./ProductManager');
const productRoutes = require('./routes/productRoutes.js');
const cartRoutes = require('./routes/cartRoutes.js');
const app = express();
const port = 8080;
const API_PREFIX = 'api';


// const productManager = new ProductManager('productos.json'); 

// app.use(express.json());

// app.get('/products', async (req, res) => {
//   try {
//     const limit = req.query.limit;
//     const products = await productManager.getProducts();
    
//     if (limit) {
//       const limitedProducts = products.slice(0, parseInt(limit, 10));
//       res.json({ products: limitedProducts });
//     } else {
//       res.json({ products });
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Error al obtener productos.' });
//   }
// });

// app.get('/products/:pid', async (req, res) => {
//   try {
//     const productId = parseInt(req.params.pid, 10);
//     const product = await productManager.getProductById(productId);

//     if (product) {
//       res.json({ product });
//     } else {
//       res.status(404).json({ error: 'Producto no encontrado.' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Error al obtener el producto.' });
//   }
// });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`/${API_PREFIX}/products`, productRoutes);

app.use(`/${API_PREFIX}/cart`, cartRoutes);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});