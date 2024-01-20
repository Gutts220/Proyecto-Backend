const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
  }

  addProduct(product) {
    // Leer productos existentes
    const products = this.getProductsFromFile();

    // Asignar un id autoincrementable
    product.id = this.generateProductId();

    // Agregar el nuevo producto al array
    products.push(product);

    // Guardar el array actualizado en el archivo
    this.saveProductsToFile(products);

    console.log('Producto agregado correctamente.');
  }

  getProducts() {
    // Devolver todos los productos
    return this.getProductsFromFile();
  }

  getProductById(id) {
    // Buscar un producto por id
    const products = this.getProductsFromFile();
    const product = products.find(p => p.id === id);

    if (product) {
      return product;
    } else {
      console.log('Producto no encontrado.');
      return null;
    }
  }

  updateProduct(id, updatedProduct) {
    // Actualizar un producto por id
    const products = this.getProductsFromFile();
    const index = products.findIndex(p => p.id === id);

    if (index !== -1) {
      // Actualizar el producto con los nuevos datos
      products[index] = { ...products[index], ...updatedProduct };
      this.saveProductsToFile(products);
      console.log('Producto actualizado correctamente.');
    } else {
      console.log('Producto no encontrado.');
    }
  }

  deleteProduct(id) {
    // Eliminar un producto por id
    let products = this.getProductsFromFile();
    products = products.filter(p => p.id !== id);
    this.saveProductsToFile(products);
    console.log('Producto eliminado correctamente.');
  }

  generateProductId() {
    // Generar un id autoincrementable
    const products = this.getProductsFromFile();
    const lastProduct = products[products.length - 1];
    return lastProduct ? lastProduct.id + 1 : 1;
  }

  getProductsFromFile() {
    // Leer productos desde el archivo
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      // Si el archivo no existe o está vacío, retornar un array vacío
      return [];
    }
  }

  saveProductsToFile(products) {
    // Guardar productos en el archivo
    const data = JSON.stringify(products, null, 2);
    fs.writeFileSync(this.path, data, 'utf-8');
  }
}

module.exports = { ProductManager };

// Ejemplo de uso
const productManager = new ProductManager('productos.json');

const newProduct = {
  title: 'Producto nuevo',
  description: 'Descripción del producto',
  price: 19.99,
  thumbnail: 'imagen.jpg',
  code: 'P003',
  stock: 30
};
const newProduct2 = {
  title: 'Producto nuevo',
  description: 'Descripción del producto',
  price: 19.99,
  thumbnail: 'imagen.jpg',
  code: 'P003',
  stock: 30
};
const newProduct3 = {
  title: 'Producto nuevo',
  description: 'Descripción del producto',
  price: 19.99,
  thumbnail: 'imagen.jpg',
  code: 'P003',
  stock: 30
};

productManager.addProduct(newProduct);
productManager.addProduct(newProduct2);
productManager.addProduct(newProduct3);

console.log(productManager.getProducts());

const productIdToUpdate = 1;
const updatedProductData = {
  title: 'Producto actualizado',
  price: 24.99
};

productManager.updateProduct(productIdToUpdate, updatedProductData);

console.log(productManager.getProducts());

const productIdToDelete = 2;
productManager.deleteProduct(productIdToDelete);

console.log(productManager.getProducts());