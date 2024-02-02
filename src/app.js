const express = require('express');
const ProdRoutes = require('./routes/productRoutes.js');
const CartRoutes = require('./routes/cartRoutes.js');
const app = express();
const port = 8080;                
const API_PREFIX = 'api';

app.use(express.json());
app.use(express.urlencoded({extended : true}))
app.use(`/${API_PREFIX}/cart`, CartRoutes);
app.use(`/${API_PREFIX}/products`, ProdRoutes);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});