import { Router } from "express";

let productos = []

export class viewsRoutes{

  router = Router();
  

  constructor(){
    this.initViewsRoutes();
  }

  initViewsRoutes(){

    this.router.get("/", (req, res) => {
      res.render("home", {productos})
    });
    
    this.router.get('/realTimeProducts', (req, res) => {
      res.render('realTimeProducts', { productos });
    });

  }
   
}



