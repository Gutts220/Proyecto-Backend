import { Router } from "express";
import { productModel } from "../dao/mongoDB/models/productModel.js";

let productos = productModel

export class viewsRoutes{

  router 

  constructor(){
    this.router = Router();
    this.initViewsRoutes();
  }

  initViewsRoutes(){
    
    this.router.get("/", (req, res) => {
      res.render("home", { js:"home.js",
      css:"style.css" })
    });
    
    this.router.get('/realTimeProducts', (req, res) => {
      res.render('realTimeProducts', { js:"realTimeProducts.js",
      css:"style.css" });
    });

    this.router.get("/chatContact", (req, res) => {
      res.render("chat", { js:"chat.js", 
      css: "style.css"});
    })

  }
   
}



