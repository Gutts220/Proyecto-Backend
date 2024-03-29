import { App } from "./app.js";
import { cartRoutes } from "./routes/cartRoutes.js";
import { prodRoutes } from "./routes/productRoutes.js";
import { Server } from "socket.io";
import websockets from "./websockets.js";
import { viewsRoutes } from "./routes/viewsRoutes.js";



const app = new App([
    new prodRoutes(),
    new cartRoutes(),
    new viewsRoutes(),
])

const httpServer =app.listen();
const io = new Server(httpServer)

websockets(io)



