const fs = require('fs');
import {v4 as uuidv4} from 'uuid'

export class ProductManager {
  constructor() {
    
    this.path = 'productos.json';
    this.products = [];
  }

  addProduct = async ({title, description, price, thumbnail, code, stock, status, category}) => {
    const id  = uuidv4();
    
    let newProduct = {title, description, price, thumbnail, code, stock, status, category}
    
    this.products = await this.getProduct()

    this.products.push(newProduct);

    await fs.writeFile(this.path, JSON.stringify(this.products))
    
    console.log('Producto agregado correctamente.');
    
    return newProduct;
  } 

  getProduct = async () =>{

    const response = await fs.readFile(this.path, 'utf8');

    const responseJSON = JSON.parse(response);

    return responseJSON;
  }

  getProductById = async (id) =>{

   const response = await this.getProduct()

   const product = response.find(product => product.id == id)

   if(product){
    return product
   } else{
    console.error('Producto Inexistente')
   }

  }

  updateProduct = async (id, {... data}) =>{
    const response = this.getProduct();
    
    const index = response.findIndex(product => product.id == id)

    if(index != -1){
      response[index] = {id, ...data}
      await fs.writeFile(this.path, JSON.stringify(response))
      return response[index]
    } else {
      console.error('Producto Inexistente')
    }

  }

  deleteProduct = async (id) =>{

    const response = await this.getProduct()
 
    const index = response.findIndex(product => product.id == id)
    
    if(index != -1){ 
      this.products.splice(index, 1)
      await fs.writeFile(this.path, JSON.stringify(products))
    }else{
      console.error('Producto Inexistente')
    }
 
  }

}
  
