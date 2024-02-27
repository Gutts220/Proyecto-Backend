import {promises as fs} from 'fs';
import {v4 as uuidv4} from 'uuid'
import __dirname from '../../utils.js';
import { productModel } from '../mongoDB/models/productModel.js';

export class productManager {

  productModel;

  constructor() {
    this.path =  (__dirname + "/JSON/productos.json");
    this.products = [];
    this.productModel = new productModel
  }

  addProduct = async (productModel) => {
    const id  = uuidv4();
    
    let newProduct = {id, productModel}
    
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
    console.log(response)
   const product = response.find(product => product.id == id)

   if(product){
    return product
   } else{
    console.error('Producto Inexistente ------ getProductById')
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
  
