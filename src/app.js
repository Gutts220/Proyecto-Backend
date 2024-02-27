import express from 'express';
import handlebars from 'express-handlebars';
import displayRoutes from 'express-routemap';
import __dirname from './utils.js';
import { mongoDBconnection } from './dao/mongoConfig.js';
import  path from "path";
import { viewsRoutes } from './routes/viewsRoutes.js';


export class App{
  app;
  env;
  port;
  server;
  views
  

  constructor(routes){
    this.app = express();
    this.env = "development";
    this.port = 5000;
   
    this.connectToDataBase();
    this.initializeMiddleware();
    this.initializeRoutes(routes);
    this.initializeStaticsRoutes()
    this.initializeHandlerbars();
   }


   getServer(){
    return this.app;
   }

   closeServer(){
     this.server = this.app.listen(this.port,()=>{
        done();
     })
   }

   async connectToDataBase(){
      //TODO: Inicializar la conexion
      await mongoDBconnection()
   }

   initializeRoutes(routes){
      this.app.use(`/api`, routes[0].router)
      this.app.use(`/api`, routes[1].router)
      this.app.use(`/`, routes[2].router)
   }

   initializeStaticsRoutes(){
      
      this.app.use('/realTimeProducts', express.static(path.join(__dirname, '/public/JS/realTimeProducts')))
      this.app.use('/chatContact', express.static(path.join(__dirname, '/public/JS/chat')))
      this.app.use('/', express.static(path.join(__dirname, '/public/JS/home')))
   }
    
   initializeMiddleware(){
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true}));
    this.app.use( express.static(`${__dirname}/public`))
   }

   initializeHandlerbars(){
    this.app.engine("handlebars", handlebars.engine());
    this.app.set("views", __dirname + "/views");
    this.app.set("view engine", "handlebars");
   }

   listen(){
    this.app.listen(this.port, () => {
        displayRoutes(this.app);
        console.log(`======================================`)
        console.log(` === ENV: ${this.env}`)
        console.log(` === PORT: ${this.port}`)
        console.log(`======================================`)
    });
   }



}





