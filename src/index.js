import { App } from "./app.js";
import { cartRoutes } from "./routes/cartRoutes.js";
import { prodRoutes } from "./routes/productRoutes.js";
import { productManager } from "./dao/fileSystem/ProductManager.js";
import { Server } from "socket.io";
import { viewsRoutes } from "./routes/viewsRoutes.js";
import websockets from "./websockets.js";

const app = new App([
    new prodRoutes(),
    new cartRoutes(),
    new viewsRoutes(),
])

const httpServer =app.listen();
const io = new Server(httpServer)

websockets(io)