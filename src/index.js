import { App } from "./app.js";
import { cartRoutes } from "./routes/cartRoutes.js";
import { ProdRoutes } from "./routes/productRoutes.js";
import { productManager } from "./dao/fileSystem/ProductManager.js";


const app = new App([
    new ProdRoutes(),
    new cartRoutes(),
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