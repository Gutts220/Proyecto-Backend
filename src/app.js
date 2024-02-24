import express from 'express';
import handlebars from 'express-handlebars';
import displayRoutes from 'express-routemap';
import __dirname from './utils.js';
import { mongoDBconnection } from './dao/mongoConfig.js';


export class App{
  app;
  env;
  port;
  server;

  constructor(routes){
    this.app = express();
    this.env = "development";
    this.port = 5000;
    
    this.connectToDataBase();
    this.initializeMiddleware();
    this.initializeRoutes(routes);
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
     routes.forEach((route) => {
        this.app.use(`/api`, route.router)
     });
   }
    
   initializeMiddleware(){
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true}));
    this.app.use("/static", express.static(`${__dirname}/public`))
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





