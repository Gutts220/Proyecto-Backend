import { App } from "./app.js";
import { cartRoutes } from "./routes/cartRoutes.js";
import { prodRoutes } from "./routes/productRoutes.js";
import { productManager } from "./dao/fileSystem/ProductManager.js";
import { Server } from "socket.io";
import { viewsRoutes } from "./routes/viewsRoutes.js";

const app = new App([
    new prodRoutes(),
    new cartRoutes(),
    new viewsRoutes(),
])

const httpServer =app.listen();
const io = new Server(httpServer);

const prodManager = new productManager();

io.on('connection', async (socket) => {
  console.log('Usuario conectado');


  io.emit('productos', await prodManager.getProduct());

 
  socket.on('nuevoProducto', async (nuevoProducto) => {

    await prodManager.addProduct(nuevoProducto)
    
    io.emit('productos', await prodManager.getProduct());
  });

  
  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
});