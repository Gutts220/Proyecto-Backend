//Cliente

//Iniciamos la conexion por parte del cliente

const socket = io()

// //socket.emit("<nombre del evento>", Dato-a-enviar)

// socket.emit("nuevo-msg", "Hola desde el front!")

// //Escuchando desde el cliente

// socket.on("nuevo-msg", (msg) => {
//     console.log(`nuevo mensaje ${msg}`)
//   });

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