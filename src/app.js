
import express from 'express';
import handlebars from 'express-handlebars';
import viewsRouter from "./routes/viewsRoutes.js"
import { Server } from 'socket.io';
import {ProdRoutes} from './routes/productRoutes.js';
import {CartRoutes} from './routes/cartRoutes.js';

import __dirname from './utils.js';
import path from 'path';




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

let productos = [];
let idCounter = 1;

io.on('connection', (socket) => {
  console.log('Usuario conectado');


  io.emit('productos', productos);

 
  socket.on('nuevoProducto', (nuevoProducto) => {

    productos.push(nuevoProducto);
    
    io.emit('productos', productos);
  });

  
  socket.on('eliminarProducto', (productoName) => {
    productos = productos.filter((producto) => producto.name !== productoName);
    
    io.emit('productos', productos);
  });

  
  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
});

app.use(`/${API_PREFIX}/cart`, CartRoutes);
app.use(`/${API_PREFIX}/products`, ProdRoutes);

