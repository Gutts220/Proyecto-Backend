//Cliente

//Iniciamos la conexion por parte del cliente

const socket = io()


function agregarProducto() {
  
  const nombre = document.getElementById('nombre').value;
  const precio = document.getElementById('precio').value;
  socket.emit('nuevoProducto', { title: nombre, price: precio });
  
  document.getElementById('formularioProducto').reset();
}

function eliminarProducto() {
   
  const productoAEliminar = prompt('Ingrese producto a eliminar:');
  socket.emit('eliminarProducto', productoAEliminar);
}


socket.on('productos', (productos) => {
  const listaProductos = document.getElementById('listaProductos');
  listaProductos.innerHTML = '';

  productos.forEach((producto) => {
    const listItem = document.createElement('li');
    listItem.textContent = ` ${producto.title} - ${producto.price}`;
    listaProductos.appendChild(listItem);
  });
});