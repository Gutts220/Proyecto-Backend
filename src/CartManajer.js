import {promises as fs} from 'fs';
import {v4 as uuidv4} from 'uuid'

export class CartManager {
  constructor() {
    this.path = 'carrito.json';
    this.carts = []
  }
  
  getCarts = async ()=>{
    const response = await fs.readFile(this.path, 'utf8')
    const responseJSON = JSON.parse(response)
    return responseJSON;
  }
   

  getCartProducts = async (id)=>{
    const carts = await this.getCarts();

    const cart = carts.find(cart=>cart.id == id);

    if(cart){
      return cart.product
    } else {
      console.error ('Carrito Inexistente')
    }
  }

  newCart = async() =>{
    const id = uuidv4();

    const newCart = {id, products : []}

    this.cart = await this.getCarts();

    this.carts.push(newCart)

    await fs.writeFile(this.path, JSON.stringify(this.carts))

    return newCart;
  }

  addProductToCart = async (cartId, productId)=>{
    
    const carts = await this.getCarts();
    const index = carts.findIndex(cart => cart.id == cartId);
    
    if(index != -1){
      const cartProducts = await this.getCartProducts(cartId)
      const existingProdIndex = cartProducts.findIndex(product => product.productId == productId)

      if(existingProdIndex != -1){
        cartProducts[existingProdIndex].quantity = cartProducts[existingProdIndex].quantity + 1
      }else {
        cartProducts.push({productId, quantity : 1 })
      }

      carts[index].products = cartProducts

      await fs.writeFile(this.path, JSON.stringify(carts))
      console.log('Producto Agregado')
    } else {
      console.error('Carrito Inexistente')
    }


  }
}

