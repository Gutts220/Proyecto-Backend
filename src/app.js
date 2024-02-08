
import express from 'express';
import handlebars from 'express-handlebars';
import viewsRouter from "./routes/viewsRoutes.js"
import { Server } from 'socket.io';
import {ProdRoutes} from './routes/productRoutes.js';
import {CartRoutes} from './routes/cartRoutes.js';
import { ProductManager } from './ProductManager.js';
import __dirname from './utils.js';
import path from 'path';


const productManager = new ProductManager('productos.json');

const app = express();
const port = 8080;                
const API_PREFIX = 'api';

const httpServer =app.listen(port, () => {console.log(`Servidor escuchando en http://localhost:${port}`);});
const io = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({extended : true}))

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, "./views"));
app.set('view engine', 'handlebars'); 

app.use(express.static(path.join(__dirname, "../public")));
app.use("/", viewsRouter);

io.on('connection', (socket) => {
  console.log('Usuario conectado');

  socket.on("nuevo-msg", (msg) => {
    console.log(`nuevo mensaje ${msg}`)
  });
  
  socket.emit("nuevo.msg", "hola desde el sv!")
  
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

