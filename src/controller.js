const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');


async function getProducts() {
  const data = await fs.readFile('./src/productos.json', 'utf-8');
  return JSON.parse(data);
}

async function getProductById(id) {
  const products = await getProducts();
  return products.find(product => product.id === id);
}

async function addProduct(product) {
  const products = await getProducts();
  product.id = uuidv4();
  products.push(product);
  await fs.writeFile('./src/productos.json', JSON.stringify(products, null, 2), 'utf-8');
}

async function updateProduct(id, updatedProductData) {
  const products = await getProducts();
  const index = products.findIndex(product => product.id === id);

  if (index !== -1) {
    products[index] = { ...products[index], ...updatedProductData };
    await fs.writeFile('./src/productos.json', JSON.stringify(products, null, 2), 'utf-8');
  }
}

async function deleteProduct(id) {
  const products = await getProducts();
  const updatedProducts = products.filter(product => product.id !== id);
  await fs.writeFile('./src/productos.json', JSON.stringify(updatedProducts, null, 2), 'utf-8');
}

async function getCartById(id) {
  try {
    const data = await fs.readFile('./src/carrito.json', 'utf-8');
    const cart = JSON.parse(data);

    if (cart.id === id) {
      return cart;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  getCartById,
};