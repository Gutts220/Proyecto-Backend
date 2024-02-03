
const express = require('express');
const ProdRoutes = require('./routes/productRoutes.js');
const CartRoutes = require('./routes/cartRoutes.js');
const exphbs = require('express-handlebars');
const http = require('http');
const socketIO = require('socket.io');
const { ProductManager } = require('./ProductManager.js');

const productManager = new ProductManager('productos.json');

const app = express();
const port = 8080;                
const API_PREFIX = 'api';
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.json());
app.use(express.urlencoded({extended : true}))

app.engine(
  'handlebars',
  exphbs({ defaultLayout: 'main', extname: '.handlebars' })
);
app.set('view engine', 'handlebars');

io.on('connection', (socket) => {
  console.log('Usuario conectado');

  
  socket.on('nuevoProducto', async ({title, description, price, thumbnail, code, stock, status, category}) => {
    const id  = uuidv4();
    
    let newProduct = {title, description, price, thumbnail, code, stock, status, category}
    
    this.products = await productManager.getProduct()

    this.products.push(newProduct);

    await fs.writeFile(this.path, JSON.stringify(this.products))
    
    io.emit('productoAgregado', {title, description, price, thumbnail, code, stock, status, category});
  });

  socket.on('eliminarProducto', async (id) => {
    const response = await productManager.getProduct()
 
    const index = response.findIndex(product => product.id == id)
    
    if(index != -1){ 
      this.products.splice(index, 1)
      await fs.writeFile(this.path, JSON.stringify(products))
    }else{
      console.error('Producto Inexistente')
    }
    io.emit('productoEliminado', id);
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
});

app.use(`/${API_PREFIX}/cart`, CartRoutes);
app.use(`/${API_PREFIX}/products`, ProdRoutes);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});