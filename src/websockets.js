import { productManager } from "./dao/fileSystem/ProductManager.js";
import { mongoProductManager } from "./dao/mongoDB/productDao.js";
import { mongoCartManager } from "./dao/mongoDB/cartDao.js";

const prodManager = new productManager;
let messages = [];
let connectedUsers = new Set();

export default (io) =>{

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
      
        console.log("New connection: ", socket.id)
    
        socket.on("authenticate", (userName) => {
          socket.userName = userName;
          connectedUsers.add(userName);
          socket.broadcast.emit("userConnected", userName);
          socket.emit("messageLogs", messages);
        });
        
        socket.on("message", data => {
          messages.push(data);
          io.emit("messageLogs", messages)
        })
    
        socket.on("disconnect", () => {
          if (socket.userName) {
            const disconnectedUser = Array.from(connectedUsers).find(user => user !== socket.userName);
            connectedUsers.delete(disconnectedUser); 
            if (disconnectedUser) {
              io.emit("userDisconnected", disconnectedUser); 
            }      
          }
    
        });
      })

}
