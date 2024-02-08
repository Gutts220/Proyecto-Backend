import { Router } from "express";

const router = Router();

let productos = []

router.get("/", (req, res) => {
  res.render("home", {productos})
})

router.get('/realTimeProducts', (req, res) => {
  res.render('realTimeProducts', { productos });
});

export default router