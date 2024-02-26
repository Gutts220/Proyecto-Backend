import { cartModel } from "../models/cart.model.js";
import { productModel } from "../models/product.model.js"


class CartDAO {
    async findAll(limit) {
        try {
            return await cartModel.find().limit(limit);
        } catch (error) {
           return {status: "failed", message: error.msg} 
        }
    }

    async getCarrito(cid) {
            //agregando el populate a la busqueda de carrito por cid
            try {
                const busqueda =  await cartModel.find({_id : cid}).populate("products.product",{title: 1, price: 1,stock:1, code: 1});
                return busqueda
            } catch (error) {
                return {status: "failed", message: "NO EXISTE EL ID DE INGRESADO"} 
            }
        }

    async createCart() {
        try {
            const cart = await cartModel.create({})
            return {status: "success", msg:`CARRITO CREADO CON EXITO`, cart}
            }    
        catch (error) {
            return{status: "failed", message: error.message}
        }
    }

    async addAndUpdateCart(cid, prodId, quantity) {
       
        try{
        const cart = await cartModel.findById(cid)
        const product = await productModel.findById(prodId)

        if (!cart) {
            throw new Error(`NO EXISTE EL CARRITO CON ID ${cid} EN LA BASE DE DATOS`);
        }
        if (!product) {
            throw new Error(`NO EXISTE EL PRODUCTO CON ID ${prodId} EN LA BASE DE DATOS`);
        }
        if (!quantity || quantity <= 0 ) {
            throw new Error(`DEBE DEFINIR UNA CANTIDAD EN EL BODY DIFERENTE A 0`)
        }

        const index = cart.products.findIndex(prod => prod.product.toString() === prodId);
        if (index !== -1) {
        cart.products[index].quantity = quantity + cart.products[index].quantity
        }  else {
        cart.products.push({ product: prodId, quantity: quantity });
        }

        //console.log(cart)
        await cartModel.findOneAndUpdate({_id : cid}, cart)
        return {status: "success", message: "PRODUCTO AGREGADO AL CARRITO EXITOSAMENTE", producto: cart}

        }   catch (error) {
            return{status: "failed", message: error.message}
        }
    }

    async deleteProductById(cid, prodId) {
        try{
        const cart = await cartModel.findById(cid)
        const product = await productModel.findById(prodId)

        if (!cart) {
            throw new Error(`NO EXISTE EL CARRITO CON ID ${cid} EN LA BASE DE DATOS`);
        }
        if (!product) {
            throw new Error(`NO EXISTE EL PRODUCTO CON ID ${prodId} EN LA BASE DE DATOS`);
        }

        const index = cart.products.findIndex(prod => prod.product.toString() === prodId);
        if (index !== -1) {
            cart.products.splice(index,1);
        } 
        else {
            throw new Error(`NO EXISTE EL PRODUCTO CON ID ${prodId} EN EL CARRITO SELECCIONADO`)
        }

        //console.log(cart)
        await cartModel.findOneAndUpdate({_id : cid}, cart)
        return {status: "success", message: "PRODUCTO ELIMINADO DEL CARRITO EXITOSAMENTE", producto: cart}

        }  catch (error) {
                return{status: "failed", message: error.message}
        }
    }


    async deleteCart(ID) {
        try {
            const cart = await cartModel.findById(ID);
            if (!cart) {
            throw new Error(`Cart with ID ${ID} not found`);
            }
            else {
                await cartModel.findByIdAndDelete({_id : ID});
                return{status: "Success", message: `CARRITO ${ID} BORRADO CON EXITO`, cart}
            }
            } catch (error) {
            return{status: "failed", message: error.message}
        }
    }
}

export const MongoCartManager =  new CartDAO();