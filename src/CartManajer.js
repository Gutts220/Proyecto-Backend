const fs = require('fs');

class CartManager {
  constructor(filePath) {
    this.path = filePath;
  }

  addProductToCart(cartId, productId, quantity = 1) {
    const carts = this.getCartsFromFile();

    let cart = carts.find(c => c.id === cartId);

    if (!cart) {
      // Si el carrito no existe, lo creamos
      cart = {
        id: cartId,
        products: []
      };
      carts.push(cart);
    }

    // Verificar si el producto ya está en el carrito
    const existingProductIndex = cart.products.findIndex(p => p.product === productId);

    if (existingProductIndex !== -1) {
      // Si el producto ya está en el carrito, incrementar la cantidad
      cart.products[existingProductIndex].quantity += quantity;
    } else {
      // Si el producto no está en el carrito, agregarlo
      cart.products.push({ product: productId, quantity });
    }

    // Guardar el carrito actualizado en el archivo
    this.saveCartsToFile(carts);
    console.log('Producto agregado al carrito correctamente.');
  }

  getCartContent(cartId) {
    const carts = this.getCartsFromFile();
    const cart = carts.find(c => c.id === cartId);

    if (cart) {
      return cart.products;
    } else {
      console.log('Carrito no encontrado.');
      return [];
    }
  }

  removeProductFromCart(cartId, productId) {
    let carts = this.getCartsFromFile();
    const updatedCarts = carts.map(cart => {
      if (cart.id === cartId) {
        // Filtrar los productos para eliminar el que tiene el productId
        cart.products = cart.products.filter(p => p.product !== productId);
      }
      return cart;
    });

    // Guardar los carritos actualizados en el archivo
    this.saveCartsToFile(updatedCarts);
    console.log('Producto eliminado del carrito correctamente.');
  }

  getCartsFromFile() {
    // Leer carritos desde el archivo
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      // Si el archivo no existe o está vacío, retornar un array vacío
      return [];
    }
  }

  saveCartsToFile(carts) {
    // Guardar carritos en el archivo
    const data = JSON.stringify(carts, null, 2);
    fs.writeFileSync(this.path, data, 'utf-8');
  }
}

module.exports = { CartManager };