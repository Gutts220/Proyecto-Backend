import { Router } from "express";
import { productModel } from "../dao/mongoDB/models/productModel.js";

let productos = productModel

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

    this.router.get("/chatContact", (req, res) => {
      res.render("chat", { style: "chat.css"});
    })

  }
   
}



